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
import { CONTENT_PAGES, NAV_TOOLS, UTILITY_LINKS } from './src/chrome-meta.js';

const ADSENSE_ENABLED = false;

const pageInputs = {
  main: resolve(__dirname, 'index.html'),
  learn: resolve(__dirname, 'learn.html'),
  about: resolve(__dirname, 'about.html'),
  privacy: resolve(__dirname, 'privacy.html'),
  contact: resolve(__dirname, 'contact.html'),
  uuidV4V7: resolve(__dirname, 'uuid-v4-v7.html'),
  jwtExpNbf: resolve(__dirname, 'jwt-exp-nbf.html'),
  base64VsUrlEncoding: resolve(__dirname, 'base64-vs-url-encoding.html'),
  pdfMergeSplitGuide: resolve(__dirname, 'pdf-merge-split-guide.html'),
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
    /<meta\s+name=["']google-adsense-account["'][^>]*>\s*/gi,
    /<meta\s+name=["']robots["'][^>]*>\s*/gi,
    /<meta\s+name=["']author["'][^>]*>\s*/gi,
    /<meta\s+name=["']theme-color["'][^>]*>\s*/gi,
    /<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+property=["']og:(type|title|description|url|site_name|image|image:alt)["'][^>]*>\s*/gi,
    /<link\s+rel=["']canonical["'][^>]*>\s*/gi,
    /<link\s+rel=["']icon["'][^>]*>\s*/gi,
    /<script\s+type=["']application\/ld\+json["']\s+data-seo-schema[^>]*>[\s\S]*?<\/script>\s*/gi,
    /<script\b[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^<]*<\/script>\s*/gi,
    /<script\b[^>]*data-client-boot[^>]*>[\s\S]*?<\/script>\s*/gi,
    /<style\b[^>]*data-client-boot[^>]*>[\s\S]*?<\/style>\s*/gi,
    /<script>\s*\(\s*function\s*\(\)\s*\{\s*var supported = \['ko', 'en'\][\s\S]*?window\.__preferredLocale = locale;\s*\}\)\(\);\s*<\/script>\s*/gi,
  ];

  return patterns.reduce((current, pattern) => current.replace(pattern, ''), html);
}

function buildClientBootScript() {
  return `  <script data-client-boot>
    (function () {
      var supported = ['ko', 'en'];
      function safeGet(key) {
        try {
          return localStorage.getItem(key);
        } catch (err) {
          return null;
        }
      }
      function pickLocale() {
        var stored = safeGet('stateless-tools-locale');
        if (stored && supported.indexOf(stored) !== -1) {
          return stored;
        }
        var lang = (navigator.language || '').slice(0, 2);
        if (supported.indexOf(lang) !== -1) {
          return lang;
        }
        return 'ko';
      }
      function pickTheme() {
        var stored = safeGet('stateless-theme');
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      }
      var doc = document.documentElement;
      var locale = pickLocale();
      doc.setAttribute('lang', locale);
      doc.setAttribute('data-theme', pickTheme());
      doc.setAttribute('data-preferred-locale', locale);
      doc.classList.add('i18n-pending');
      window.__preferredLocale = locale;
    })();
  </script>`;
}

function buildClientBootStyle() {
  return `  <style data-client-boot>
    html.i18n-pending[data-preferred-locale="en"] .page {
      visibility: hidden;
    }

    html.i18n-pending .page-controls,
    html.i18n-pending .trust-badge {
      visibility: hidden;
    }

    html.i18n-pending[data-preferred-locale="en"] body {
      overflow: hidden;
    }
  </style>`;
}

function getToolIdFromPath(pathname) {
  return pathname === '/' ? 'home' : pathname.replace(/^\//, '');
}

function buildChromeControls(pathname) {
  const currentTool = getToolIdFromPath(pathname);
  const isContentPage = CONTENT_PAGES.has(currentTool);
  const currentPath = pathname === '/' ? '' : pathname;

  const switcherMarkup = isContentPage
    ? ''
    : `
      <div class="tool-switcher" data-chrome-preload="tool-switcher">
        <select id="toolSelect" aria-label="기능 이동">
${NAV_TOOLS.map((tool) => {
  const isSelected =
    currentPath === tool.value ||
    currentPath === `${tool.value}.html` ||
    (tool.value === '/' && pathname === '/');
  return `          <option value="${tool.value}"${isSelected ? ' selected' : ''}>${tool.labels.ko}</option>`;
}).join('\n')}
        </select>
      </div>`;

  const utilityMarkup = `
      <nav class="utility-links" data-chrome-preload="utility-links" aria-label="사이트 링크">
${UTILITY_LINKS.map((link) => `        <a href="${link.href}" data-chrome-link="${link.key}">${link.labels.ko}</a>`).join('\n')}
      </nav>`;

  return `
      <button id="pwaInstallBtn" class="pwa-install-btn" type="button" aria-hidden="true" tabindex="-1">설치</button>
${switcherMarkup}
      <button id="themeToggle" class="theme-toggle" type="button" aria-label="테마 전환">🌙</button>
${utilityMarkup}`;
}

function injectChromeShell(html, pathname) {
  let nextHtml = html.replace(/<div class="page-controls">/i, (match) => `${match}\n${buildChromeControls(pathname)}`);

  nextHtml = nextHtml.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/i, (match, attrs, text) => {
    if (match.includes('trust-badge')) {
      return match;
    }
    return `<h1${attrs}>${text}<span class="trust-badge" data-chrome-badge="trust">🔒 브라우저 내부 처리</span></h1>`;
  });

  return nextHtml;
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

function resolveSitemapDefaults(meta) {
  if (meta.path === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }

  if (meta.path === '/learn') {
    return { changefreq: 'weekly', priority: '0.8' };
  }

  if (meta.kind === 'content') {
    return { changefreq: 'monthly', priority: '0.6' };
  }

  if (FEATURED_TOOL_PATHS.includes(meta.path)) {
    return { changefreq: 'weekly', priority: '0.8' };
  }

  return { changefreq: 'weekly', priority: '0.7' };
}

function buildSitemapXml(buildDate) {
  const urls = Object.values(PAGE_META).filter((meta) => !meta.noindex && meta.kind !== 'alias');
  const entries = urls
    .map((meta) => {
      const canonicalPath = meta.canonicalPath || meta.path;
      const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
      const defaults = resolveSitemapDefaults(meta);
      return `  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${defaults.changefreq}</changefreq>
    <priority>${defaults.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
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
      const primaryHeading =
        meta.kind === 'tool' || meta.kind === 'home'
          ? (meta.title || pageTitle).split('|')[0].trim()
          : '';
      if (primaryHeading) {
        nextHtml = nextHtml.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${escapeHtml(primaryHeading)}</h1>`);
      }
      nextHtml = injectChromeShell(nextHtml, meta.path);
      nextHtml = nextHtml.replace(
        /<h1([^>]*)>([\s\S]*?)<span class="trust-badge"([^>]*)>([\s\S]*?)<\/span><\/h1>/i,
        '<h1$1>$2</h1><p class="trust-badge"$3 data-nosnippet>$4</p>',
      );
      nextHtml = nextHtml.replace(/<div class="page-controls">/i, '<div class="page-controls" data-nosnippet>');
      nextHtml = nextHtml.replace(
        /(<(?:div|section)\b[^>]*data-locale-block=["'][^"']+["'][^>]*?)\shidden(?=[^>]*>)/gi,
        '$1 hidden data-nosnippet',
      );
      nextHtml = nextHtml.replace(/<footer class="footer([^"]*)">/i, '<footer class="footer$1" data-nosnippet>');
      nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
      nextHtml = upsertBodyAttribute(
        nextHtml,
        'data-allow-ads',
        ADSENSE_ENABLED && meta.allowAds ? 'true' : 'false',
      );

      const headTags = [
        buildClientBootScript(),
        buildClientBootStyle(),
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

      if (ADSENSE_ENABLED && meta.allowAds) {
        headTags.push(
          '  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4324902308911757" crossorigin="anonymous"></script>',
        );
      }

      return nextHtml.replace('</head>', `${headTags.join('\n')}\n</head>`);
    },
  };
}

function staticSiteArtifactsPlugin() {
  const buildDate = new Date().toISOString().slice(0, 10);

  return {
    name: 'static-site-artifacts',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemapXml(buildDate),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: buildRobotsTxt(),
      });
    },
  };
}

export default defineConfig({
  plugins: [seoMetadataPlugin(), staticSiteArtifactsPlugin()],
  build: {
    rollupOptions: {
      input: pageInputs,
    },
  },
});
