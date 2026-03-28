import './style.css';
import { t } from './i18n.js';

const dom = {
  file: document.getElementById('imgOptFile'),
  maxWidth: document.getElementById('imgOptMaxWidth'),
  quality: document.getElementById('imgOptQuality'),
  format: document.getElementById('imgOptFormat'),
  run: document.getElementById('imgOptRunBtn'),
  before: document.getElementById('imgOptBefore'),
  after: document.getElementById('imgOptAfter'),
  preview: document.getElementById('imgOptPreview'),
  download: document.getElementById('imgOptDownloadBtn'),
  message: document.getElementById('imgOptMessage'),
};

let outBlob = null;

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function bytes(size) {
  if (!size && size !== 0) return '-';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function run() {
  const file = dom.file.files?.[0];
  if (!file) {
    setMessage(t('messages.imageOptimize.selectFile'), true);
    return;
  }

  const img = await loadImage(file);
  const maxWidth = Math.max(200, Number(dom.maxWidth.value || img.width));
  const scale = Math.min(1, maxWidth / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const mime = dom.format.value;
  const quality = Math.min(1, Math.max(0.2, Number(dom.quality.value || 0.82)));
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
  outBlob = blob;

  const reduction = Math.max(0, 100 - Math.round((blob.size / file.size) * 100));
  dom.before.value = `${img.width}x${img.height}, ${bytes(file.size)}`;
  dom.after.value = `${width}x${height}, ${bytes(blob.size)} (${reduction}% ${t('messages.imageOptimize.reduced')})`;
  dom.preview.src = URL.createObjectURL(blob);
  dom.preview.hidden = false;
  dom.download.disabled = false;
  setMessage(t('messages.imageOptimize.done'));
}

dom.run.addEventListener('click', () => {
  run().catch(() => {
    setMessage(t('messages.imageOptimize.failed'), true);
  });
});

dom.download.addEventListener('click', () => {
  if (!outBlob) return;
  const ext = dom.format.value.split('/')[1] || 'bin';
  const link = document.createElement('a');
  const url = URL.createObjectURL(outBlob);
  link.href = url;
  link.download = `optimized.${ext}`;
  link.click();
  URL.revokeObjectURL(url);
});
