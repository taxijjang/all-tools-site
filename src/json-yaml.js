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

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function toYaml() {
  try {
    const obj = JSON.parse(dom.input.value);
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    dom.output.value = window.jsyaml.dump(obj, { lineWidth: 120 });
    setMessage(t('jsonyaml.success.toYaml'));
  } catch (error) {
    setMessage(t('jsonyaml.error', { message: error.message }), true);
  }
}

function toJson() {
  try {
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    const obj = window.jsyaml.load(dom.input.value);
    dom.output.value = JSON.stringify(obj, null, 2);
    setMessage(t('jsonyaml.success.toJson'));
  } catch (error) {
    setMessage(t('jsonyaml.error', { message: error.message }), true);
  }
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map((value) => value.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    return row;
  });
}

function toCsv(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const out = [headers.join(',')];
  rows.forEach((row) => {
    out.push(headers.map((header) => String(row[header] ?? '').replaceAll(',', ' ')).join(','));
  });
  return out.join('\n');
}

function csvToJson() {
  try {
    dom.output.value = JSON.stringify(parseCsv(dom.input.value), null, 2);
    setMessage(t('jsonyaml.success.csvToJson'));
  } catch (error) {
    setMessage(t('jsonyaml.error', { message: error.message }), true);
  }
}

function jsonToCsv() {
  try {
    dom.output.value = toCsv(JSON.parse(dom.input.value));
    setMessage(t('jsonyaml.success.jsonToCsv'));
  } catch (error) {
    setMessage(t('jsonyaml.error', { message: error.message }), true);
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
