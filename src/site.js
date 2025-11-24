import { bindLocaleSwitcher, initI18n } from './i18n.js';
import './style.css';

const root = document.body;
const currentLocale = initI18n({ root });

const localeSelect = document.getElementById('localeSelect');
bindLocaleSwitcher(localeSelect, { root });

const toolNamespace = document.body.dataset.tool || 'global';
const persistElements = Array.from(document.querySelectorAll('[data-persist]'));

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

function setupShareButtons() {
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
        btn.dataset.shareStatus = 'copied';
        setTimeout(() => {
          btn.dataset.shareStatus = '';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy share URL', err);
      }
    });
  });
}

hydratePersistentFields();
setupShareButtons();

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW registration failed', err);
    });
  });
}

window.statelessTools = {
  locale: currentLocale,
};
