import './style.css';

const dom = {
  input: document.getElementById('csvInput'),
  output: document.getElementById('csvOutput'),
  toJson: document.getElementById('csvToJsonBtn'),
  toCsv: document.getElementById('csvToCsvBtn'),
  pretty: document.getElementById('csvPrettyBtn'),
  message: document.getElementById('csvMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
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
  if (!Array.isArray(rows) || !rows.length) return '';
  const cols = Object.keys(rows[0]);
  const lines = [cols.join(',')];
  for (const row of rows) {
    lines.push(cols.map((c) => String(row[c] ?? '').replaceAll(',', ' ')).join(','));
  }
  return lines.join('\n');
}

dom.toJson.addEventListener('click', () => {
  try {
    const rows = parseCsv(dom.input.value);
    dom.output.value = JSON.stringify(rows, null, 2);
    setMessage('CSV → JSON 변환 완료.');
  } catch {
    setMessage('CSV 파싱 실패.', true);
  }
});

dom.toCsv.addEventListener('click', () => {
  try {
    const rows = JSON.parse(dom.input.value);
    dom.output.value = toCsv(rows);
    setMessage('JSON → CSV 변환 완료.');
  } catch {
    setMessage('JSON 파싱 실패.', true);
  }
});

dom.pretty.addEventListener('click', () => {
  try {
    dom.output.value = JSON.stringify(JSON.parse(dom.input.value), null, 2);
    setMessage('JSON 포맷 완료.');
  } catch {
    setMessage('JSON 포맷 실패.', true);
  }
});
