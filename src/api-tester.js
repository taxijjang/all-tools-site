import './style.css';
import { t } from './i18n.js';

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
    const [key, ...rest] = line.split(':');
    if (!key || !rest.length) return;
    out[key.trim()] = rest.join(':').trim();
  });
  return out;
}

function buildCurl(method, url, headers, body) {
  const headerArgs = Object.entries(headers)
    .map(([key, value]) => `-H '${key}: ${value.replaceAll("'", "'\\''")}'`)
    .join(' ');
  const dataArg = body ? `--data '${body.replaceAll("'", "'\\''")}'` : '';
  return `curl -X ${method} ${headerArgs} ${dataArg} '${url}'`.replace(/\s+/g, ' ').trim();
}

async function send() {
  const method = dom.method.value;
  const url = dom.url.value.trim();
  if (!url) {
    setMessage(t('messages.api.urlRequired'), true);
    return;
  }

  const headers = parseHeaders(dom.headers.value);
  const body = dom.body.value.trim();
  dom.curl.value = buildCurl(method, url, headers, body);

  const init = { method, headers };
  if (method !== 'GET' && method !== 'HEAD' && body) {
    init.body = body;
  }

  const res = await fetch(url, init);
  const text = await res.text();

  let pretty = text;
  try {
    pretty = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    // Keep the raw body when it is not JSON.
  }

  const headerLines = Array.from(res.headers.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  dom.output.value = `HTTP ${res.status} ${res.statusText}\n\n${headerLines}\n\n${pretty}`;
  setMessage(t('messages.api.done'));
}

dom.send.addEventListener('click', () => {
  send().catch((error) => {
    setMessage(t('messages.api.failed', { message: error.message }), true);
  });
});
