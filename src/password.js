import './style.css';
import { t } from './i18n.js';

const dom = {
  length: document.getElementById('pwLength'),
  lengthValue: document.getElementById('pwLengthValue'),
  count: document.getElementById('pwCount'),
  lower: document.getElementById('pwLower'),
  upper: document.getElementById('pwUpper'),
  numbers: document.getElementById('pwNumbers'),
  symbols: document.getElementById('pwSymbols'),
  excludeAmbiguous: document.getElementById('pwExcludeAmbiguous'),
  output: document.getElementById('pwOutput'),
  strength: document.getElementById('pwStrength'),
  message: document.getElementById('pwMessage'),
  generateBtn: document.getElementById('pwGenerateBtn'),
  clearBtn: document.getElementById('pwClearBtn'),
};

const CHARSETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~',
};

const AMBIGUOUS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

function showMessage(text, isError = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', isError);
}

function randomInt(maxExclusive) {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > 0xffffffff) {
    throw new RangeError('maxExclusive out of range');
  }

  const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
  const buffer = new Uint32Array(1);

  while (true) {
    crypto.getRandomValues(buffer);
    const value = buffer[0];
    if (value < limit) {
      return value % maxExclusive;
    }
  }
}

function buildPool() {
  let pool = '';
  if (dom.lower.checked) pool += CHARSETS.lower;
  if (dom.upper.checked) pool += CHARSETS.upper;
  if (dom.numbers.checked) pool += CHARSETS.numbers;
  if (dom.symbols.checked) pool += CHARSETS.symbols;

  if (dom.excludeAmbiguous.checked) {
    pool = [...pool].filter((char) => !AMBIGUOUS.has(char)).join('');
  }

  // Remove duplicates if option combinations overlap.
  return [...new Set(pool.split(''))].join('');
}

function estimateStrength(length, poolSize) {
  if (!length || !poolSize) {
    return { key: 'password.strength.weak', bits: 0 };
  }

  const bits = Math.round(length * Math.log2(poolSize));
  if (bits < 40) return { key: 'password.strength.weak', bits };
  if (bits < 60) return { key: 'password.strength.fair', bits };
  if (bits < 80) return { key: 'password.strength.good', bits };
  if (bits < 100) return { key: 'password.strength.strong', bits };
  return { key: 'password.strength.excellent', bits };
}

function generateOne(length, pool) {
  let password = '';
  for (let i = 0; i < length; i += 1) {
    const index = randomInt(pool.length);
    password += pool[index];
  }
  return password;
}

function updateLengthBadge() {
  dom.lengthValue.textContent = String(dom.length.value);
}

function generatePasswords() {
  const pool = buildPool();
  const length = Number(dom.length.value || 16);
  const count = Math.min(Math.max(Number(dom.count.value || 5), 1), 20);

  if (!pool.length) {
    showMessage(t('password.error.charset'), true);
    dom.output.value = '';
    dom.strength.textContent = '';
    return;
  }

  const generated = [];
  for (let i = 0; i < count; i += 1) {
    generated.push(generateOne(length, pool));
  }

  dom.output.value = generated.join('\n');

  const strength = estimateStrength(length, pool.length);
  dom.strength.textContent = t('password.strength.label', {
    level: t(strength.key),
    bits: String(strength.bits),
  });

  showMessage(t('password.success.generated', { count: String(count) }));
}

dom.length.addEventListener('input', updateLengthBadge);
dom.generateBtn.addEventListener('click', generatePasswords);
dom.clearBtn.addEventListener('click', () => {
  dom.output.value = '';
  dom.strength.textContent = '';
  showMessage('');
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.value || target.textContent || '');
      showMessage(t('common.copySuccess'));
    } catch {
      showMessage(t('common.copyFail'), true);
    }
  });
});

updateLengthBadge();
generatePasswords();
