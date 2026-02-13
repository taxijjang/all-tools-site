import './style.css';
import { t } from './i18n.js';

const plainInput = document.getElementById('plainInput');
const base64Output = document.getElementById('base64Output');
const urlSafeEncode = document.getElementById('urlSafeEncode');
const base64Input = document.getElementById('base64Input');
const stripWhitespace = document.getElementById('stripWhitespace');
const urlSafeDecode = document.getElementById('urlSafeDecode');
const plainOutput = document.getElementById('plainOutput');
const base64Message = document.getElementById('base64Message');
const fileInput = document.getElementById('fileInput');
const downloadFileBtn = document.getElementById('downloadFileBtn');
const downloadFileName = document.getElementById('downloadFileName');

function showMessage(text, isError = false) {
  base64Message.textContent = text;
  base64Message.classList.toggle('message--error', isError);
}

function copyValue(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const value = el.value || el.textContent || '';
  navigator.clipboard
    .writeText(value)
    .then(() => showMessage(t('common.copySuccess')))
    .catch(() => showMessage(t('common.copyFail'), true));
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function base64ToUtf8(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    const slice = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function downloadBytes(bytes, filename = 'decoded.bin') {
  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename || 'decoded.bin';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function toUrlSafe(value) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromUrlSafe(value) {
  const replaced = value.replace(/-/g, '+').replace(/_/g, '/');
  const paddingNeeded = (4 - (replaced.length % 4)) % 4;
  return replaced + '='.repeat(paddingNeeded);
}

function sanitizeBase64(value) {
  let input = value || '';
  if (stripWhitespace?.checked) {
    input = input.replace(/\s+/g, '');
  }
  if (urlSafeDecode?.checked) {
    input = fromUrlSafe(input);
  }
  return input;
}

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => copyValue(btn.dataset.copy));
});

document.getElementById('encodeBtn').addEventListener('click', () => {
  try {
    const base64 = utf8ToBase64(plainInput.value || '');
    base64Output.value = urlSafeEncode.checked ? toUrlSafe(base64) : base64;
    showMessage(t('messages.base64.encodeSuccess'));
  } catch (err) {
    showMessage(t('messages.base64.encodeError'), true);
  }
});

document.getElementById('decodeBtn').addEventListener('click', () => {
  try {
    const input = sanitizeBase64(base64Input.value);
    plainOutput.value = base64ToUtf8(input);
    showMessage(t('messages.base64.decodeSuccess'));
  } catch (err) {
    showMessage(t('messages.base64.decodeError'), true);
  }
});

fileInput?.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  try {
    const buffer = await file.arrayBuffer();
    let base64 = arrayBufferToBase64(buffer);
    if (urlSafeEncode?.checked) {
      base64 = toUrlSafe(base64);
    }
    base64Output.value = base64;
    plainInput.value = '';
    showMessage(t('messages.base64.fileEncoded', { name: file.name }));
  } catch (err) {
    showMessage(t('messages.base64.fileError'), true);
  } finally {
    fileInput.value = '';
  }
});

downloadFileBtn?.addEventListener('click', () => {
  try {
    const input = sanitizeBase64(base64Input.value);
    if (!input) {
      showMessage(t('messages.base64.decodeError'), true);
      return;
    }
    const bytes = base64ToBytes(input);
    downloadBytes(bytes, downloadFileName?.value || 'decoded.bin');
    showMessage(t('messages.base64.fileDecoded'));
  } catch (err) {
    showMessage(t('messages.base64.fileError'), true);
  }
});
