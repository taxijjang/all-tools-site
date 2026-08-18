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

// /query-builder 를 여기로 합쳤다. 쿼리스트링 도구가 파싱(/url)과 생성
// (/query-builder)으로 갈려 있었는데 방향만 다른 같은 일이다.
// 페이지를 따로 두면 둘 다 얇아지고 어느 쪽도 순위를 못 잡는다.
const qb = {
  base: document.getElementById('qbBaseUrl'),
  rows: document.getElementById('qbRows'),
  add: document.getElementById('qbAddRowBtn'),
  build: document.getElementById('qbBuildBtn'),
  output: document.getElementById('qbOutput'),
};

function buildQueryRow(key = '', value = '') {
  const wrap = document.createElement('div');
  wrap.className = 'tool-grid-3';
  const keyInput = document.createElement('input');
  keyInput.type = 'text';
  keyInput.className = 'qb-key';
  keyInput.placeholder = 'key';
  keyInput.value = key;
  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.className = 'qb-value';
  valueInput.placeholder = 'value';
  valueInput.value = value;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'ghost qb-remove';
  remove.textContent = t('query.remove');
  remove.addEventListener('click', () => wrap.remove());
  wrap.append(keyInput, valueInput, remove);
  return wrap;
}

function buildQueryUrl() {
  try {
    const url = new URL(qb.base.value || 'https://example.com');
    const params = new URLSearchParams();
    qb.rows.querySelectorAll('.tool-grid-3').forEach((rowEl) => {
      const key = rowEl.querySelector('.qb-key').value.trim();
      if (key) params.append(key, rowEl.querySelector('.qb-value').value);
    });
    url.search = params.toString();
    qb.output.value = url.toString();
    showMessage(t('query.success'));
  } catch {
    showMessage(t('query.error.base'), true);
  }
}

if (qb.base && qb.rows && qb.build && qb.output) {
  qb.add.addEventListener('click', () => qb.rows.appendChild(buildQueryRow()));
  qb.build.addEventListener('click', buildQueryUrl);
  qb.rows.appendChild(buildQueryRow('utm_source', 'google'));
  qb.rows.appendChild(buildQueryRow('utm_medium', 'cpc'));
  buildQueryUrl();
}
