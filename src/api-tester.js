import './style.css';

const dom = {
  method: document.getElementById('apiMethod'),
  url: document.getElementById('apiUrl'),
  headers: document.getElementById('apiHeaders'),
  body: document.getElementById('apiBody'),
  send: document.getElementById('apiSendBtn'),
  curl: document.getElementById('apiCurl'),
  output: document.getElementById('apiOutput'),
  message: document.getElementById('apiMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function parseHeaders(text) {
  const out = {};
  text.split(/\r?\n/).forEach((line) => {
    const [k, ...rest] = line.split(':');
    if (!k || !rest.length) return;
    out[k.trim()] = rest.join(':').trim();
  });
  return out;
}

function buildCurl(method, url, headers, body) {
  const h = Object.entries(headers).map(([k, v]) => `-H '${k}: ${v.replaceAll("'", "'\\''")}'`).join(' ');
  const d = body ? `--data '${body.replaceAll("'", "'\\''")}'` : '';
  return `curl -X ${method} ${h} ${d} '${url}'`.replace(/\s+/g, ' ').trim();
}

async function send() {
  const method = dom.method.value;
  const url = dom.url.value.trim();
  if (!url) {
    setMessage('요청 URL을 입력하세요.', true);
    return;
  }

  const headers = parseHeaders(dom.headers.value);
  const body = dom.body.value.trim();
  dom.curl.value = buildCurl(method, url, headers, body);

  const init = { method, headers };
  if (method !== 'GET' && method !== 'HEAD' && body) init.body = body;

  const res = await fetch(url, init);
  const text = await res.text();
  let pretty = text;
  try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch {}

  const headerLines = Array.from(res.headers.entries()).map(([k, v]) => `${k}: ${v}`).join('\n');
  dom.output.value = `HTTP ${res.status} ${res.statusText}\n\n${headerLines}\n\n${pretty}`;
  setMessage('API 요청 완료.');
}

dom.send.addEventListener('click', () => send().catch((e) => setMessage(`요청 실패: ${e.message}`, true)));
