import { bindLocaleSwitcher, initI18n } from './i18n.js';
import './style.css';

// --- State & DOM Elements ---
const root = document.body;
const currentLocale = initI18n({ root });
let persistElements = [];

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
  // Simple emoji icon swapping
  btn.textContent = theme === 'light' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
}

// --- Navigation & Header Injection ---
function setupGlobalNavigation() {
  const controls = document.querySelector('.page-controls');
  if (!controls) return;

  // 1. Tool Switcher (Quick Jump)
  const tools = [
    { value: '/', label: 'Home' },
    { value: '/uuid', label: 'UUID' },
    { value: '/base64', label: 'Base64' },
    { value: '/json', label: 'JSON' },
    { value: '/jwt', label: 'JWT' },
    { value: '/cron', label: 'Cron' },
    { value: '/url', label: 'URL' },
    { value: '/hash', label: 'Hash' },
    { value: '/timestamp', label: 'Timestamp' },
  ];

  const switcherContainer = document.createElement('div');
  switcherContainer.className = 'tool-switcher';

  const select = document.createElement('select');
  select.ariaLabel = 'Switch Tool';
  select.onchange = (e) => {
    if (e.target.value) window.location.href = e.target.value;
  };

  const currentPath = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
  tools.forEach(tool => {
    const option = document.createElement('option');
    option.value = tool.value;
    option.textContent = tool.label;
    // Match logic: strict match or handling index.html specially if needed,
    // but usually currentPath will be '/uuid' or '/uuid.html'.
    // We try to match with or without .html to be safe.
    if (currentPath === tool.value || currentPath === tool.value + '.html' || (tool.value === '/' && (currentPath === '' || currentPath === '/index.html'))) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  switcherContainer.appendChild(select);

  // Insert Tool Switcher at the beginning
  controls.insertBefore(switcherContainer, controls.firstChild);

  // 2. Theme Toggle
  const themeBtn = document.createElement('button');
  themeBtn.id = 'themeToggle';
  themeBtn.className = 'theme-toggle';
  themeBtn.type = 'button';
  themeBtn.onclick = toggleTheme;

  // Insert Toggle after tool switcher (before locale)
  controls.insertBefore(themeBtn, controls.children[1]);

  // 3. PWA Install Button
  const installBtn = document.createElement('button');
  installBtn.id = 'pwaInstallBtn';
  installBtn.className = 'pwa-install-btn';
  installBtn.type = 'button';
  installBtn.innerHTML = '⬇️ App';
  installBtn.onclick = installPWA;
  controls.insertBefore(installBtn, controls.firstChild); // First item

  // Initialize icon state
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);

  // Inject Trust Badge
  const header = document.querySelector('.page-header h1, .hero h1');
  if (header) {
    const badge = document.createElement('span');
    badge.className = 'trust-badge';
    badge.innerHTML = '🔒 Secure & Client-side';
    header.appendChild(badge);
  }

  // 4. Inject Google AdSense
  if (!document.querySelector('script[src*="adsbygoogle"]')) {
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4324902308911757";
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);
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
  hydratePersistentFields();
  setupActions();
});

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW registration failed', err);
    });
  });
}

window.statelessTools = {
  locale: currentLocale,
  showToast,
};
