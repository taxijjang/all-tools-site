const CACHE_NAME = 'stateless-tools-v14-20260329';
const OFFLINE_FALLBACK = '/index.html';
const ASSETS = [
  '/',
  '/index.html',
  '/learn.html',
  '/about.html',
  '/privacy.html',
  '/contact.html',
  '/uuid.html',
  '/base64.html',
  '/json.html',
  '/jwt.html',
  '/cron.html',
  '/url.html',
  '/hash.html',
  '/timestamp.html',
  '/password.html',
  '/regex.html',
  '/qr.html',
  '/diff.html',
  '/color.html',
  '/markdown.html',
  '/convert.html',
  '/file-hash.html',
  '/image-base64.html',
  '/uuidv7.html',
  '/case-convert.html',
  '/json-yaml.html',
  '/query-builder.html',
  '/ip-ua.html',
  '/ip-cidr.html',
  '/pdf-toolkit.html',
  '/image-optimize.html',
  '/ocr.html',
  '/text-stats.html',
  '/seo-check.html',
  '/utm-builder.html',
  '/text-cleaner.html',
  '/api-tester.html',
  '/manifest.webmanifest',
  '/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

function isDocumentRequest(request) {
  if (request.mode === 'navigate' || request.destination === 'document') {
    return true;
  }
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

function isStaticAssetRequest(request, url) {
  return (
    request.destination === 'style'
    || request.destination === 'script'
    || request.destination === 'worker'
    || request.destination === 'font'
    || request.destination === 'image'
    || url.pathname.startsWith('/assets/')
  );
}

async function storeResponse(request, response) {
  if (!response || !response.ok) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

async function handleDocumentRequest(request) {
  try {
    // Always prefer a fresh HTML document so locale/layout changes show up quickly.
    const response = await fetch(request, { cache: 'no-store' });
    await storeResponse(request, response);
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    return (
      (await cache.match(request, { ignoreSearch: true }))
      || (await cache.match(OFFLINE_FALLBACK))
      || Response.error()
    );
  }
}

async function handleStaticRequest(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await storeResponse(request, response);
  return response;
}

async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);
    await storeResponse(request, response);
    return response;
  } catch (error) {
    return (await caches.match(request)) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isDocumentRequest(request)) {
    event.respondWith(handleDocumentRequest(request));
    return;
  }

  if (isStaticAssetRequest(request, url)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  event.respondWith(handleDynamicRequest(request));
});
