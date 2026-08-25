import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = 4176;
const BASE = `http://${HOST}:${PORT}`;
const CHROME_PORT = 9223;
const USER_DATA_DIR = join(process.cwd(), '.tmp', `chrome-i18n-audit-${Date.now()}`);
const CHROME_PATHS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const ROUTES = [
  '/',
  '/learn',
  '/ai-tools',
  '/about',
  '/privacy',
  '/contact',
  '/claude-code-cheatsheet',
  '/codex-cheatsheet',
  '/uuid-v4-v7',
  '/jwt-exp-nbf',
  '/base64-vs-url-encoding',
  '/pdf-merge-split-guide',
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
  '/date-calc',
  '/cron-guide',
  '/age-guide',
  '/terms',
  '/case-convert',
  '/json-yaml',
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
  // /en/ 정적 영어 판. 여기가 깨지면 영어권 유입 자체가 막힌다.
  '/en/',
  '/en/json',
  '/en/base64',
  '/en/jwt',
  '/en/uuid',
  '/en/cron',
  '/en/regex',
  '/en/privacy',
  '/en/about',
  '/en/contact',
];

function fail(message) {
  console.error(`I18N AUDIT FAIL: ${message}`);
  process.exit(1);
}

function getChromePath() {
  const chromePath = CHROME_PATHS.find((path) => existsSync(path));
  if (!chromePath) {
    fail('Chrome executable not found. Set CHROME_PATH to run the i18n audit.');
  }
  return chromePath;
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

// readyState 결과를 버리고 400ms만 기다리고 있었다. 로케일 적용은 load 이후
// JS가 하므로, 다른 감사와 같이 돌아 부하가 걸리면 제목이 아직 한국어인 채로
// 샘플링됐다(verify:full 안에서만 / 라우트가 새는 것처럼 보였다).
async function waitForLoad(send) {
  for (let i = 0; i < 60; i += 1) {
    const r = await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
    if (r.result.value === 'complete') break;
    await delay(50);
  }
  // 제목이 두 번 연속 같으면 로케일 적용이 끝난 것으로 본다.
  let prev = null;
  for (let i = 0; i < 60; i += 1) {
    const r = await send('Runtime.evaluate', { expression: 'document.title', returnByValue: true });
    if (r.result.value && r.result.value === prev) return;
    prev = r.result.value;
    await delay(50);
  }
}

async function auditRoute(send, route) {
  await send('Page.navigate', { url: `${BASE}${route}` });
  await waitForLoad(send);
  const result = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const isVisible = (el) => {
          if (!el || !(el instanceof Element)) return false;
          if (el.closest('[hidden], template, script, style, noscript')) return false;
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        };

        // <head>도 검사한다. 탭 제목과 OG 태그가 영어 모드에서 한글로 남는 버그를
        // body만 훑던 이전 버전이 통째로 놓쳤다.
        const headLeaks = [
          ['title', document.title],
          ['meta[name=description]', document.querySelector('meta[name="description"]')?.content],
          ['og:title', document.querySelector('meta[property="og:title"]')?.content],
          ['og:description', document.querySelector('meta[property="og:description"]')?.content],
          ['twitter:title', document.querySelector('meta[name="twitter:title"]')?.content],
          ['twitter:description', document.querySelector('meta[name="twitter:description"]')?.content],
        ]
          .filter(([, value]) => value && /[가-힣]/.test(value))
          .map(([where, value]) => ({ tag: 'head', id: where, cls: null, text: value }));

        return headLeaks.concat(Array.from(document.querySelectorAll('body *'))
          .filter((el) => isVisible(el))
          .filter((el) => {
            if (el.id === 'localeSelect') return false;
            if (el.classList?.contains('page-controls')) return false;
            if (el.querySelector?.('#localeSelect')) return false;
            return true;
          })
          .map((el) => {
            const text = (el.innerText || '').replace(/\\s+/g, ' ').trim();
            if (!text || !/[가-힣]/.test(text)) return null;
            if (text === '한국어 English') return null;
            const childHasSame = Array.from(el.children).some((child) => {
              const childText = (child.innerText || '').replace(/\\s+/g, ' ').trim();
              return childText && childText === text;
            });
            if (childHasSame) return null;
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || null,
              cls: el.className || null,
              text,
            };
          })
          .filter(Boolean));
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
    for (const route of ROUTES) {
      const leaks = await auditRoute(send, route);
      if (leaks.length) {
        findings.push({ route, leaks });
      }
    }

    if (findings.length) {
      console.log(JSON.stringify(findings, null, 2));
      process.exitCode = 2;
      return;
    }

    console.log(`I18N AUDIT PASS: ${ROUTES.length} routes clean in English mode`);
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
