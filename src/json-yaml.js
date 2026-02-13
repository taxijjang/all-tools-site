import './style.css';
import { t } from './i18n.js';

const dom = {
  input: document.getElementById('jyInput'),
  toYaml: document.getElementById('jyToYamlBtn'),
  toJson: document.getElementById('jyToJsonBtn'),
  csvToJson: document.getElementById('jyCsvToJsonBtn'),
  jsonToCsv: document.getElementById('jyJsonToCsvBtn'),
  clear: document.getElementById('jyClearBtn'),
  output: document.getElementById('jyOutput'),
  message: document.getElementById('jyMessage'),
};

function setMessage(text, err = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', err);
}

function toYaml() {
  try {
    const obj = JSON.parse(dom.input.value);
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    dom.output.value = window.jsyaml.dump(obj, { lineWidth: 120 });
    setMessage(t('jsonyaml.success.toYaml'));
  } catch (e) {
    setMessage(t('jsonyaml.error', { message: e.message }), true);
  }
}

function toJson() {
  try {
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    const obj = window.jsyaml.load(dom.input.value);
    dom.output.value = JSON.stringify(obj, null, 2);
    setMessage(t('jsonyaml.success.toJson'));
  } catch (e) {
    setMessage(t('jsonyaml.error', { message: e.message }), true);
  }
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map((s) => s.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((s) => s.trim());
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? '';
    });
    return row;
  });
}

function toCsv(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const out = [headers.join(',')];
  rows.forEach((row) => {
    out.push(headers.map((h) => String(row[h] ?? '').replaceAll(',', ' ')).join(','));
  });
  return out.join('\n');
}

function csvToJson() {
  try {
    dom.output.value = JSON.stringify(parseCsv(dom.input.value), null, 2);
    setMessage('CSV → JSON 변환 완료.');
  } catch (e) {
    setMessage(`변환 실패: ${e.message}`, true);
  }
}

function jsonToCsv() {
  try {
    dom.output.value = toCsv(JSON.parse(dom.input.value));
    setMessage('JSON → CSV 변환 완료.');
  } catch (e) {
    setMessage(`변환 실패: ${e.message}`, true);
  }
}

dom.toYaml.addEventListener('click', toYaml);
dom.toJson.addEventListener('click', toJson);
dom.csvToJson.addEventListener('click', csvToJson);
dom.jsonToCsv.addEventListener('click', jsonToCsv);
dom.clear.addEventListener('click', () => {
  dom.input.value = '';
  dom.output.value = '';
  setMessage('');
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage(t('common.copySuccess'));
  });
});
