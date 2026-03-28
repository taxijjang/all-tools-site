import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = 4177;
const BASE = `http://${HOST}:${PORT}`;
const CHROME_PORT = 9224;
const USER_DATA_DIR = join(process.cwd(), '.tmp', `chrome-layout-audit-${Date.now()}`);
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

const ROUTES = [
  '/',
  '/uuid',
  '/base64',
  '/json',
  '/jwt',
  '/cron',
  '/url',
  '/hash',
  '/timestamp',
  '/password',
  '/regex',
  '/qr',
  '/diff',
  '/color',
  '/markdown',
  '/convert',
  '/file-hash',
  '/image-base64',
  '/uuidv7',
  '/case-convert',
  '/json-yaml',
  '/query-builder',
  '/ip-ua',
  '/ip-cidr',
  '/text-stats',
  '/pdf-toolkit',
  '/image-optimize',
  '/ocr',
  '/seo-check',
  '/utm-builder',
  '/text-cleaner',
  '/api-tester',
];

const VIEWPORTS = [
  { width: 320, height: 800, label: '320x800' },
  { width: 390, height: 844, label: '390x844' },
  { width: 768, height: 1024, label: '768x1024' },
];

function fail(message) {
  console.error(`LAYOUT AUDIT FAIL: ${message}`);
  process.exit(1);
}

function getChromePath() {
  return CHROME_PATHS.find((path) => existsSync(path)) || CHROME_PATHS[0];
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

  return { socket, send, targetId: target.id };
}

async function waitForLoad(send) {
  await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
  await delay(500);
}

async function setViewport(send, viewport) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width <= 430,
  });
}

async function auditLayout(send, route, viewport) {
  await setViewport(send, viewport);
  await send('Page.navigate', { url: `${BASE}${route}` });
  await waitForLoad(send);

  const result = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const viewportWidth = window.innerWidth;
        const root = document.documentElement;
        const page = document.querySelector('.page');
        const offenders = Array.from(document.querySelectorAll('body *'))
          .filter((el) => {
            if (!(el instanceof Element)) return false;
            if (el.closest('[hidden], template, script, style, noscript')) return false;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return false;
            return rect.right > viewportWidth + 2 || rect.left < -2;
          })
          .slice(0, 10)
          .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || null,
              cls: el.className || null,
              text: (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 120),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
            };
          });

        return {
          viewportWidth,
          scrollWidth: root.scrollWidth,
          pageWidth: page ? Math.round(page.getBoundingClientRect().width) : null,
          offenders,
        };
      })()
    `,
  });

  return result.result.value;
}

async function closeTarget(socket, targetId) {
  socket.close();
  await fetch(`http://${HOST}:${CHROME_PORT}/json/close/${targetId}`);
}

async function main() {
  const preview = await startPreview();
  const chrome = await startChrome();
  const { socket, send, targetId } = await connectToTarget(`${BASE}/`);

  try {
    const findings = [];

    for (const viewport of VIEWPORTS) {
      for (const route of ROUTES) {
        const report = await auditLayout(send, route, viewport);
        if (report.scrollWidth > report.viewportWidth + 2 || report.offenders.length) {
          findings.push({
            viewport: viewport.label,
            route,
            report,
          });
        }
      }
    }

    if (findings.length) {
      console.log(JSON.stringify(findings, null, 2));
      process.exitCode = 2;
      return;
    }

    console.log(`LAYOUT AUDIT PASS: ${ROUTES.length} routes clean across ${VIEWPORTS.length} viewports`);
  } finally {
    await closeTarget(socket, targetId).catch(() => {});
    chrome.kill('SIGTERM');
    preview.kill('SIGTERM');
    await delay(150);
    await rm(USER_DATA_DIR, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
