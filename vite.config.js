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
import {
  CONTENT_PAGES,
  FOOTER_UTILITY_LINKS,
  NAV_TOOLS,
  NAV_UTILITY_LINKS,
} from './src/chrome-meta.js';
import { TOOL_CATEGORY_MAP } from './src/ux-meta.js';
import { TOOL_SUPPORT_COPY } from './src/tool-support-copy.js';
import { TOOL_SUPPORT_EXTRA } from './src/tool-support-extra.js';

const ADSENSE_PUBLISHER_ID = 'ca-pub-4324902308911757';
const ADSENSE_ENABLED = true;

const pageInputs = {
  main: resolve(__dirname, 'index.html'),
  learn: resolve(__dirname, 'learn.html'),
  aiTools: resolve(__dirname, 'ai-tools.html'),
  about: resolve(__dirname, 'about.html'),
  privacy: resolve(__dirname, 'privacy.html'),
  contact: resolve(__dirname, 'contact.html'),
  claudeCodeCheatsheet: resolve(__dirname, 'claude-code-cheatsheet.html'),
  codexCheatsheet: resolve(__dirname, 'codex-cheatsheet.html'),
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
  seoCheck: resolve(__dirname, 'seo-check.html'),
  utmBuilder: resolve(__dirname, 'utm-builder.html'),
  textCleaner: resolve(__dirname, 'text-cleaner.html'),
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

function getCleanPageTitle(meta, fallbackTitle = '') {
  return cleanTitle(meta.title || fallbackTitle || SITE_NAME).split('|')[0].trim();
}

const TOOL_SUPPORT_LABELS = {
  ko: {
    featureKicker: 'Guide',
    stepsKicker: 'Workflow',
    notesKicker: 'Review',
    faqKicker: 'FAQ',
    fallbackHeading: (toolName) => `${toolName} 기능 설명`,
    stepsTitle: '사용 순서',
    notesTitle: '확인할 점',
    faqTitle: '자주 묻는 질문',
    moreSummary: '사용법, 예시, 자주 만나는 오류 더 보기',
    examplesKicker: 'Examples',
    examplesTitle: '실제 입력과 결과',
    troublesKicker: 'Troubleshooting',
    troublesTitle: '자주 만나는 오류',
    relatedKicker: 'Related',
    relatedTitle: '함께 쓰면 좋은 도구',
    inputLabel: '입력',
    outputLabel: '결과',
  },
  en: {
    featureKicker: 'Guide',
    stepsKicker: 'Workflow',
    notesKicker: 'Review',
    faqKicker: 'FAQ',
    fallbackHeading: (toolName) => `${toolName} feature guide`,
    stepsTitle: 'How to use it',
    notesTitle: 'Things to check',
    faqTitle: 'Common questions',
    moreSummary: 'More: how to use it, examples, and common errors',
    examplesKicker: 'Examples',
    examplesTitle: 'Real input and output',
    troublesKicker: 'Troubleshooting',
    troublesTitle: 'Errors you will hit',
    relatedKicker: 'Related',
    relatedTitle: 'Tools that pair well',
    inputLabel: 'Input',
    outputLabel: 'Output',
  },
};

function getFallbackSupportCopy(meta, toolName, description, locale = 'ko') {
  if (locale === 'en') {
    return {
      heading: `${toolName} workflow guide`,
      lead: description,
      cards: [
        {
          title: 'Work in the browser',
          body: 'Use the current page for input, conversion, and validation without installing a separate app.',
        },
        {
          title: 'Shorten repeated checks',
          body: 'Handle common development, operations, and content tasks in a focused single-purpose interface.',
        },
        {
          title: 'Move to the next task',
          body: 'Copy or download the result, then continue with related tools or guides when another check is needed.',
        },
      ],
      steps: [
        'Enter the value or choose the file you want to inspect.',
        'Select the required options, format, or output mode.',
        'Run the tool and review the result area.',
        'Copy or download the result after checking that it matches your expected format.',
      ],
      notes: [
        {
          title: 'Check the source format',
          body: 'Most unexpected results come from mismatched input format, hidden whitespace, or copied line breaks.',
        },
        {
          title: 'Keep sensitive values out of shared output',
          body: 'Mask tokens, personal data, and internal hostnames before sharing results with other people.',
        },
      ],
    };
  }

  return {
    heading: `${toolName} 기능 설명`,
    lead: description,
    cards: [
      {
        title: '브라우저에서 바로 실행',
        body: '별도 설치 없이 현재 페이지에서 입력, 변환, 검증 흐름을 이어갈 수 있도록 구성했습니다.',
      },
      {
        title: '반복 작업 단축',
        body: '개발, 운영, 콘텐츠 작업 중 자주 반복되는 확인 과정을 한 화면에서 빠르게 처리하는 데 초점을 맞췄습니다.',
      },
      {
        title: '다음 작업으로 연결',
        body: '결과를 복사하거나 다운로드한 뒤 관련 도구와 가이드로 이어서 점검할 수 있습니다.',
      },
    ],
    steps: [
      '입력창에 확인할 값이나 파일을 넣습니다.',
      '필요한 옵션, 형식, 출력 방식을 선택합니다.',
      '실행 버튼을 누르고 결과 영역에서 변환 또는 검사 결과를 확인합니다.',
      '결과를 복사하거나 다운로드한 뒤 관련 도구에서 추가 점검을 이어갑니다.',
    ],
    notes: [
      {
        title: '입력 형식 확인',
        body: '대부분의 예상 밖 결과는 입력 형식, 숨은 공백, 복사 과정에서 들어간 줄바꿈 때문에 생깁니다.',
      },
      {
        title: '공유 전 민감 값 제거',
        body: '토큰, 개인정보, 내부 호스트명은 결과를 공유하기 전에 마스킹하는 것이 좋습니다.',
      },
    ],
  };
}

function getToolSupportCopy(meta, toolName, description, locale = 'ko') {
  const base =
    TOOL_SUPPORT_COPY[meta.path]?.[locale] ||
    TOOL_SUPPORT_COPY[meta.path]?.ko ||
    getFallbackSupportCopy(meta, toolName, description, locale);
  const extra = TOOL_SUPPORT_EXTRA[meta.path]?.[locale] || {};

  return { ...base, ...extra };
}

// ponytail: 자동생성 FAQ는 20개 페이지에 같은 질문 2개와 같은 답이 그대로 들어가 중복 콘텐츠가 됐다.
// 나머지 1개도 바로 위 Guide 섹션과 같은 문장이라 더하는 정보가 없었다. 손으로 쓴 faq만 남긴다.
function getStructuredFaq(meta) {
  return Array.isArray(meta.faq) && meta.faq.length ? meta.faq : [];
}

function buildCardMarkup(items = [], className = 'info-card') {
  return items
    .map(
      (item) => `            <article class="${className}">
              <h3>${escapeHtml(item.question || item.title)}</h3>
              <p>${escapeHtml(item.answer || item.body)}</p>
            </article>`,
    )
    .join('\n');
}

function buildListMarkup(items = []) {
  return items.map((item) => `          <li>${escapeHtml(item)}</li>`).join('\n');
}

// ponytail: 예시/오류/관련도구는 전부 선택적. 데이터가 없는 페이지는 섹션 자체가 안 나간다.
function buildExamplesMarkup(items = [], labels) {
  return items
    .map(
      (item) => `            <article class="example-item">
              <h3>${escapeHtml(item.title)}</h3>
              <p class="example-item__label">${escapeHtml(labels.inputLabel)}</p>
              <pre class="example-item__code"><code>${escapeHtml(item.input)}</code></pre>
              <p class="example-item__label">${escapeHtml(labels.outputLabel)}</p>
              <pre class="example-item__code"><code>${escapeHtml(item.output)}</code></pre>
${item.note ? `              <p class="example-item__note">${escapeHtml(item.note)}</p>\n` : ''}            </article>`,
    )
    .join('\n');
}

// PAGE_META는 한국어만 담고 있어서 영어 라벨은 NAV_TOOLS, 영어 설명은 TOOL_SUPPORT_COPY의 en.lead에서 가져온다.
// 영어 설명이 없는 경로는 링크만 남긴다. 한국어를 그대로 두면 영어 모드에 한글이 새어 i18n 감사가 잡는다.
function buildRelatedMarkup(meta, locale) {
  const category = TOOL_CATEGORY_MAP[meta.path];
  if (!category) {
    return '';
  }

  const siblings = Object.entries(TOOL_CATEGORY_MAP)
    .filter(([path, cat]) => cat === category && path !== meta.path)
    .map(([path]) => {
      const sibling = Object.values(PAGE_META).find((item) => item.path === path && !item.noindex);
      if (!sibling?.title) {
        return null;
      }

      if (locale === 'en') {
        const navLabel = NAV_TOOLS.find((tool) => tool.value === path)?.labels?.en;
        if (!navLabel) {
          return null;
        }
        const lead = TOOL_SUPPORT_COPY[path]?.en?.lead || '';
        return { path, label: navLabel, description: lead };
      }

      return {
        path,
        label: cleanTitle(sibling.title).split('|')[0].trim(),
        description: sibling.description || '',
      };
    })
    .filter(Boolean)
    .slice(0, 6);

  if (!siblings.length) {
    return '';
  }

  return siblings
    .map((item) => {
      const summary = item.description.split(/(?<=\.)\s|(?<=다\.)\s/)[0].trim().slice(0, 110);
      const tail = summary ? ` — ${escapeHtml(summary)}` : '';
      return `            <li><a href="${item.path}">${escapeHtml(item.label)}</a>${tail}</li>`;
    })
    .join('\n');
}

function buildLocaleToolContent(meta, pageTitle, description, locale, { hidden = false } = {}) {
  const toolName = getCleanPageTitle(meta, pageTitle);
  const labels = TOOL_SUPPORT_LABELS[locale] || TOOL_SUPPORT_LABELS.ko;
  const support = getToolSupportCopy(meta, toolName, description, locale);
  // ponytail: 손으로 쓴 faq가 있을 때만 FAQ 섹션을 낸다. 자동생성분은 페이지끼리 문장이 겹쳤다.
  const faqItems = locale === 'ko' ? getStructuredFaq(meta) : [];
  const heading = support.heading || labels.fallbackHeading(toolName);
  const relatedMarkup = buildRelatedMarkup(meta, locale);
  const hiddenAttrs = hidden ? ' hidden aria-hidden="true"' : '';

  return `
    <section class="content-stack content-stack--generated" data-seo-support data-locale-block="${locale}" lang="${locale}"${hiddenAttrs}>
        <section class="content-section content-section--highlight">
          <p class="section-kicker">${escapeHtml(labels.featureKicker)}</p>
          <h2 class="section-title">${escapeHtml(heading)}</h2>
          <p class="section-lead">${escapeHtml(support.lead || description)}</p>
          <div class="content-grid">
${buildCardMarkup(support.cards)}
          </div>
        </section>

        <details class="content-more">
          <summary>${escapeHtml(labels.moreSummary)}</summary>

        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.stepsKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.stepsTitle)}</h2>
          <ol class="content-list">
${buildListMarkup(support.steps)}
          </ol>
        </section>

${
  support.examples?.length
    ? `
        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.examplesKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.examplesTitle)}</h2>
          <div class="example-list">
${buildExamplesMarkup(support.examples, labels)}
          </div>
        </section>
`
    : ''
}${
  support.troubles?.length
    ? `
        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.troublesKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.troublesTitle)}</h2>
          <div class="content-grid">
${buildCardMarkup(support.troubles)}
          </div>
        </section>
`
    : ''
}
        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.notesKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.notesTitle)}</h2>
          <div class="content-grid">
${buildCardMarkup(support.notes)}
          </div>
        </section>

${
  faqItems.length
    ? `
        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.faqKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.faqTitle)}</h2>
          <div class="faq-list">
${buildCardMarkup(faqItems, 'faq-item')}
          </div>
        </section>`
    : ''
}${
  relatedMarkup
    ? `
        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.relatedKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.relatedTitle)}</h2>
          <ul class="related-list">
${relatedMarkup}
          </ul>
        </section>`
    : ''
}
        </details>
    </section>`;
}

function buildGeneratedToolContent(meta, pageTitle, description) {
  return `
${buildLocaleToolContent(meta, pageTitle, description, 'ko')}
${buildLocaleToolContent(meta, pageTitle, description, 'en', { hidden: true })}`;
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
${NAV_UTILITY_LINKS.map((link) => `        <a href="${link.href}" data-chrome-link="${link.key}">${link.labels.ko}</a>`).join('\n')}
      </nav>`;

  return `
      <button id="pwaInstallBtn" class="pwa-install-btn" type="button" aria-hidden="true" tabindex="-1">설치</button>
${switcherMarkup}
      <button id="themeToggle" class="theme-toggle" type="button" aria-label="테마 전환">🌙</button>
${utilityMarkup}`;
}

// 푸터에는 저작권 한 줄뿐이었다. 상단에서 내린 정책 링크를 여기 붙인다.
// site.js가 data-chrome-link를 문서 전체에서 찾아 번역하므로 다국어는 자동으로 따라온다.
function injectFooterLinks(html) {
  if (/class="footer-links"/.test(html)) {
    return html;
  }

  const links = FOOTER_UTILITY_LINKS.map(
    (link) => `        <a href="${link.href}" data-chrome-link="${link.key}">${link.labels.ko}</a>`,
  ).join('\n');
  const nav = `      <nav class="footer-links" aria-label="사이트 정보">\n${links}\n      </nav>`;

  if (/<footer\b/i.test(html)) {
    return html.replace(/(<footer\b[^>]*>)/i, `$1\n${nav}`);
  }

  // 도구 18개는 푸터 자체가 없었다. 정책 링크가 닿을 곳이 없으면 만들어 준다.
  // body 직속으로 넣으면 .page 형제가 되어 오른쪽 컬럼처럼 떠버린다.
  // .page를 닫는 마지막 </div> 앞, 즉 래퍼 안에 넣어야 기존 푸터와 같은 자리에 온다.
  const footer = `    <footer class="footer footer--dev">\n${nav}\n    </footer>\n`;
  const closeIndex = html.lastIndexOf('</div>');

  if (closeIndex === -1) {
    return html.replace(/<\/body>/i, `${footer}</body>`);
  }

  return `${html.slice(0, closeIndex)}${footer}  ${html.slice(closeIndex)}`;
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

  const faq = getStructuredFaq(meta);
  if (faq.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return structuredData;
}

// ponytail: 손으로 쓴 콘텐츠가 이미 있는 페이지는 전체 생성 블록을 넣으면 중복이 된다.
// 예시/오류/관련도구 섹션만 뒤에 덧붙인다.
function buildExtraOnlyContent(meta, locale, { hidden = false } = {}) {
  const extra = TOOL_SUPPORT_EXTRA[meta.path]?.[locale];
  const labels = TOOL_SUPPORT_LABELS[locale] || TOOL_SUPPORT_LABELS.ko;
  const relatedMarkup = buildRelatedMarkup(meta, locale);

  if (!extra?.examples?.length && !extra?.troubles?.length && !relatedMarkup) {
    return '';
  }

  const hiddenAttrs = hidden ? ' hidden aria-hidden="true"' : '';

  return `
    <section class="content-stack content-stack--generated" data-seo-support data-locale-block="${locale}" lang="${locale}"${hiddenAttrs}>
        <details class="content-more">
          <summary>${escapeHtml(labels.moreSummary)}</summary>
${
  extra?.examples?.length
    ? `        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.examplesKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.examplesTitle)}</h2>
          <div class="example-list">
${buildExamplesMarkup(extra.examples, labels)}
          </div>
        </section>
`
    : ''
}${
  extra?.troubles?.length
    ? `        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.troublesKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.troublesTitle)}</h2>
          <div class="content-grid">
${buildCardMarkup(extra.troubles)}
          </div>
        </section>
`
    : ''
}${
  relatedMarkup
    ? `        <section class="content-section">
          <p class="section-kicker">${escapeHtml(labels.relatedKicker)}</p>
          <h2 class="section-title">${escapeHtml(labels.relatedTitle)}</h2>
          <ul class="related-list">
${relatedMarkup}
          </ul>
        </section>
`
    : ''
}        </details>
    </section>`;
}

function injectGeneratedToolContent(html, meta, pageTitle, description) {
  // 가이드 문서(kind: content)도 예시/오류 섹션을 받을 수 있게 허용한다.
  // 전체 생성 블록은 kind가 tool이고 자체 콘텐츠가 없을 때만 들어간다.
  if (meta.kind !== 'tool' && meta.kind !== 'content') {
    return html;
  }

  if (meta.kind === 'content' || /data-seo-support|class=["'][^"']*\bcontent-section\b/i.test(html)) {
    const extras = `${buildExtraOnlyContent(meta, 'ko')}\n${buildExtraOnlyContent(meta, 'en', { hidden: true })}`;
    return extras.trim() ? html.replace(/<\/main>/i, `</main>\n${extras}`) : html;
  }

  const content = buildGeneratedToolContent(meta, pageTitle, description);
  const messagePattern = /(<\/main>\s*)(<p\b[^>]*class=["'][^"']*\bmessage\b[^"']*["'][\s\S]*?<\/p>)/i;

  if (messagePattern.test(html)) {
    return html.replace(messagePattern, `$1$2\n${content}`);
  }

  return html.replace(/<\/main>/i, `</main>\n${content}`);
}

// ponytail: 숨긴 영어 블록을 HTML 본문에서 빼고 JSON 페이로드로 옮긴다.
// hidden + data-nosnippet 텍스트가 페이지의 35%를 차지해 애드센스/구글에 숨긴 텍스트로 읽혔다.
// 손으로 쓴 22개 페이지와 자동생성 20개 페이지가 같은 마크업을 쓰므로 여기 한 곳에서 모두 처리된다.
// 영어를 별도 URL(/en/...)로 빼면 이 단계는 필요 없어진다.
function findMatchingClose(html, tagName, openTagEnd) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>|</${tagName}\\s*>`, 'gi');
  pattern.lastIndex = openTagEnd;
  let depth = 1;
  let match;

  while ((match = pattern.exec(html))) {
    if (match[0][1] === '/') {
      depth -= 1;
      if (depth === 0) {
        return match.index + match[0].length;
      }
    } else if (!match[0].endsWith('/>')) {
      depth += 1;
    }
  }

  return -1;
}

function extractHiddenLocaleBlocks(html) {
  const blocks = [];
  const marker = /<([a-z]+)\b[^>]*\bdata-locale-block=["']en["'][^>]*>/gi;
  let result = '';
  let cursor = 0;
  let match;

  while ((match = marker.exec(html))) {
    const closeEnd = findMatchingClose(html, match[1], match.index + match[0].length);
    if (closeEnd === -1) {
      continue;
    }

    result += html.slice(cursor, match.index);
    result += `<div data-locale-slot="en" data-locale-index="${blocks.length}"></div>`;
    blocks.push(html.slice(match.index, closeEnd));
    cursor = closeEnd;
    marker.lastIndex = closeEnd;
  }

  if (!blocks.length) {
    return html;
  }

  result += html.slice(cursor);
  const payload = JSON.stringify(blocks).replaceAll('<', '\\u003c');

  return result.replace(
    /<\/body>/i,
    `  <script type="application/json" data-locale-payload="en">${payload}</script>\n</body>`,
  );
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
      const primaryHeading = meta.kind === 'tool' ? (meta.title || pageTitle).split('|')[0].trim() : '';
      if (primaryHeading) {
        nextHtml = nextHtml.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${escapeHtml(primaryHeading)}</h1>`);
      }
      nextHtml = injectGeneratedToolContent(nextHtml, meta, pageTitle, description);
      nextHtml = injectChromeShell(nextHtml, meta.path);
      nextHtml = injectFooterLinks(nextHtml);
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
      nextHtml = extractHiddenLocaleBlocks(nextHtml);
      nextHtml = upsertBodyAttribute(
        nextHtml,
        'data-allow-ads',
        // ponytail: meta.allowAds는 어느 PAGE_META에도 없어서 항상 undefined였음. noindex 페이지만 제외.
        ADSENSE_ENABLED && !meta.noindex ? 'true' : 'false',
      );

      const headTags = [
        buildClientBootScript(),
        buildClientBootStyle(),
        `  <meta name="google-adsense-account" content="${ADSENSE_PUBLISHER_ID}" />`,
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

      if (ADSENSE_ENABLED && !meta.noindex) {
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
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0];

        if (pathname === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(buildSitemapXml(buildDate));
          return;
        }

        if (pathname === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(buildRobotsTxt());
          return;
        }

        next();
      });
    },
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
