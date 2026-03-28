import { defineConfig } from 'vite';
import { basename, resolve } from 'node:path';
import {
  FEATURED_TOOL_PATHS,
  PAGE_META,
  SITE_ALT_NAME,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SOCIALS,
} from './src/seo-meta.js';

const pageInputs = {
  main: resolve(__dirname, 'index.html'),
  learn: resolve(__dirname, 'learn.html'),
  about: resolve(__dirname, 'about.html'),
  privacy: resolve(__dirname, 'privacy.html'),
  contact: resolve(__dirname, 'contact.html'),
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
  ipCidr: resolve(__dirname, 'ip-cidr.html'),
  pdfToolkit: resolve(__dirname, 'pdf-toolkit.html'),
  imageOptimize: resolve(__dirname, 'image-optimize.html'),
  ocr: resolve(__dirname, 'ocr.html'),
  textStats: resolve(__dirname, 'text-stats.html'),
  csvTools: resolve(__dirname, 'csv-tools.html'),
  seoCheck: resolve(__dirname, 'seo-check.html'),
  utmBuilder: resolve(__dirname, 'utm-builder.html'),
  qrAdvanced: resolve(__dirname, 'qr-advanced.html'),
  textCleaner: resolve(__dirname, 'text-cleaner.html'),
  jwtVerify: resolve(__dirname, 'jwt-verify.html'),
  apiTester: resolve(__dirname, 'api-tester.html'),
};

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(value = '') {
  return escapeHtml(value).replaceAll('"', '&quot;');
}

function toPageKey(fileName) {
  return fileName === 'index.html' ? 'index' : fileName.replace(/\.html$/i, '');
}

function extractMatch(html, regex) {
  const match = html.match(regex);
  return match?.[1]?.trim() || '';
}

function withSiteSuffix(title) {
  return /stateless tools/i.test(title) ? title : `${title} | ${SITE_NAME}`;
}

function cleanTitle(title) {
  return title.replace(/\s+\|\s+Stateless Tools$/i, '').trim();
}

function removeHeadArtifacts(html) {
  const patterns = [
    /<meta\s+name=["']description["'][^>]*>\s*/gi,
    /<meta\s+name=["']robots["'][^>]*>\s*/gi,
    /<meta\s+name=["']author["'][^>]*>\s*/gi,
    /<meta\s+name=["']theme-color["'][^>]*>\s*/gi,
    /<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+property=["']og:(type|title|description|url|site_name|image|image:alt)["'][^>]*>\s*/gi,
    /<link\s+rel=["']canonical["'][^>]*>\s*/gi,
    /<link\s+rel=["']icon["'][^>]*>\s*/gi,
    /<script\s+type=["']application\/ld\+json["']\s+data-seo-schema[^>]*>[\s\S]*?<\/script>\s*/gi,
    /<script\b[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^<]*<\/script>\s*/gi,
  ];

  return patterns.reduce((current, pattern) => current.replace(pattern, ''), html);
}

function upsertBodyAttribute(html, attr, value) {
  return html.replace(/<body\b([^>]*)>/i, (match, attrs) => {
    let nextAttrs = attrs || '';
    const attrPattern = new RegExp(`\\s${attr}=["'][^"']*["']`, 'i');
    nextAttrs = nextAttrs.replace(attrPattern, '');
    return `<body${nextAttrs} ${attr}="${value}">`;
  });
}

function getMetaForPath(pathname) {
  return Object.values(PAGE_META).find((meta) => meta.path === pathname);
}

function buildBreadcrumb(cleanPageTitle, canonicalUrl) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cleanPageTitle,
        item: canonicalUrl,
      },
    ],
  };
}

function buildStructuredData(meta, pageTitle, description, canonicalUrl) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
    sameAs: SITE_SOCIALS,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: SITE_ORIGIN,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: ['ko', 'en'],
  };

  const page = {
    '@context': 'https://schema.org',
    '@type': meta.kind === 'home' ? 'CollectionPage' : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    name: pageTitle,
    url: canonicalUrl,
    description,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
    primaryImageOfPage: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    ...buildBreadcrumb(pageTitle, canonicalUrl),
  };

  const structuredData = [website, organization, page, breadcrumb];

  if (meta.kind === 'home') {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${SITE_ORIGIN}/#featured-tools`,
      name: 'Featured browser tools',
      itemListElement: FEATURED_TOOL_PATHS.map((path, index) => {
        const pathMeta = getMetaForPath(path);
        const name = pathMeta?.title ? cleanTitle(pathMeta.title) : path.replace('/', '').replaceAll('-', ' ');
        return {
          '@type': 'ListItem',
          position: index + 1,
          name,
          url: `${SITE_ORIGIN}${path}`,
        };
      }),
    });
  }

  if (meta.kind === 'tool') {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${canonicalUrl}#app`,
      name: pageTitle,
      url: canonicalUrl,
      description,
      applicationCategory: meta.applicationCategory || 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript and a modern browser',
      isAccessibleForFree: true,
      image: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    });
  }

  return structuredData;
}

function seoMetadataPlugin() {
  return {
    name: 'seo-metadata',
    transformIndexHtml(html, ctx) {
      const fileName = basename(ctx.filename);
      const pageKey = toPageKey(fileName);
      const meta = PAGE_META[pageKey];

      if (!meta) {
        return html;
      }

      const existingTitle = extractMatch(html, /<title>([\s\S]*?)<\/title>/i) || SITE_NAME;
      const existingDescription =
        extractMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"]*)["'][^>]*>/i) ||
        extractMatch(html, /<meta\s+name=["']description["']\s+content=['"]([^']*)['"][^>]*>/i);

      const fullTitle = withSiteSuffix(meta.title || existingTitle);
      const pageTitle = cleanTitle(fullTitle);
      const description = meta.description || existingDescription || pageTitle;
      const canonicalPath = meta.canonicalPath || meta.path;
      const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
      const robots = meta.noindex
        ? 'noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

      const structuredDataJson = JSON.stringify(
        buildStructuredData(meta, pageTitle, description, canonicalUrl),
        null,
        2,
      ).replaceAll('</script>', '<\\/script>');

      let nextHtml = removeHeadArtifacts(html);
      nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
      nextHtml = upsertBodyAttribute(nextHtml, 'data-allow-ads', meta.allowAds ? 'true' : 'false');

      const headTags = [
        `  <meta name="description" content="${escapeAttr(description)}" />`,
        `  <meta name="robots" content="${robots}" />`,
        '  <meta name="author" content="taxijjang" />',
        '  <meta name="theme-color" content="#020817" />',
        `  <link rel="icon" href="${SITE_LOGO_PATH}" type="image/svg+xml" />`,
        `  <link rel="canonical" href="${canonicalUrl}" />`,
        '  <meta property="og:type" content="website" />',
        `  <meta property="og:site_name" content="${SITE_NAME}" />`,
        `  <meta property="og:title" content="${escapeAttr(pageTitle)}" />`,
        `  <meta property="og:description" content="${escapeAttr(description)}" />`,
        `  <meta property="og:url" content="${canonicalUrl}" />`,
        `  <meta property="og:image" content="${SITE_ORIGIN}${SITE_LOGO_PATH}" />`,
        `  <meta property="og:image:alt" content="${SITE_NAME} logo" />`,
        '  <meta name="twitter:card" content="summary" />',
        `  <meta name="twitter:title" content="${escapeAttr(pageTitle)}" />`,
        `  <meta name="twitter:description" content="${escapeAttr(description)}" />`,
        `  <meta name="twitter:image" content="${SITE_ORIGIN}${SITE_LOGO_PATH}" />`,
        `  <script type="application/ld+json" data-seo-schema>\n${structuredDataJson}\n  </script>`,
      ];

      if (meta.allowAds) {
        headTags.push(
          '  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4324902308911757" crossorigin="anonymous"></script>',
        );
      }

      return nextHtml.replace('</head>', `${headTags.join('\n')}\n</head>`);
    },
  };
}

export default defineConfig({
  plugins: [seoMetadataPlugin()],
  build: {
    rollupOptions: {
      input: pageInputs,
    },
  },
});
