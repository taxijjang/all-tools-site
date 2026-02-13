const CACHE_NAME = 'stateless-tools-v9-20260213';
const ASSETS = [
  '/',
  '/index.html',
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
  '/pdf-toolkit.html',
  '/image-optimize.html',
  '/ocr.html',
  '/csv-tools.html',
  '/seo-check.html',
  '/utm-builder.html',
  '/qr-advanced.html',
  '/text-cleaner.html',
  '/jwt-verify.html',
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

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension')) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'));
    }),
  );
});
