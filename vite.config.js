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
        cron: resolve(__dirname, 'cron.html'),
        timestamp: resolve(__dirname, 'timestamp.html'),
        password: resolve(__dirname, 'password.html'),
        regex: resolve(__dirname, 'regex.html'),
        qr: resolve(__dirname, 'qr.html'),
        diff: resolve(__dirname, 'diff.html'),
        color: resolve(__dirname, 'color.html'),
        markdown: resolve(__dirname, 'markdown.html'),
        convert: resolve(__dirname, 'convert.html'),
        fileHash: resolve(__dirname, 'file-hash.html'),
        imageBase64: resolve(__dirname, 'image-base64.html'),
        uuidv7: resolve(__dirname, 'uuidv7.html'),
        caseConvert: resolve(__dirname, 'case-convert.html'),
        jsonYaml: resolve(__dirname, 'json-yaml.html'),
        queryBuilder: resolve(__dirname, 'query-builder.html'),
        ipUa: resolve(__dirname, 'ip-ua.html'),
        pdfToolkit: resolve(__dirname, 'pdf-toolkit.html'),
        imageOptimize: resolve(__dirname, 'image-optimize.html'),
        ocr: resolve(__dirname, 'ocr.html'),
        csvTools: resolve(__dirname, 'csv-tools.html'),
        seoCheck: resolve(__dirname, 'seo-check.html'),
        utmBuilder: resolve(__dirname, 'utm-builder.html'),
        qrAdvanced: resolve(__dirname, 'qr-advanced.html'),
        textCleaner: resolve(__dirname, 'text-cleaner.html'),
        jwtVerify: resolve(__dirname, 'jwt-verify.html'),
        apiTester: resolve(__dirname, 'api-tester.html'),
      },
    },
  },
});
