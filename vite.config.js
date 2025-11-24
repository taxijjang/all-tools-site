import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        uuid: resolve(__dirname, 'uuid.html'),
        base64: resolve(__dirname, 'base64.html'),
        json: resolve(__dirname, 'json.html'),
        jwt: resolve(__dirname, 'jwt.html'),
        url: resolve(__dirname, 'url.html'),
        hash: resolve(__dirname, 'hash.html'),
      },
    },
  },
});
