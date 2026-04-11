import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE = `http://${HOST}:${PORT}`;

const ROUTES = [
  '/',
  '/learn',
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

const VITE_CLI = resolve('node_modules', 'vite', 'bin', 'vite.js');

function fail(message) {
  console.error(`SMOKE FAIL: ${message}`);
  process.exit(1);
}

async function waitForServer() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const [homeRes, probeRes] = await Promise.all([
        fetch(BASE, { redirect: 'manual' }),
        fetch(`${BASE}/uuid`, { redirect: 'manual' }),
      ]);
      if (homeRes.ok && probeRes.ok) return;
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

  const preview = spawn(process.execPath, [VITE_CLI, 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
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
