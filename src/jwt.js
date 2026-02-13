import './style.css';
import { t } from './i18n.js';

const jwtInput = document.getElementById('jwtInput');
const headerEl = document.getElementById('jwtHeader');
const payloadEl = document.getElementById('jwtPayload');
const messageEl = document.getElementById('jwtMessage');
const metaEl = document.getElementById('jwtMeta');

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('message--error', isError);
}

function base64UrlDecode(segment) {
  const replaced = segment.replace(/-/g, '+').replace(/_/g, '/');
  const paddingNeeded = (4 - (replaced.length % 4)) % 4;
  const padded = replaced + '='.repeat(paddingNeeded);
  const binary = atob(padded);
  let result = '';
  for (let i = 0; i < binary.length; i += 1) {
    result += `%${(`00${binary.charCodeAt(i).toString(16)}`).slice(-2)}`;
  }
  return decodeURIComponent(result);
}

function prettyPrint(json) {
  return JSON.stringify(json, null, 2);
}

function describeClaims(payload) {
  if (!payload) {
    metaEl.textContent = '';
    return;
  }
  const now = Math.floor(Date.now() / 1000);
  const exp = payload.exp;
  const nbf = payload.nbf;
  const parts = [];
  if (typeof exp === 'number') {
    const expired = exp < now;
    const date = new Date(exp * 1000).toISOString();
    parts.push(expired ? t('jwt.meta.expired', { date }) : t('jwt.meta.expires', { date }));
  }
  if (typeof nbf === 'number') {
    const active = nbf <= now;
    const date = new Date(nbf * 1000).toISOString();
    parts.push(active ? t('jwt.meta.nbfActive', { date }) : t('jwt.meta.nbfPending', { date }));
  }
  metaEl.textContent = parts.join(' · ');
}

function decodeJwt() {
  try {
    const token = jwtInput.value.trim();
    if (!token) {
      showMessage(t('jwt.error.empty'), true);
      return;
    }
    const parts = token.split('.');
    if (parts.length < 2) {
      showMessage(t('jwt.error.format'), true);
      return;
    }
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    headerEl.textContent = prettyPrint(header);
    payloadEl.textContent = prettyPrint(payload);
    describeClaims(payload);
    showMessage(t('jwt.success'));
  } catch (err) {
    showMessage(t('jwt.error.decode'), true);
  }
}

document.getElementById('decodeJwtBtn').addEventListener('click', decodeJwt);

document.getElementById('jwtClearBtn').addEventListener('click', () => {
  jwtInput.value = '';
  headerEl.textContent = '';
  payloadEl.textContent = '';
  metaEl.textContent = '';
  showMessage('');
});

document.getElementById('jwtSampleBtn').addEventListener('click', () => {
  const sample =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUxNjIzOTAyMn0.' +
    'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
  jwtInput.value = sample;
  decodeJwt();
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    const value = el.value || el.textContent || '';
    navigator.clipboard
      .writeText(value)
      .then(() => showMessage(t('common.copySuccess')))
      .catch(() => showMessage(t('common.copyFail'), true));
  });
});
