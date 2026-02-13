import './style.css';
import { t } from './i18n.js';

const randomUuidInput = document.getElementById('randomUuid');
const generateBtn = document.getElementById('generateBtn');
const uuidInput = document.getElementById('uuidInput');
const hexOutput = document.getElementById('hexOutput');
const hexInput = document.getElementById('hexInput');
const uuidOutput = document.getElementById('uuidOutput');
const uuidMessage = document.getElementById('uuidMessage');
const uuidVersionSelect = document.getElementById('uuidVersion');
const bulkCountInput = document.getElementById('bulkCount');
const bulkOutput = document.getElementById('bulkOutput');
const bulkGenerateBtn = document.getElementById('bulkGenerateBtn');

const ULID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function showMessage(text, isError = false) {
  uuidMessage.textContent = text;
  uuidMessage.classList.toggle('message--error', isError);
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

function normalizeUuid(value) {
  const trimmed = value.trim();
  const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  if (!uuidRegex.test(trimmed)) {
    throw new Error(t('messages.uuid.toHexError'));
  }
  return trimmed.replace(/-/g, '').toLowerCase();
}

function normalizeHex(value) {
  const clean = value.replace(/\s+/g, '').toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(clean)) {
    throw new Error(t('messages.uuid.toUuidError'));
  }
  return clean;
}

function formatUuid(hex) {
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join('-');
}

function generateUlid() {
  const time = Date.now();
  let timestamp = time.toString(32).toUpperCase();
  timestamp = timestamp.padStart(8, '0');
  const randomBytes = crypto.getRandomValues(new Uint8Array(10));
  let randomPart = '';
  randomBytes.forEach((byte) => {
    randomPart += ULID_ALPHABET[byte % ULID_ALPHABET.length];
  });
  return (timestamp + randomPart).slice(0, 26);
}

function generateIdentifier() {
  const mode = uuidVersionSelect?.value || 'v4';
  if (mode === 'ulid') {
    return generateUlid();
  }
  return crypto.randomUUID();
}

generateBtn.addEventListener('click', () => {
  const value = generateIdentifier();
  randomUuidInput.value = value;
  showMessage(t('messages.uuid.randomGenerated'));
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => copyValue(btn.dataset.copy));
});

document.getElementById('uuidToHexBtn').addEventListener('click', () => {
  try {
    const hex = normalizeUuid(uuidInput.value);
    hexOutput.value = hex;
    showMessage(t('messages.uuid.toHexSuccess'));
  } catch (err) {
    showMessage(err.message, true);
  }
});

document.getElementById('hexToUuidBtn').addEventListener('click', () => {
  try {
    const uuid = formatUuid(normalizeHex(hexInput.value));
    uuidOutput.value = uuid;
    showMessage(t('messages.uuid.toUuidSuccess'));
  } catch (err) {
    showMessage(err.message, true);
  }
});

bulkGenerateBtn?.addEventListener('click', () => {
  const count = Math.min(Math.max(parseInt(bulkCountInput.value || '1', 10) || 1, 1), 50);
  bulkCountInput.value = count;
  const values = Array.from({ length: count }, () => generateIdentifier());
  bulkOutput.value = values.join('\n');
  showMessage(t('messages.uuid.bulkGenerated', { count }));
});

// 초기 UUID 준비
randomUuidInput.value = generateIdentifier();
