import './style.css';
import { t } from './i18n.js';

const input = document.getElementById('hashInput');
const algorithmSelect = document.getElementById('hashAlgorithm');
const uppercaseToggle = document.getElementById('hashUppercase');
const hexOutput = document.getElementById('hashHex');
const base64Output = document.getElementById('hashBase64');
const messageEl = document.getElementById('hashMessage');

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('message--error', isError);
}

function arrayBufferToHex(buffer, uppercase = false) {
  const bytes = new Uint8Array(buffer);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return uppercase ? hex.toUpperCase() : hex;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function computeHash() {
  try {
    const value = input.value;
    if (!value) {
      showMessage(t('hash.error.empty'), true);
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const algorithm = algorithmSelect.value || 'SHA-256';
    const digest = await crypto.subtle.digest(algorithm, data);
    hexOutput.value = arrayBufferToHex(digest, uppercaseToggle.checked);
    base64Output.value = arrayBufferToBase64(digest);
    showMessage(t('hash.success', { algorithm }));
  } catch (err) {
    showMessage(t('hash.error.unsupported'), true);
  }
}

document.getElementById('hashComputeBtn').addEventListener('click', computeHash);
document.getElementById('hashClearBtn').addEventListener('click', () => {
  input.value = '';
  hexOutput.value = '';
  base64Output.value = '';
  showMessage('');
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
