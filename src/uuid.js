import './style.css';
import { onLocaleChange, t } from './i18n.js';

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
const uuidInspector = document.getElementById('uuidInspector');

const ULID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
let lastGeneratedKind = 'v4';

const inspectorCopy = {
  ko: {
    kind: '종류',
    length: '길이',
    sortable: '정렬',
    storage: '저장',
    random: '랜덤',
    timeOrdered: '시간순',
    binary16: 'binary(16)',
    text: 'text',
  },
  en: {
    kind: 'Kind',
    length: 'Length',
    sortable: 'Sort',
    storage: 'Storage',
    random: 'Random',
    timeOrdered: 'Time ordered',
    binary16: 'binary(16)',
    text: 'text',
  },
};

function showMessage(text, isError = false) {
  uuidMessage.textContent = text;
  uuidMessage.classList.toggle('message--error', isError);
}

function getInspectorCopy(locale = document.documentElement.getAttribute('lang') || 'ko') {
  return inspectorCopy[locale] || inspectorCopy.en;
}

function renderInspector(value = randomUuidInput.value, kind = lastGeneratedKind) {
  if (!uuidInspector || !value) return;
  const copy = getInspectorCopy();
  const isUlid = kind === 'ulid';
  const entries = [
    [copy.kind, isUlid ? 'ULID' : 'UUID v4'],
    [copy.length, `${value.length}`],
    [copy.sortable, isUlid ? copy.timeOrdered : copy.random, isUlid ? 'ok' : ''],
    [copy.storage, isUlid ? copy.text : copy.binary16],
  ];

  uuidInspector.innerHTML = entries
    .map(
      ([label, value, state = '']) => `
        <div class="tool-inspector__item${state ? ` tool-inspector__item--${state}` : ''}">
          <span class="tool-inspector__label">${label}</span>
          <span class="tool-inspector__value">${value}</span>
        </div>
      `,
    )
    .join('');
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
  let time = Date.now();
  let timestamp = '';
  for (let i = 0; i < 10; i += 1) {
    timestamp = ULID_ALPHABET[time % 32] + timestamp;
    time = Math.floor(time / 32);
  }
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));
  let randomPart = '';
  randomBytes.forEach((byte) => {
    randomPart += ULID_ALPHABET[byte % 32];
  });
  return `${timestamp}${randomPart}`;
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
  lastGeneratedKind = uuidVersionSelect?.value || 'v4';
  randomUuidInput.value = value;
  renderInspector(value, lastGeneratedKind);
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
  lastGeneratedKind = uuidVersionSelect?.value || 'v4';
  renderInspector(values[0], lastGeneratedKind);
  showMessage(t('messages.uuid.bulkGenerated', { count }));
});

// 초기 UUID 준비
lastGeneratedKind = uuidVersionSelect?.value || 'v4';
randomUuidInput.value = generateIdentifier();
renderInspector(randomUuidInput.value, lastGeneratedKind);

onLocaleChange(() => {
  renderInspector(randomUuidInput.value, lastGeneratedKind);
});
