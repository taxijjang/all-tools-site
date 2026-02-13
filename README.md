# All Tools Site

A static multi-page toolkit built with Vite featuring utilities such as UUID, Base64, JSON, JWT, URL, and hashing helpers. This repository includes the Vite config and service worker necessary to ship the prebuilt pages in `dist`.

## Local development

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Cloudflare Pages deployment

Cloudflare Pages can deploy the generated static files without any custom workers.

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** use 18 or newer (Pages defaults to 18+, which is compatible with Vite 5).

### Steps

1. Push this repository to your Git provider.
2. In Cloudflare Pages, create a new project and connect the repo.
3. When prompted, set the build command to `npm run build` and the output directory to `dist`.
4. Deploy. The service worker (`public/sw.js`) will be copied automatically; Pages serves it from the site root so offline caching works without extra configuration.

### Troubleshooting tips

- If assets 404 after deploy, confirm the output directory is `dist` and that **"Serve an assets directory"** is selected (default behavior).
- Clear the existing service worker cache in the browser (DevTools → Application → Service Workers) if you deploy significant changes; the cache name `stateless-tools-v1` is defined in `public/sw.js`.
- For custom domains or subpaths, keep the project at the domain root so the absolute paths in the service worker cache list continue to resolve correctly. If you must deploy under a subpath, update the paths in `public/sw.js` to include that prefix and rebuild.
