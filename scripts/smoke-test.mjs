import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE = `http://${HOST}:${PORT}`;

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
  '/pdf-toolkit',
  '/image-optimize',
  '/ocr',
  '/seo-check',
  '/utm-builder',
  '/text-cleaner',
  '/api-tester',
];

function fail(message) {
  console.error(`SMOKE FAIL: ${message}`);
  process.exit(1);
}

async function waitForServer() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const res = await fetch(BASE, { redirect: 'manual' });
      if (res.ok) return;
    } catch {
      // keep polling
    }
    await delay(200);
  }
  fail('Preview server did not start in time');
}

async function checkRoutes() {
  for (const route of ROUTES) {
    const res = await fetch(`${BASE}${route}`, { redirect: 'manual' });
    if (!res.ok) {
      fail(`${route} returned HTTP ${res.status}`);
    }
    const html = await res.text();
    if (!html.includes('<html')) {
      fail(`${route} did not return HTML`);
    }
  }
}

async function checkQrSource() {
  const qrHtml = await readFile('qr.html', 'utf8');
  if (qrHtml.includes('jsdelivr') || qrHtml.includes('qrcode.min.js')) {
    fail('qr.html still references external QR CDN script');
  }
}

async function main() {
  await checkQrSource();

  const preview = spawn('npm', ['run', 'preview', '--', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
    shell: true,
  });

  try {
    await waitForServer();
    await checkRoutes();
    console.log(`SMOKE PASS: ${ROUTES.length} routes OK`);
  } finally {
    preview.kill('SIGTERM');
    await delay(150);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
