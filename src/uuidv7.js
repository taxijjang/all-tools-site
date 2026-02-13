import './style.css';
import { t } from './i18n.js';

const dom = {
  count: document.getElementById('u7Count'),
  generate: document.getElementById('u7GenerateBtn'),
  output: document.getElementById('u7Output'),
  message: document.getElementById('u7Message'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function hex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateUuidV7() {
  const bytes = new Uint8Array(16);
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);

  const ts = BigInt(Date.now());
  bytes[0] = Number((ts >> 40n) & 0xffn);
  bytes[1] = Number((ts >> 32n) & 0xffn);
  bytes[2] = Number((ts >> 24n) & 0xffn);
  bytes[3] = Number((ts >> 16n) & 0xffn);
  bytes[4] = Number((ts >> 8n) & 0xffn);
  bytes[5] = Number(ts & 0xffn);

  bytes[6] = 0x70 | (rand[0] & 0x0f);
  bytes[7] = rand[1];
  bytes[8] = 0x80 | (rand[2] & 0x3f);
  bytes[9] = rand[3];
  bytes[10] = rand[4];
  bytes[11] = rand[5];
  bytes[12] = rand[6];
  bytes[13] = rand[7];
  bytes[14] = rand[8];
  bytes[15] = rand[9];

  const h = hex(bytes);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function run() {
  const count = Math.max(1, Math.min(100, Number(dom.count.value || 10)));
  const out = [];
  for (let i = 0; i < count; i += 1) out.push(generateUuidV7());
  dom.output.value = out.join('\n');
  setMessage(t('uuidv7.success.generated', { count }));
}

dom.generate.addEventListener('click', run);
document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage(t('common.copySuccess'));
  });
});

run();
