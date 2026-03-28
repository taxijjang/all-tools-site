import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createHash } from 'node:crypto';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { toDataURL } from 'qrcode';

const HOST = '127.0.0.1';
const PORT = 4178;
const BASE = `http://${HOST}:${PORT}`;
const CHROME_PORT = 9225;
const USER_DATA_DIR = join(process.cwd(), '.tmp', `chrome-upload-audit-${Date.now()}`);
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

function fail(message) {
  console.error(`UPLOAD AUDIT FAIL: ${message}`);
  process.exit(1);
}

function getChromePath() {
  return CHROME_PATHS.find((path) => existsSync(path)) || CHROME_PATHS[0];
}

function stringify(value) {
  return JSON.stringify(value);
}

async function waitForHttp(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.ok) return;
    } catch {
      // retry
    }
    await delay(250);
  }
  fail(`Timed out waiting for ${url}`);
}

async function startPreview() {
  const preview = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: false,
  });
  await waitForHttp(BASE);
  return preview;
}

async function startChrome() {
  await rm(USER_DATA_DIR, { recursive: true, force: true });
  await mkdir(USER_DATA_DIR, { recursive: true });
  const chrome = spawn(
    getChromePath(),
    [
      '--headless=new',
      `--remote-debugging-port=${CHROME_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-default-apps',
      'about:blank',
    ],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
      shell: false,
    },
  );
  await waitForHttp(`http://${HOST}:${CHROME_PORT}/json/version`);
  return chrome;
}

async function connectToTarget(url) {
  const res = await fetch(`http://${HOST}:${CHROME_PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const target = await res.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) {
        reject(new Error(payload.error.message));
      } else {
        resolve(payload.result);
      }
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setBypassServiceWorker', { bypass: true });
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('stateless-tools-locale', 'en');
      } catch (err) {}
      window.__preferredLocale = 'en';
    `,
  });

  return { socket, send, targetId: target.id };
}

async function closeTarget(socket, targetId) {
  socket.close();
  await fetch(`http://${HOST}:${CHROME_PORT}/json/close/${targetId}`).catch(() => undefined);
}

async function evaluate(send, expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return result.result.value;
}

async function navigate(send, route) {
  await send('Page.navigate', { url: `${BASE}${route}` });
  for (let i = 0; i < 50; i += 1) {
    const readyState = await evaluate(send, 'document.readyState');
    if (readyState === 'complete') {
      await delay(500);
      return;
    }
    await delay(150);
  }
  fail(`Page did not finish loading: ${route}`);
}

async function waitForCondition(send, expression, label, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const passed = await evaluate(send, `Boolean(${expression})`);
    if (passed) return;
    await delay(250);
  }
  fail(`Timed out waiting for ${label}`);
}

async function click(send, selector) {
  const ok = await evaluate(
    send,
    `(() => {
      const el = document.querySelector(${stringify(selector)});
      if (!el) return false;
      el.click();
      return true;
    })()`,
  );
  if (!ok) {
    fail(`Missing clickable element: ${selector}`);
  }
}

async function setVirtualFiles(send, selector, specs) {
  const ok = await evaluate(
    send,
    `(async () => {
      const input = document.querySelector(${stringify(selector)});
      if (!input) return false;
      const specs = ${stringify(specs)};
      const dt = new DataTransfer();
      for (const spec of specs) {
        if (spec.kind === 'text') {
          dt.items.add(new File([spec.content], spec.name, { type: spec.type }));
          continue;
        }
        if (spec.kind === 'base64') {
          const binary = atob(spec.base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
          }
          dt.items.add(new File([bytes], spec.name, { type: spec.type }));
        }
      }
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`,
  );
  if (!ok) {
    fail(`Failed to set virtual files for ${selector}`);
  }
}

async function setCanvasFile(send, selector, options) {
  const ok = await evaluate(
    send,
    `(async () => {
      const input = document.querySelector(${stringify(selector)});
      if (!input) return false;
      const options = ${stringify(options)};
      const canvas = document.createElement('canvas');
      canvas.width = options.width;
      canvas.height = options.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = options.background || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (options.mode === 'ocr') {
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 96px Arial';
        ctx.fillText('HELLO OCR', 64, 150);
        ctx.font = 'bold 84px Arial';
        ctx.fillText('123', 64, 270);
      } else {
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(32, 32, canvas.width - 64, canvas.height - 64);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 44px Arial';
        ctx.fillText(options.label || 'Stateless Tools', 56, 118);
        ctx.font = '28px Arial';
        ctx.fillText(options.subLabel || 'Upload audit fixture', 56, 170);
      }

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const dt = new DataTransfer();
      dt.items.add(new File([blob], options.name, { type: 'image/png' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`,
  );
  if (!ok) {
    fail(`Failed to create canvas file for ${selector}`);
  }
}

async function createPdfFixture(title, text) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([420, 240]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText(text, {
    x: 36,
    y: 140,
    size: 28,
    font,
  });
  pdf.setTitle(title);
  pdf.setAuthor('Stateless Tools Upload Audit');
  pdf.setProducer('pdf-lib');
  return Buffer.from(await pdf.save()).toString('base64');
}

async function runAudit(send) {
  const textFixture = 'alpha=42\nbeta=99\nrole=developer';
  const expectedHash = createHash('sha256').update(textFixture).digest('hex');
  const pdfAlpha = await createPdfFixture('Audit Alpha', 'HELLO PDF ALPHA');
  const pdfBeta = await createPdfFixture('Audit Beta', 'HELLO PDF BETA');
  const qrDataUrl = await toDataURL('https://all-tools-site.pages.dev', {
    width: 320,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  const qrBase64 = qrDataUrl.split(',')[1];

  await navigate(send, '/image-optimize');
  const pickerCopy = await evaluate(
    send,
    `(() => ({
      browse: document.querySelector('.file-picker__browse')?.textContent?.trim(),
      title: document.querySelector('.file-picker__title')?.textContent?.trim(),
      status: document.querySelector('.file-picker__status')?.textContent?.trim()
    }))()`,
  );
  if (pickerCopy.browse !== 'Choose file' || pickerCopy.status !== 'No file selected yet.') {
    fail('Custom file picker copy did not render in English mode');
  }

  await navigate(send, '/base64');
  await setVirtualFiles(send, '#fileInput', [{ kind: 'text', name: 'sample.txt', type: 'text/plain', content: textFixture }]);
  await waitForCondition(send, `document.getElementById('base64Output').value.includes('YWxwaGE9NDI')`, 'Base64 file encoding');

  await navigate(send, '/file-hash');
  await setVirtualFiles(send, '#fhFile', [{ kind: 'text', name: 'sample.txt', type: 'text/plain', content: textFixture }]);
  await click(send, '#fhRunBtn');
  await waitForCondition(send, `document.getElementById('fhOutput').value === ${stringify(expectedHash)}`, 'file hash output');

  await navigate(send, '/image-base64');
  await setCanvasFile(send, '#ibFile', {
    name: 'sample-image.png',
    width: 720,
    height: 360,
    label: 'Image Base64',
    subLabel: 'Upload audit fixture',
  });
  await click(send, '#ibEncodeBtn');
  await waitForCondition(
    send,
    `document.getElementById('ibOutput').value.startsWith('data:image/png;base64,') && !document.getElementById('ibPreview').hidden`,
    'image to Base64 conversion',
  );
  await click(send, '#ibDecodeBtn');

  await navigate(send, '/image-optimize');
  await setCanvasFile(send, '#imgOptFile', {
    name: 'optimize-source.png',
    width: 1400,
    height: 900,
    label: 'Optimize Me',
    subLabel: 'Preview + compression check',
  });
  await click(send, '#imgOptRunBtn');
  await waitForCondition(
    send,
    `!document.getElementById('imgOptPreview').hidden && !document.getElementById('imgOptDownloadBtn').disabled && document.getElementById('imgOptAfter').value.length > 0`,
    'image optimizer result',
  );

  await navigate(send, '/ocr');
  await setCanvasFile(send, '#ocrFile', {
    mode: 'ocr',
    name: 'ocr-sample.png',
    width: 1200,
    height: 360,
    background: '#ffffff',
  });
  await click(send, '#ocrRunBtn');
  await waitForCondition(
    send,
    `document.getElementById('ocrOutput').value.trim().length > 0 && (document.getElementById('ocrOutput').value.toUpperCase().includes('HELLO') || document.getElementById('ocrOutput').value.includes('123'))`,
    'OCR result',
    120000,
  );

  await navigate(send, '/qr');
  await setVirtualFiles(send, '#qrScanFile', [
    { kind: 'base64', name: 'audit-qr.png', type: 'image/png', base64: qrBase64 },
  ]);
  await waitForCondition(
    send,
    `document.getElementById('qrScanOutput').value.includes('https://all-tools-site.pages.dev')`,
    'QR image scan',
  );

  await navigate(send, '/pdf-toolkit');
  await setVirtualFiles(send, '#pdfMergeFiles', [
    { kind: 'base64', name: 'alpha.pdf', type: 'application/pdf', base64: pdfAlpha },
    { kind: 'base64', name: 'beta.pdf', type: 'application/pdf', base64: pdfBeta },
  ]);
  await waitForCondition(send, `document.getElementById('pdfMergeFilesStatus').textContent.includes('2 files')`, 'PDF merge upload status');
  await click(send, '#pdfMergeBtn');
  await waitForCondition(
    send,
    `!document.getElementById('pdfDownloadBtn').disabled && document.getElementById('pdfOutput').value.includes('2 files')`,
    'PDF merge result',
    45000,
  );

  await navigate(send, '/pdf-toolkit');
  await setVirtualFiles(send, '#pdfSingleFile', [
    { kind: 'base64', name: 'alpha.pdf', type: 'application/pdf', base64: pdfAlpha },
  ]);
  await waitForCondition(send, `document.getElementById('pdfSingleFileStatus').textContent.includes('alpha.pdf')`, 'single PDF upload status');
  await click(send, '#pdfMetadataBtn');
  await waitForCondition(
    send,
    `document.getElementById('pdfOutput').value.includes('alpha.pdf') && document.getElementById('pdfOutput').value.length > 40`,
    'PDF metadata result',
    45000,
  );
  await click(send, '#pdfExtractTextBtn');
  await waitForCondition(
    send,
    `document.getElementById('pdfOutput').value.toUpperCase().includes('HELLO PDF ALPHA')`,
    'PDF text extraction',
    45000,
  );

  console.log('UPLOAD AUDIT PASS: base64, file-hash, image-base64, image-optimize, ocr, qr, pdf-toolkit');
}

async function main() {
  const preview = await startPreview();
  const chrome = await startChrome();
  const { socket, send, targetId } = await connectToTarget(`${BASE}/`);

  try {
    await runAudit(send);
  } finally {
    await closeTarget(socket, targetId).catch(() => undefined);
    chrome.kill('SIGTERM');
    preview.kill('SIGTERM');
    await delay(150);
    await rm(USER_DATA_DIR, { recursive: true, force: true }).catch(() => undefined);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
