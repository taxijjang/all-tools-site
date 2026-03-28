import { bindLocaleSwitcher, initI18n, onLocaleChange } from './i18n.js';
import './style.css';

// --- State & DOM Elements ---
const root = document.body;
const currentLocale = initI18n({ root });
let persistElements = [];
const adsAllowed = document.body.dataset.allowAds === 'true';
const contentPages = new Set(['learn', 'about', 'privacy', 'contact']);

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

const NAV_TOOLS = [
  { value: '/', label: 'Home' },
  { value: '/uuid', label: 'UUID' },
  { value: '/base64', label: 'Base64' },
  { value: '/json', label: 'JSON' },
  { value: '/jwt', label: 'JWT' },
  { value: '/cron', label: 'Cron' },
  { value: '/url', label: 'URL' },
  { value: '/hash', label: 'Hash' },
  { value: '/timestamp', label: 'Timestamp' },
  { value: '/password', label: 'Password' },
  { value: '/regex', label: 'Regex' },
  { value: '/qr', label: 'QR' },
  { value: '/diff', label: 'Diff' },
  { value: '/color', label: 'Color' },
  { value: '/markdown', label: 'Markdown' },
  { value: '/convert', label: 'Convert' },
  { value: '/file-hash', label: 'File Hash' },
  { value: '/image-base64', label: 'Image Base64' },
  { value: '/uuidv7', label: 'UUID v7' },
  { value: '/case-convert', label: 'Case' },
  { value: '/json-yaml', label: 'JSON YAML' },
  { value: '/query-builder', label: 'Query Builder' },
  { value: '/ip-ua', label: 'IP / UA' },
  { value: '/ip-cidr', label: 'IP/CIDR' },
  { value: '/text-stats', label: 'Text Stats' },
  { value: '/pdf-toolkit', label: 'PDF Toolkit' },
  { value: '/image-optimize', label: 'Image Optimize' },
  { value: '/ocr', label: 'OCR' },
  { value: '/seo-check', label: 'SEO Check' },
  { value: '/utm-builder', label: 'UTM Builder' },
  { value: '/text-cleaner', label: 'Text Cleaner' },
  { value: '/api-tester', label: 'API Tester' },
];

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
  if (currentTool === 'home' || contentPages.has(currentTool)) return;

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
      <strong class="related-tool-link__title">${tool.label}</strong>
      <span class="related-tool-link__cta" data-related-cta>${copy.cta}</span>
    `;
    grid.appendChild(link);
  });

  footer.before(section);
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

  // 1. Tool Switcher (Quick Jump)
  const tools = NAV_TOOLS;
  const currentTool = document.body.dataset.tool || 'global';
  const anchor = controls.querySelector('label[for="localeSelect"]') || controls.firstChild;

  if (!contentPages.has(currentTool)) {
    const switcherContainer = document.createElement('div');
    switcherContainer.className = 'tool-switcher';

    const select = document.createElement('select');
    select.onchange = (e) => {
      if (e.target.value) window.location.href = e.target.value;
    };

    const currentPath = window.location.pathname.replace(/\/$/, '');
    tools.forEach((tool) => {
      const option = document.createElement('option');
      option.value = tool.value;
      option.textContent = tool.label;
      if (
        currentPath === tool.value ||
        currentPath === tool.value + '.html' ||
        (tool.value === '/' && (currentPath === '' || currentPath === '/index.html'))
      ) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    switcherContainer.appendChild(select);
    controls.insertBefore(switcherContainer, anchor);
  }

  const themeBtn = document.createElement('button');
  themeBtn.id = 'themeToggle';
  themeBtn.className = 'theme-toggle';
  themeBtn.type = 'button';
  themeBtn.onclick = toggleTheme;
  controls.insertBefore(themeBtn, anchor);

  const installBtn = document.createElement('button');
  installBtn.id = 'pwaInstallBtn';
  installBtn.className = 'pwa-install-btn';
  installBtn.type = 'button';
  installBtn.onclick = installPWA;
  controls.insertBefore(installBtn, controls.firstChild);

  const utilityLinks = document.createElement('nav');
  utilityLinks.className = 'utility-links';
  utilityLinks.setAttribute('aria-label', getChromeCopy().siteLinks);
  [
    { key: 'learn', href: '/learn' },
    { key: 'about', href: '/about' },
    { key: 'privacy', href: '/privacy' },
    { key: 'contact', href: '/contact' },
  ].forEach((link) => {
    const anchorEl = document.createElement('a');
    anchorEl.href = link.href;
    anchorEl.dataset.chromeLink = link.key;
    if (link.key === 'learn') {
      anchorEl.dataset.fallbackLabel = 'Guides';
    }
    utilityLinks.appendChild(anchorEl);
  });
  controls.insertAdjacentElement('afterend', utilityLinks);

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);

  const header = document.querySelector('.page-header h1, .hero h1');
  if (header) {
    const badge = document.createElement('span');
    badge.className = 'trust-badge';
    badge.innerHTML = '🔒';
    badge.dataset.chromeBadge = 'trust';
    header.appendChild(badge);
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
  }

  const utilityLinks = document.querySelector('.utility-links');
  if (utilityLinks) {
    utilityLinks.setAttribute('aria-label', copy.siteLinks);
  }
  document.querySelectorAll('[data-chrome-link]').forEach((link) => {
    if (link.dataset.chromeLink === 'learn') {
      link.textContent = locale === 'ko' ? '가이드' : 'Guides';
      return;
    }
    link.textContent = copy[link.dataset.chromeLink] || link.dataset.fallbackLabel || link.dataset.chromeLink;
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
}

function syncLocaleBlocks(locale = document.documentElement.getAttribute('lang') || currentLocale) {
  document.querySelectorAll('[data-locale-block]').forEach((block) => {
    const isActive = block.dataset.localeBlock === locale;
    block.hidden = !isActive;
    block.setAttribute('aria-hidden', String(!isActive));
  });
}

function createAdRail(side) {
  const rail = document.createElement('aside');
  rail.className = `ad-rail ad-rail--${side}`;
  rail.setAttribute('aria-label', side === 'left' ? '좌측 광고' : '우측 광고');

  const wrap = document.createElement('div');
  const slot = document.createElement('ins');
  slot.className = 'adsbygoogle ad-rail__slot';
  slot.style.display = 'block';
  slot.dataset.adFormat = 'fluid';
  slot.dataset.adLayoutKey = '-bb+85+2h-1m-4u';
  slot.dataset.adClient = 'ca-pub-4324902308911757';
  slot.dataset.adSlot = '9966144067';

  const note = document.createElement('p');
  note.className = 'ad-rail__note';
  note.textContent = 'Google 제공 광고';

  wrap.appendChild(slot);
  wrap.appendChild(note);
  rail.appendChild(wrap);
  return rail;
}

function injectDesktopAdRails() {
  if (!adsAllowed) return;
  if (window.matchMedia('(max-width: 1180px)').matches) return;
  const page = document.querySelector('.page');
  if (!page || document.querySelector('.ad-rail')) return;

  const left = createAdRail('left');
  const right = createAdRail('right');
  page.before(left);
  page.after(right);

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.warn('Ad rail init failed', err);
  }
}

// --- PWA Installation ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'inline-flex';
});

async function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    deferredPrompt = null;
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.style.display = 'none';
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
const toolNamespace = document.body.dataset.tool || 'global';

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

  setupGlobalNavigation();
  injectRelatedToolsSection();
  syncLocaleBlocks(currentLocale);
  onLocaleChange((locale) => {
    syncLocaleBlocks(locale);
    updateChromeText(locale);
  });
  injectDesktopAdRails();
  hydratePersistentFields();
  setupActions();
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
};
