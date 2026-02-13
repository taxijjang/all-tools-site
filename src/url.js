import './style.css';
import { t } from './i18n.js';

const input = document.getElementById('urlInput');
const output = document.getElementById('urlOutput');
const paramsContainer = document.getElementById('urlParams');
const messageEl = document.getElementById('urlMessage');

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('message--error', isError);
}

function renderParams(value) {
  paramsContainer.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'param-table__inner';
  const tbody = document.createElement('tbody');
  let search = '';
  try {
    const url = new URL(value);
    search = url.search;
  } catch (err) {
    const maybeQuery = value.includes('=') ? value : '';
    search = maybeQuery.startsWith('?') ? maybeQuery : `?${maybeQuery}`;
  }
  const searchParams = new URLSearchParams(search);
  if ([...searchParams].length === 0) {
    paramsContainer.textContent = t('url.paramsEmpty');
    return;
  }
  searchParams.forEach((val, key) => {
    const row = document.createElement('tr');
    const keyCell = document.createElement('td');
    keyCell.textContent = key;
    const valueCell = document.createElement('td');
    valueCell.textContent = val;
    row.append(keyCell, valueCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  paramsContainer.appendChild(table);
}

function encodeValue() {
  try {
    const value = input.value;
    if (!value) {
      showMessage(t('url.error.empty'), true);
      return;
    }
    const encoded = encodeURIComponent(value);
    output.value = encoded;
    renderParams(value);
    showMessage(t('url.success.encode'));
  } catch (err) {
    showMessage(t('url.error.encode'), true);
  }
}

function decodeValue() {
  try {
    const value = input.value || output.value;
    if (!value) {
      showMessage(t('url.error.empty'), true);
      return;
    }
    const decoded = decodeURIComponent(value.replace(/\+/g, ' '));
    output.value = decoded;
    renderParams(decoded);
    showMessage(t('url.success.decode'));
  } catch (err) {
    showMessage(t('url.error.decode'), true);
  }
}

document.getElementById('urlEncodeBtn').addEventListener('click', encodeValue);
document.getElementById('urlDecodeBtn').addEventListener('click', decodeValue);
document.getElementById('urlClearBtn').addEventListener('click', () => {
  input.value = '';
  output.value = '';
  paramsContainer.textContent = '';
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
