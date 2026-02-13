import './style.css';
import { t } from './i18n.js';

const dom = {
  file: document.getElementById('ibFile'),
  encode: document.getElementById('ibEncodeBtn'),
  output: document.getElementById('ibOutput'),
  preview: document.getElementById('ibPreview'),
  decode: document.getElementById('ibDecodeBtn'),
  message: document.getElementById('ibMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function encodeFile() {
  const file = dom.file.files?.[0];
  if (!file) {
    setMessage(t('imagebase64.error.file'), true);
    return;
  }
  try {
    const dataUrl = await readAsDataUrl(file);
    dom.output.value = dataUrl;
    dom.preview.src = dataUrl;
    dom.preview.hidden = false;
    setMessage(t('imagebase64.success.encode'));
  } catch {
    setMessage(t('imagebase64.error.encode'), true);
  }
}

function decodeToFile() {
  const value = dom.output.value.trim();
  const match = value.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    setMessage(t('imagebase64.error.format'), true);
    return;
  }

  const mime = match[1];
  const bytes = atob(match[2]);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 1) arr[i] = bytes.charCodeAt(i);

  const blob = new Blob([arr], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `decoded.${(mime.split('/')[1] || 'bin').split(';')[0]}`;
  a.click();
  URL.revokeObjectURL(url);
  setMessage(t('imagebase64.success.decode'));
}

dom.encode.addEventListener('click', encodeFile);
dom.decode.addEventListener('click', decodeToFile);
document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage(t('common.copySuccess'));
  });
});
