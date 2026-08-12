import { translations } from './i18n-dict.js';
const SUPPORTED_LOCALES = ['ko', 'en'];

// 사전은 DOM에 의존하지 않는 순수 데이터라 별도 모듈로 뒀다.
// 빌드에서도 import해 /en/ 페이지의 텍스트를 미리 박는다(vite.config.js).


const initialLocale = window.__preferredLocale || getInitialLocale();
let currentLocale = initialLocale;
const listeners = new Set();

function getInitialLocale() {
  const stored = safeStorage('get', 'stateless-tools-locale');
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    return stored;
  }
  const browser = navigator.language?.slice(0, 2);
  if (browser && SUPPORTED_LOCALES.includes(browser)) {
    return browser;
  }
  return 'ko';
}

function safeStorage(action, key, value) {
  try {
    if (action === 'set') {
      localStorage.setItem(key, value);
    } else if (action === 'get') {
      return localStorage.getItem(key);
    }
  } catch (err) {
    // ignore storage failures (private mode, etc)
  }
  return null;
}

function format(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (match, name) => (vars[name] ?? match));
}

export function t(key, vars) {
  const dict = translations[currentLocale] || translations.ko;
  const template = dict[key];
  if (!template) return key;
  if (vars) {
    return format(template, vars);
  }
  return template;
}

function applyTranslations(root = document) {
  const elements = root.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const value = t(key);
    if (!value) return;
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.textContent = value;
    }
  });
}

export function setLocale(locale, { root = document } = {}) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    locale = 'en';
  }
  if (currentLocale === locale) return;
  currentLocale = locale;
  safeStorage('set', 'stateless-tools-locale', locale);
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('data-preferred-locale', locale);
  applyTranslations(root);
  listeners.forEach((cb) => cb(locale));
}

export function initI18n({ root = document, reveal = true } = {}) {
  document.documentElement.setAttribute('lang', currentLocale);
  document.documentElement.setAttribute('data-preferred-locale', currentLocale);
  applyTranslations(root);
  if (reveal) {
    document.documentElement.classList.remove('i18n-pending');
  }
  return currentLocale;
}

export function revealI18n() {
  document.documentElement.classList.remove('i18n-pending');
}

export function bindLocaleSwitcher(selectEl, { root = document } = {}) {
  if (!selectEl) return;
  selectEl.value = currentLocale;
  selectEl.addEventListener('change', (event) => {
    setLocale(event.target.value, { root });
  });
  listeners.add((locale) => {
    selectEl.value = locale;
  });
}

export function onLocaleChange(handler) {
  listeners.add(handler);
  return () => listeners.delete(handler);
}
