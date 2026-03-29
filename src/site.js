import { bindLocaleSwitcher, initI18n, onLocaleChange, revealI18n, t } from './i18n.js';
import { CONTENT_PAGES, NAV_TOOLS, UTILITY_LINKS } from './chrome-meta.js';
import {
  FILE_PICKER_META,
  HOME_DISCOVERY_COPY,
  HOME_FILTERS,
  HOME_SPOTLIGHTS,
  HOME_WORKFLOWS,
  QUICK_START_META,
  TOOL_CATEGORY_MAP,
} from './ux-meta.js';
import './style.css';

// --- State & DOM Elements ---
const root = document.body;
const toolNamespace = document.body.dataset.tool || 'global';
const currentLocale = initI18n({ root, reveal: false });
let persistElements = [];
const adsAllowed = document.body.dataset.allowAds === 'true';

const chromeCopy = {
  ko: {
    installApp: '앱 설치',
    trustBadge: '브라우저 내부 처리',
    switchTool: '도구 이동',
    siteLinks: '사이트 링크',
    about: '소개',
    privacy: '개인정보 처리',
    contact: '문의',
    themeLight: '라이트 모드로 전환',
    themeDark: '다크 모드로 전환',
  },
  en: {
    installApp: 'Install App',
    trustBadge: 'Browser-side processing',
    switchTool: 'Switch tool',
    siteLinks: 'Site links',
    about: 'About',
    privacy: 'Privacy',
    contact: 'Contact',
    themeLight: 'Switch to Light Mode',
    themeDark: 'Switch to Dark Mode',
  },
};

function getChromeCopy(locale = document.documentElement.getAttribute('lang')) {
  return chromeCopy[locale] || chromeCopy.en;
}

function getToolLabel(tool, locale = document.documentElement.getAttribute('lang')) {
  return tool?.labels?.[locale] || tool?.labels?.en || tool?.value || '';
}

function getLocalizedValue(labels, locale = document.documentElement.getAttribute('lang')) {
  return labels?.[locale] || labels?.en || '';
}

function applyTemplate(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function sanitizeAnalyticsValue(value) {
  if (value == null) return undefined;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  return String(value).slice(0, 100);
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  const normalized = Object.fromEntries(
    Object.entries({
      tool_name: toolNamespace,
      page_path: window.location.pathname,
      ...params,
    }).flatMap(([key, value]) => {
      const sanitized = sanitizeAnalyticsValue(value);
      return sanitized == null ? [] : [[key, sanitized]];
    }),
  );

  window.gtag('event', eventName, normalized);
}

function trackToolInteraction(action, params = {}) {
  trackEvent('tool_interaction', {
    interaction_name: action,
    ...params,
  });
}

function getButtonLabel(button) {
  return (
    button?.dataset?.trackLabel ||
    button?.getAttribute('aria-label') ||
    button?.textContent?.replace(/\s+/g, ' ').trim() ||
    button?.id ||
    'button'
  );
}

function getLinkLabel(link) {
  return (
    link?.dataset?.trackLabel ||
    link?.textContent?.replace(/\s+/g, ' ').trim() ||
    link?.getAttribute('href') ||
    'link'
  );
}

function getToolPath(href = '') {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch (err) {
    return href;
  }
}

function getCategoryLabel(categoryKey, locale = document.documentElement.getAttribute('lang')) {
  const entry = HOME_FILTERS.find((filter) => filter.key === categoryKey);
  return getLocalizedValue(entry?.labels, locale);
}

function getAdCopy(locale = document.documentElement.getAttribute('lang') || currentLocale) {
  if (locale === 'ko') {
    return {
      label: 'Sponsored',
      note: 'Google 제공 광고',
    };
  }

  return {
    label: 'Sponsored',
    note: 'Google-provided ad',
  };
}

function formatBytesForUi(bytes, locale = document.documentElement.getAttribute('lang') || currentLocale) {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const maximumFractionDigits = unitIndex === 0 ? 0 : value >= 100 ? 0 : 1;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value)} ${units[unitIndex]}`;
}

function getFilePickerKey(input) {
  const tool = document.body.dataset.tool || 'global';
  return `${tool}:${input.id}`;
}

function getDefaultFileChips(input) {
  const accept = input.getAttribute('accept') || '';
  if (accept.includes('application/pdf')) {
    return ['PDF'];
  }
  if (accept.includes('image/*')) {
    return ['PNG', 'JPG', 'WEBP', 'SVG'];
  }
  return ['ANY'];
}

function getDefaultFileHint(input, locale = document.documentElement.getAttribute('lang') || currentLocale) {
  const accept = input.getAttribute('accept') || '';
  const multiple = input.hasAttribute('multiple');

  if (accept.includes('application/pdf')) {
    return multiple ? t('upload.hintPdfMany') : t('upload.hintPdfSingle');
  }
  if (accept.includes('image/*')) {
    return t('upload.hintImage');
  }
  return t('upload.hintAny');
}

function setFileInputSelection(input, files) {
  const dt = new DataTransfer();
  Array.from(files || []).forEach((file) => dt.items.add(file));
  input.files = dt.files;
}

function setupFilePickers() {
  const inputs = Array.from(document.querySelectorAll('input[type="file"]')).filter(
    (input) => !input.closest('.file-drop-zone'),
  );
  if (!inputs.length) {
    return () => {};
  }

  const refreshers = [];

  inputs.forEach((input) => {
    if (!input.id) return;

    const label = document.querySelector(`label[for="${input.id}"]`);
    const meta = FILE_PICKER_META[getFilePickerKey(input)] || {};
    let selectedFiles = [];
    let wrapper = input.closest('.file-picker');

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'file-picker';
      wrapper.innerHTML = `
        <div class="file-picker__surface">
          <div class="file-picker__copy">
            <p class="file-picker__eyebrow" data-file-picker-eyebrow></p>
            <p class="file-picker__title" data-file-picker-title></p>
            <p class="file-picker__hint" data-file-picker-hint></p>
            <div class="file-picker__chips" data-file-picker-chips></div>
          </div>
          <div class="file-picker__actions">
            <button type="button" class="primary file-picker__browse" data-file-picker-browse></button>
            <button type="button" class="ghost file-picker__clear" data-file-picker-clear></button>
          </div>
          <div class="file-picker__footer">
            <p class="file-picker__status" data-file-picker-status></p>
            <ul class="file-picker__list" data-file-picker-list hidden></ul>
          </div>
        </div>
      `;
      input.replaceWith(wrapper);
      wrapper.prepend(input);
    }

    input.classList.add('file-picker__input');
    if (label) {
      label.classList.add('sr-only');
    }

    const browseButton = wrapper.querySelector('[data-file-picker-browse]');
    const clearButton = wrapper.querySelector('[data-file-picker-clear]');
    const titleEl = wrapper.querySelector('[data-file-picker-title]');
    const hintEl = wrapper.querySelector('[data-file-picker-hint]');
    const eyebrowEl = wrapper.querySelector('[data-file-picker-eyebrow]');
    const chipsEl = wrapper.querySelector('[data-file-picker-chips]');
    const statusEl = wrapper.querySelector('[data-file-picker-status]');
    const listEl = wrapper.querySelector('[data-file-picker-list]');

    function render(locale = document.documentElement.getAttribute('lang') || currentLocale) {
      const files = selectedFiles;
      const totalBytes = files.reduce((sum, file) => sum + (Number(file.size) || 0), 0);
      const title = label?.textContent?.replace(/\s+/g, ' ').trim() || t('upload.titleDefault');
      const hint = getLocalizedValue(meta.hint, locale) || getDefaultFileHint(input, locale);
      const chips = meta.chips || getDefaultFileChips(input);

      eyebrowEl.textContent = t('upload.eyebrow');
      titleEl.textContent = title;
      hintEl.textContent = hint;
      browseButton.textContent = files.length ? t('upload.replace') : t('upload.choose');
      clearButton.textContent = t('upload.clear');
      clearButton.disabled = files.length === 0;

      chipsEl.innerHTML = chips
        .map((chip) => `<span class="file-picker__chip">${escapeHtml(String(chip))}</span>`)
        .join('');

      if (!files.length) {
        statusEl.textContent = t('upload.none');
        listEl.hidden = true;
        listEl.innerHTML = '';
        return;
      }

      if (files.length === 1) {
        const file = files[0];
        statusEl.textContent = t('upload.singleSummary', {
          name: file.name,
          size: formatBytesForUi(file.size, locale),
        });
      } else {
        statusEl.textContent = t('upload.multiSummary', {
          count: String(files.length),
          size: formatBytesForUi(totalBytes, locale),
        });
      }

      listEl.hidden = false;
      listEl.innerHTML = files
        .slice(0, 3)
        .map(
          (file) =>
            `<li>${escapeHtml(file.name)} <span>${escapeHtml(
              formatBytesForUi(file.size, locale),
            )}</span></li>`,
        )
        .join('');

      if (files.length > 3) {
        const extra = document.createElement('li');
        extra.textContent = t('upload.extraFiles', { count: String(files.length - 3) });
        listEl.append(extra);
      }
    }

    input.addEventListener(
      'change',
      () => {
        selectedFiles = Array.from(input.files || []);
      },
      true,
    );

    input.addEventListener('change', () => {
      render();
    });

    browseButton?.addEventListener('click', () => {
      input.click();
    });

    clearButton?.addEventListener('click', () => {
      selectedFiles = [];
      input.value = '';
      render();
    });

    wrapper.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('button')) {
        return;
      }
      input.click();
    });

    ['dragenter', 'dragover'].forEach((type) => {
      wrapper.addEventListener(type, (event) => {
        event.preventDefault();
        wrapper.classList.add('file-picker--active');
      });
    });

    ['dragleave', 'dragend'].forEach((type) => {
      wrapper.addEventListener(type, (event) => {
        event.preventDefault();
        if (!(event.currentTarget instanceof Element) || !event.currentTarget.contains(event.relatedTarget)) {
          wrapper.classList.remove('file-picker--active');
        }
      });
    });

    wrapper.addEventListener('drop', (event) => {
      event.preventDefault();
      wrapper.classList.remove('file-picker--active');
      const droppedFiles = Array.from(event.dataTransfer?.files || []);
      if (!droppedFiles.length) {
        return;
      }
      selectedFiles = input.hasAttribute('multiple') ? droppedFiles : droppedFiles.slice(0, 1);
      setFileInputSelection(input, selectedFiles);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      render();
    });

    render();
    refreshers.push(render);
  });

  return (locale = document.documentElement.getAttribute('lang') || currentLocale) => {
    refreshers.forEach((refresh) => refresh(locale));
  };
}

const RELATED_TOOL_MAP = {
  uuid: ['/uuidv7', '/base64', '/json'],
  base64: ['/url', '/image-base64', '/json'],
  json: ['/json-yaml', '/diff', '/api-tester'],
  jwt: ['/base64', '/timestamp', '/api-tester'],
  url: ['/query-builder', '/utm-builder', '/base64'],
  hash: ['/file-hash', '/password', '/base64'],
  cron: ['/timestamp', '/seo-check', '/api-tester'],
  timestamp: ['/jwt', '/url', '/utm-builder'],
  password: ['/hash', '/base64', '/regex'],
  regex: ['/text-cleaner', '/diff', '/json'],
  qr: ['/url', '/utm-builder', '/image-optimize'],
  diff: ['/json', '/text-cleaner', '/markdown'],
  color: ['/image-optimize', '/qr', '/seo-check'],
  markdown: ['/text-cleaner', '/json', '/seo-check'],
  convert: ['/timestamp', '/color', '/url'],
  'file-hash': ['/hash', '/image-optimize', '/pdf-toolkit'],
  'image-base64': ['/base64', '/image-optimize', '/ocr'],
  uuidv7: ['/uuid', '/timestamp', '/json'],
  'case-convert': ['/text-cleaner', '/json', '/query-builder'],
  'json-yaml': ['/json', '/diff', '/api-tester'],
  'query-builder': ['/url', '/utm-builder', '/seo-check'],
  'ip-ua': ['/api-tester', '/seo-check', '/ip-cidr'],
  'ip-cidr': ['/ip-ua', '/api-tester', '/seo-check'],
  'text-stats': ['/text-cleaner', '/markdown', '/seo-check'],
  'pdf-toolkit': ['/image-optimize', '/ocr', '/file-hash'],
  'image-optimize': ['/ocr', '/pdf-toolkit', '/image-base64'],
  ocr: ['/image-optimize', '/pdf-toolkit', '/text-cleaner'],
  'seo-check': ['/utm-builder', '/query-builder', '/api-tester'],
  'utm-builder': ['/query-builder', '/seo-check', '/url'],
  'text-cleaner': ['/text-stats', '/markdown', '/diff'],
  'api-tester': ['/json', '/seo-check', '/query-builder'],
};

const FEATURED_HOME_PATHS = new Set([
  '/uuid',
  '/base64',
  '/json',
  '/jwt',
  '/pdf-toolkit',
  '/image-optimize',
]);

function getRelatedCopy(locale = document.documentElement.getAttribute('lang')) {
  if (locale === 'ko') {
    return {
      heading: '함께 쓰면 좋은 도구',
      lead: '현재 작업과 이어지는 도구를 바로 열 수 있게 묶어뒀습니다.',
      cta: '이 도구 열기',
    };
  }

  return {
    heading: 'Related tools for this workflow',
    lead: 'Open the next utility that commonly pairs with the page you are using now.',
    cta: 'Open tool',
  };
}

function getRelatedTools(currentTool) {
  const toolLookup = new Map(NAV_TOOLS.map((tool) => [tool.value, tool]));
  const defaultPaths = ['/uuid', '/base64', '/json'];
  const candidatePaths = RELATED_TOOL_MAP[currentTool] || defaultPaths;

  return candidatePaths
    .filter((path, index, list) => path !== `/${currentTool}` && list.indexOf(path) === index)
    .map((path) => toolLookup.get(path))
    .filter(Boolean)
    .slice(0, 3);
}

function injectRelatedToolsSection() {
  const currentTool = document.body.dataset.tool || 'global';
  if (currentTool === 'home' || CONTENT_PAGES.has(currentTool)) return;

  const page = document.querySelector('.page');
  const footer = page?.querySelector('.footer');
  if (!page || !footer || page.querySelector('.related-tools')) return;

  const relatedTools = getRelatedTools(currentTool);
  if (!relatedTools.length) return;

  const copy = getRelatedCopy();
  const section = document.createElement('section');
  section.className = 'content-section related-tools';
  section.innerHTML = `
    <p class="section-kicker">Explore</p>
    <h2 class="section-title" data-related-heading>${copy.heading}</h2>
    <p class="section-lead" data-related-lead>${copy.lead}</p>
    <div class="related-tools__grid"></div>
  `;

  const grid = section.querySelector('.related-tools__grid');
  relatedTools.forEach((tool) => {
    const link = document.createElement('a');
    link.className = 'related-tool-link';
    link.href = tool.value;
    link.innerHTML = `
      <span class="related-tool-link__eyebrow">${tool.value}</span>
      <strong class="related-tool-link__title">${getToolLabel(tool)}</strong>
      <span class="related-tool-link__cta" data-related-cta>${copy.cta}</span>
    `;
    grid.appendChild(link);
  });

  footer.before(section);
}

function setupHomeDiscovery() {
  const grid = document.querySelector('[data-home-grid]');
  const searchInput = document.querySelector('[data-home-search]');
  const filtersHost = document.querySelector('[data-home-filters]');
  const resultsEl = document.querySelector('[data-home-results]');
  const spotlightsHost = document.querySelector('[data-home-spotlights]');
  const workflowsHost = document.querySelector('[data-home-workflows]');
  if (!grid || !searchInput || !filtersHost || !resultsEl || !workflowsHost) {
    return () => {};
  }

  const cards = Array.from(grid.querySelectorAll('.card[href]'));
  let activeFilter = 'all';

  cards.forEach((card) => {
    const path = getToolPath(card.getAttribute('href'));
    card.dataset.category = TOOL_CATEGORY_MAP[path] || 'ops';
    card.classList.toggle('card--featured', FEATURED_HOME_PATHS.has(path));

    let meta = card.querySelector('.card__meta');
    if (!meta) {
      meta = document.createElement('span');
      meta.className = 'card__meta';
      const heading = card.querySelector('h2');
      if (heading) {
        card.insertBefore(meta, heading);
      } else {
        card.prepend(meta);
      }
    }
  });

  function renderSpotlightCards(locale) {
    if (!spotlightsHost) {
      return;
    }

    spotlightsHost.innerHTML = HOME_SPOTLIGHTS.map((spotlight) => {
      const spotlightCopy = spotlight.labels[locale] || spotlight.labels.en;
      const links = spotlight.links
        .map(
          (link) =>
            `<a class="home-spotlight__link" href="${link.href}">${escapeHtml(
              getLocalizedValue(link.labels, locale),
            )}</a>`,
        )
        .join('');

      return `
        <article class="home-spotlight">
          <p class="home-spotlight__eyebrow">${escapeHtml(spotlightCopy.eyebrow)}</p>
          <h3 class="home-spotlight__title">${escapeHtml(spotlightCopy.title)}</h3>
          <p class="home-spotlight__description">${escapeHtml(spotlightCopy.description)}</p>
          <div class="home-spotlight__links">${links}</div>
        </article>
      `;
    }).join('');
  }

  function renderWorkflowCards(locale) {
    const copy = HOME_DISCOVERY_COPY[locale] || HOME_DISCOVERY_COPY.en;
    workflowsHost.innerHTML = HOME_WORKFLOWS.map((workflow) => {
      const workflowCopy = workflow.labels[locale] || workflow.labels.en;
      const links = workflow.links
        .map(
          (link) =>
            `<a class="home-workflow__link" href="${link.href}">${escapeHtml(
              getLocalizedValue(link.labels, locale),
            )}</a>`,
        )
        .join('');

      return `
        <article class="home-workflow">
          <p class="home-workflow__eyebrow">${escapeHtml(copy.workflowEyebrow)}</p>
          <h3>${escapeHtml(workflowCopy.title)}</h3>
          <p>${escapeHtml(workflowCopy.description)}</p>
          <div class="home-workflow__links">${links}</div>
        </article>
      `;
    }).join('');
  }

  function applyFilters(locale = document.documentElement.getAttribute('lang') || currentLocale) {
    const copy = HOME_DISCOVERY_COPY[locale] || HOME_DISCOVERY_COPY.en;
    const rawQuery = searchInput.value.trim();
    const query = rawQuery.toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardText = `${card.textContent || ''} ${card.getAttribute('href') || ''}`.toLowerCase();
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesQuery = !query || cardText.includes(query);
      const isVisible = matchesFilter && matchesQuery;
      card.hidden = !isVisible;
      card.classList.toggle('card--hidden', !isVisible);
      if (isVisible) {
        visibleCount += 1;
      }
    });

    let message = copy.resultsAll;
    const filterLabel = activeFilter === 'all' ? '' : getCategoryLabel(activeFilter, locale);
    if (query && activeFilter !== 'all') {
      message = copy.resultsMixed;
    } else if (query) {
      message = copy.resultsSearch;
    } else if (activeFilter !== 'all') {
      message = copy.resultsFiltered;
    }

    if (visibleCount === 0) {
      resultsEl.textContent = copy.resultsEmpty;
      resultsEl.classList.add('is-empty');
      return;
    }

    resultsEl.textContent = applyTemplate(message, {
      count: String(visibleCount),
      filter: filterLabel,
      query: rawQuery,
    });
    resultsEl.classList.remove('is-empty');
  }

  function render(locale = document.documentElement.getAttribute('lang') || currentLocale) {
    const copy = HOME_DISCOVERY_COPY[locale] || HOME_DISCOVERY_COPY.en;

    const kickerEl = document.querySelector('[data-home-kicker]');
    const headingEl = document.querySelector('[data-home-heading]');
    const leadEl = document.querySelector('[data-home-lead]');
    const searchLabelEl = document.querySelector('[data-home-search-label]');
    const spotlightKickerEl = document.querySelector('[data-home-spotlight-kicker]');
    const spotlightHeadingEl = document.querySelector('[data-home-spotlight-heading]');
    const spotlightLeadEl = document.querySelector('[data-home-spotlight-lead]');
    const catalogKickerEl = document.querySelector('[data-home-catalog-kicker]');
    const catalogHeadingEl = document.querySelector('[data-home-catalog-heading]');
    const catalogLinkEl = document.querySelector('[data-home-catalog-link]');

    if (kickerEl) kickerEl.textContent = copy.kicker;
    if (headingEl) headingEl.textContent = copy.heading;
    if (leadEl) leadEl.textContent = copy.lead;
    if (searchLabelEl) searchLabelEl.textContent = copy.searchLabel;
    if (spotlightKickerEl) spotlightKickerEl.textContent = copy.spotlightKicker;
    if (spotlightHeadingEl) spotlightHeadingEl.textContent = copy.spotlightHeading;
    if (spotlightLeadEl) spotlightLeadEl.textContent = copy.spotlightLead;
    if (catalogKickerEl) catalogKickerEl.textContent = copy.catalogKicker;
    if (catalogHeadingEl) catalogHeadingEl.textContent = copy.catalogHeading;
    if (catalogLinkEl) catalogLinkEl.textContent = copy.catalogLink;
    searchInput.placeholder = copy.searchPlaceholder;

    cards.forEach((card) => {
      const meta = card.querySelector('.card__meta');
      if (meta) {
        meta.textContent = getCategoryLabel(card.dataset.category, locale);
      }
    });

    filtersHost.innerHTML = HOME_FILTERS.map((filter) => {
      const isActive = filter.key === activeFilter;
      return `
        <button
          type="button"
          class="filter-chip${isActive ? ' is-active' : ''}"
          data-filter-key="${filter.key}"
          aria-pressed="${String(isActive)}"
        >
          ${escapeHtml(getLocalizedValue(filter.labels, locale))}
        </button>
      `;
    }).join('');

    filtersHost.querySelectorAll('[data-filter-key]').forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filterKey || 'all';
        render(locale);
      });
    });

    renderSpotlightCards(locale);
    renderWorkflowCards(locale);
    applyFilters(locale);
  }

  searchInput.addEventListener('input', () => {
    applyFilters(document.documentElement.getAttribute('lang') || currentLocale);
  });

  render();
  return render;
}

function runQuickStartAction(actionKey) {
  trackToolInteraction('quick_start', { action_key: actionKey });

  switch (actionKey) {
    case 'uuid-generate': {
      const mode = document.getElementById('uuidVersion');
      if (mode) {
        mode.value = 'v4';
      }
      document.getElementById('generateBtn')?.click();
      document.getElementById('randomUuid')?.focus();
      break;
    }
    case 'uuid-sample-hex': {
      const source = document.getElementById('randomUuid');
      const input = document.getElementById('uuidInput');
      if (input) {
        input.value = source?.value || '550e8400-e29b-41d4-a716-446655440000';
      }
      document.getElementById('uuidToHexBtn')?.click();
      document.getElementById('hexOutput')?.focus();
      break;
    }
    case 'base64-sample-encode': {
      const input = document.getElementById('plainInput');
      const urlSafe = document.getElementById('urlSafeEncode');
      if (input) {
        input.value = 'alice@example.com:open-sesame';
      }
      if (urlSafe) {
        urlSafe.checked = false;
      }
      document.getElementById('encodeBtn')?.click();
      document.getElementById('base64Output')?.focus();
      break;
    }
    case 'base64-sample-decode': {
      const input = document.getElementById('base64Input');
      const stripWhitespace = document.getElementById('stripWhitespace');
      const urlSafe = document.getElementById('urlSafeDecode');
      if (input) {
        input.value = 'dXNlcj1hbGljZSZyb2xlPWRldg==';
      }
      if (stripWhitespace) {
        stripWhitespace.checked = true;
      }
      if (urlSafe) {
        urlSafe.checked = false;
      }
      document.getElementById('decodeBtn')?.click();
      document.getElementById('plainOutput')?.focus();
      break;
    }
    case 'json-sample':
      document.getElementById('sampleBtn')?.click();
      document.getElementById('jsonInput')?.focus();
      break;
    case 'json-format':
      document.getElementById('formatBtn')?.click();
      document.getElementById('jsonOutput')?.focus();
      break;
    case 'jwt-sample':
      document.getElementById('jwtSampleBtn')?.click();
      document.getElementById('jwtInput')?.focus();
      break;
    case 'jwt-decode':
      document.getElementById('decodeJwtBtn')?.click();
      document.getElementById('jwtPayload')?.focus();
      break;
    case 'seo-load-sample':
      document.getElementById('seoSampleBtn')?.click();
      document.getElementById('seoHtml')?.focus();
      break;
    case 'seo-run-sample':
      document.getElementById('seoSampleBtn')?.click();
      document.getElementById('seoRunBtn')?.click();
      document.getElementById('seoOutput')?.focus();
      break;
    case 'regex-sample':
      document.getElementById('reSampleBtn')?.click();
      document.getElementById('rePattern')?.focus();
      break;
    case 'regex-test':
      document.getElementById('reTestBtn')?.click();
      document.getElementById('reMatches')?.focus();
      break;
    default:
      break;
  }
}

function setupQuickStartPanel() {
  const currentTool = document.body.dataset.tool || 'global';
  const meta = QUICK_START_META[currentTool];
  const header = document.querySelector('.page-header');
  const main = document.querySelector('.tool');
  if (!meta || !header || !main) {
    return () => {};
  }

  let panel = document.querySelector('.quick-start');
  if (!panel) {
    panel = document.createElement('section');
    panel.className = 'quick-start';
    header.after(panel);
  }

  function render(locale = document.documentElement.getAttribute('lang') || currentLocale) {
    const copy = meta.copy[locale] || meta.copy.en;
    const checks = copy.checks
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');
    const actions = meta.actions
      .map((action) => {
        const label = escapeHtml(getLocalizedValue(action.labels, locale));
        if (action.kind === 'link') {
          return `<a class="link-button" href="${action.href}">${label}</a>`;
        }
        return `<button type="button" class="link-button" data-quick-action="${action.key}">${label}</button>`;
      })
      .join('');

    panel.innerHTML = `
      <div class="quick-start__intro">
        <p class="section-kicker">${escapeHtml(copy.kicker)}</p>
        <h2 class="section-title">${escapeHtml(copy.title)}</h2>
        <p class="section-lead">${escapeHtml(copy.lead)}</p>
      </div>
      <div class="quick-start__body">
        <ul class="quick-start__checklist">${checks}</ul>
        <div class="quick-start__actions">${actions}</div>
      </div>
    `;

    panel.querySelectorAll('[data-quick-action]').forEach((button) => {
      button.addEventListener('click', () => runQuickStartAction(button.dataset.quickAction));
    });
  }

  render();
  return render;
}

// --- Theme Management ---
function initTheme() {
  const saved = localStorage.getItem('stateless-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('stateless-theme', next);
  updateThemeIcon(next);
  trackEvent('theme_toggle', { from_theme: current, to_theme: next });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = theme === 'light' ? '☀️' : '🌙';
  const copy = getChromeCopy();
  btn.setAttribute('aria-label', theme === 'light' ? copy.themeDark : copy.themeLight);
}

// --- Navigation & Header Injection ---
function setupGlobalNavigation() {
  const controls = document.querySelector('.page-controls');
  if (!controls) return;

  const currentTool = document.body.dataset.tool || 'global';
  const localeAnchor =
    controls.querySelector('.locale-switcher') ||
    controls.querySelector('label[for="localeSelect"]') ||
    controls.firstChild;

  let switcherContainer = controls.querySelector('.tool-switcher');
  if (!CONTENT_PAGES.has(currentTool)) {
    if (!switcherContainer) {
      switcherContainer = document.createElement('div');
      switcherContainer.className = 'tool-switcher';
      switcherContainer.innerHTML = '<select id="toolSelect"></select>';
      controls.insertBefore(switcherContainer, localeAnchor);
    }

    const select = switcherContainer.querySelector('select');
    if (select) {
      const currentPath = window.location.pathname.replace(/\/$/, '');
      select.innerHTML = NAV_TOOLS.map((tool) => {
        const selected =
          currentPath === tool.value ||
          currentPath === tool.value + '.html' ||
          (tool.value === '/' && (currentPath === '' || currentPath === '/index.html'));
        return `<option value="${tool.value}"${selected ? ' selected' : ''}>${getToolLabel(tool, 'ko')}</option>`;
      }).join('');
      select.onchange = (event) => {
        if (event.target.value) {
          window.location.href = event.target.value;
        }
      };
    }
  } else if (switcherContainer) {
    switcherContainer.remove();
  }

  let themeBtn = controls.querySelector('#themeToggle');
  if (!themeBtn) {
    themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggle';
    themeBtn.className = 'theme-toggle';
    themeBtn.type = 'button';
    controls.insertBefore(themeBtn, localeAnchor);
  }
  themeBtn.onclick = toggleTheme;

  let installBtn = controls.querySelector('#pwaInstallBtn');
  if (!installBtn) {
    installBtn = document.createElement('button');
    installBtn.id = 'pwaInstallBtn';
    installBtn.className = 'pwa-install-btn';
    installBtn.type = 'button';
    controls.insertBefore(installBtn, controls.firstChild);
  }
  installBtn.onclick = installPWA;

  let utilityLinks = controls.querySelector('.utility-links');
  if (!utilityLinks) {
    utilityLinks = document.createElement('nav');
    utilityLinks.className = 'utility-links';
    utilityLinks.innerHTML = UTILITY_LINKS.map(
      (link) => `<a href="${link.href}" data-chrome-link="${link.key}">${link.labels.ko}</a>`,
    ).join('');
    controls.appendChild(utilityLinks);
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);

  const header = document.querySelector('.page-header h1, .hero h1');
  if (header) {
    let badge = header.querySelector('.trust-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'trust-badge';
      badge.dataset.chromeBadge = 'trust';
      badge.textContent = '🔒';
      header.appendChild(badge);
    }
  }

  if (adsAllowed && !document.querySelector('script[src*="adsbygoogle"]')) {
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4324902308911757';
    adScript.crossOrigin = 'anonymous';
    document.head.appendChild(adScript);
  }

  updateChromeText();
}

function updateChromeText(locale = document.documentElement.getAttribute('lang')) {
  const copy = getChromeCopy(locale);
  const relatedCopy = getRelatedCopy(locale);
  const installBtn = document.getElementById('pwaInstallBtn');
  if (installBtn) {
    installBtn.textContent = `⬇️ ${copy.installApp}`;
  }

  const switcher = document.querySelector('.tool-switcher select');
  if (switcher) {
    switcher.setAttribute('aria-label', copy.switchTool);
    Array.from(switcher.options).forEach((option) => {
      const tool = NAV_TOOLS.find((item) => item.value === option.value);
      if (tool) {
        option.textContent = getToolLabel(tool, locale);
      }
    });
  }

  const utilityLinks = document.querySelector('.page-controls .utility-links');
  if (utilityLinks) {
    utilityLinks.setAttribute('aria-label', copy.siteLinks);
  }
  document.querySelectorAll('[data-chrome-link]').forEach((link) => {
    const entry = UTILITY_LINKS.find((item) => item.key === link.dataset.chromeLink);
    if (entry) {
      link.textContent = entry.labels[locale] || entry.labels.en;
    }
  });

  const relatedHeading = document.querySelector('[data-related-heading]');
  if (relatedHeading) {
    relatedHeading.textContent = relatedCopy.heading;
  }

  const relatedLead = document.querySelector('[data-related-lead]');
  if (relatedLead) {
    relatedLead.textContent = relatedCopy.lead;
  }

  document.querySelectorAll('[data-related-cta]').forEach((link) => {
    link.textContent = relatedCopy.cta;
  });

  const badge = document.querySelector('[data-chrome-badge="trust"]');
  if (badge) {
    badge.innerHTML = `🔒 ${copy.trustBadge}`;
  }

  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(theme);
  updateContentAdCopy(locale);
}

function syncLocaleBlocks(locale = document.documentElement.getAttribute('lang') || currentLocale) {
  document.querySelectorAll('[data-locale-block]').forEach((block) => {
    const isActive = block.dataset.localeBlock === locale;
    block.hidden = !isActive;
    block.setAttribute('aria-hidden', String(!isActive));
  });
}

function createContentAdSlot() {
  const locale = document.documentElement.getAttribute('lang') || currentLocale;
  const copy = getAdCopy(locale);
  const slot = document.createElement('aside');
  slot.className = 'content-ad';
  slot.setAttribute('aria-label', copy.note);
  slot.innerHTML = `
    <div class="content-ad__frame">
      <p class="content-ad__eyebrow" data-content-ad-label>${copy.label}</p>
      <ins
        class="adsbygoogle content-ad__slot"
        style="display:block"
        data-ad-client="ca-pub-4324902308911757"
        data-ad-slot="9966144067"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <p class="content-ad__note" data-content-ad-note>${copy.note}</p>
    </div>
  `;
  return slot;
}

function updateContentAdCopy(locale = document.documentElement.getAttribute('lang') || currentLocale) {
  const copy = getAdCopy(locale);
  document.querySelectorAll('[data-content-ad-label]').forEach((label) => {
    label.textContent = copy.label;
  });
  document.querySelectorAll('[data-content-ad-note]').forEach((note) => {
    note.textContent = copy.note;
  });
}

function injectContentAds() {
  if (!adsAllowed) return;
  const page = document.querySelector('.page');
  const footer = page?.querySelector('.footer');
  if (!page || page.querySelector('.content-ad')) return;

  const contentStack = page.querySelector('.content-stack');
  const anchor =
    contentStack?.querySelector('.content-section') ||
    page.querySelector('.quick-start') ||
    page.querySelector('.tool') ||
    footer;

  if (!anchor) return;

  const ad = createContentAdSlot();
  anchor.after(ad);

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.warn('Content ad init failed', err);
  }
}

function setupAnalytics() {
  trackEvent('tool_view', {
    locale: currentLocale,
    ads_enabled: adsAllowed ? 'true' : 'false',
  });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!target) return;

    if (target.matches('a.card, .related-tool-link, .home-spotlight__link, .home-workflow__link, [data-chrome-link]')) {
      trackEvent('navigation_click', {
        destination: target.getAttribute('href') || '',
        link_label: getLinkLabel(target),
      });
      return;
    }

    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (target.dataset.copy || target.dataset.shareState) {
      return;
    }

    if (target.id === 'pdfDownloadBtn' || /download/i.test(target.id)) {
      trackToolInteraction('download_result', {
        button_id: target.id || '',
        button_label: getButtonLabel(target),
      });
      return;
    }

    if (target.dataset.quickAction || target.classList.contains('primary') || /Btn$/i.test(target.id || '')) {
      trackToolInteraction('button_click', {
        button_id: target.id || '',
        button_label: getButtonLabel(target),
      });
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
      return;
    }

    if (target instanceof HTMLInputElement && target.type === 'file') {
      const files = Array.from(target.files || []);
      const totalBytes = files.reduce((sum, file) => sum + (Number(file.size) || 0), 0);
      trackToolInteraction('file_upload', {
        input_id: target.id || '',
        file_count: files.length,
        total_bytes: totalBytes,
      });
      return;
    }

    if (target.id === 'toolSelect') {
      trackEvent('tool_switch', { destination: target.value || '' });
      return;
    }

    if (target.id === 'localeSelect') {
      trackEvent('locale_change', { locale: target.value || '' });
    }
  });
}

// --- PWA Installation ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) {
    btn.style.display = 'inline-flex';
    btn.removeAttribute('aria-hidden');
    btn.removeAttribute('tabindex');
  }
});

async function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    deferredPrompt = null;
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) {
      btn.style.display = 'none';
      btn.setAttribute('aria-hidden', 'true');
      btn.setAttribute('tabindex', '-1');
    }
  }
}

// --- Toast Notification System ---
export function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2500);
}

// --- Persistence & State Sharing ---
function storageKey(field) {
  return `stateless:${toolNamespace}:${field}`;
}

function deserializeValue(el, raw) {
  if (raw == null) return;
  if (el.type === 'checkbox') {
    el.checked = raw === 'true';
  } else if ('value' in el) {
    el.value = raw;
  }
}

function serializeValue(el) {
  if (el.type === 'checkbox') {
    return el.checked ? 'true' : 'false';
  }
  return el.value ?? '';
}

function applyHashState() {
  const hash = window.location.hash.slice(1);
  if (!hash) return false;
  const params = new URLSearchParams(hash);
  const encoded = params.get('state');
  if (!encoded) return false;
  try {
    const json = decodeURIComponent(atob(encoded));
    const state = JSON.parse(json);
    persistElements.forEach((el) => {
      const key = el.dataset.persist;
      if (state[key] != null) {
        deserializeValue(el, state[key]);
      }
    });
    return true;
  } catch (err) {
    console.warn('Failed to parse shared state', err);
    return false;
  }
}

function hydratePersistentFields() {
  persistElements = Array.from(document.querySelectorAll('[data-persist]'));
  const fromHash = applyHashState();

  persistElements.forEach((el) => {
    const key = el.dataset.persist;
    if (!fromHash) {
      const saved = localStorage.getItem(storageKey(key));
      if (saved !== null) {
        deserializeValue(el, saved);
      }
    }
    const handler = () => {
      try {
        localStorage.setItem(storageKey(key), serializeValue(el));
      } catch (err) {
        // ignore quota errors
      }
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
}

// --- Clipboard & Sharing ---
function setupActions() {
  // Share State
  document.querySelectorAll('[data-share-state]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const state = {};
      persistElements.forEach((el) => {
        state[el.dataset.persist] = serializeValue(el);
      });
      try {
        const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
        const shareUrl = new URL(window.location.href);
        shareUrl.hash = `state=${encoded}`;
        await navigator.clipboard.writeText(shareUrl.toString());
        trackEvent('share_state', { state_fields: Object.keys(state).length });
        showToast('URL copied to clipboard!', 'success');
      } catch (err) {
        console.error('Failed to copy share URL', err);
        showToast('Failed to copy URL', 'error');
      }
    });
  });

  // Generic Copy Buttons
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.copy;
      const target = document.getElementById(targetId);
      if (!target) return;

      const text = target.value || target.textContent;
      try {
        await navigator.clipboard.writeText(text);
        trackEvent('copy_result', {
          target_id: targetId,
          text_length: typeof text === 'string' ? text.length : String(text || '').length,
        });
        showToast('Copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy', 'error');
      }
    });
  });
}

// --- Initialization ---
initTheme();

window.addEventListener('DOMContentLoaded', () => {
  const localeSelect = document.getElementById('localeSelect');
  if (localeSelect) {
    bindLocaleSwitcher(localeSelect, { root });
  }

  const refreshFilePickers = setupFilePickers();
  setupGlobalNavigation();
  const refreshHomeDiscovery = setupHomeDiscovery();
  const refreshQuickStart = setupQuickStartPanel();
  injectRelatedToolsSection();
  syncLocaleBlocks(currentLocale);
  onLocaleChange((locale) => {
    syncLocaleBlocks(locale);
    updateChromeText(locale);
    refreshFilePickers(locale);
    refreshHomeDiscovery(locale);
    refreshQuickStart(locale);
    window.statelessTools.locale = locale;
  });
  injectContentAds();
  setupAnalytics();
  hydratePersistentFields();
  setupActions();
  revealI18n();
});

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    const hadController = Boolean(navigator.serviceWorker.controller);
    let reloadedForUpdate = false;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloadedForUpdate) return;
      reloadedForUpdate = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch((err) => {
        console.warn('SW registration failed', err);
      });
  });
}

window.statelessTools = {
  locale: currentLocale,
  showToast,
  trackEvent,
  trackToolInteraction,
};
