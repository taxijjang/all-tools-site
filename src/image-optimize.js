import './style.css';

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
    setMessage('이미지를 선택하세요.', true);
    return;
  }

  const img = await loadImage(file);
  const maxW = Math.max(200, Number(dom.maxWidth.value || img.width));
  const scale = Math.min(1, maxW / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  const mime = dom.format.value;
  const quality = Math.min(1, Math.max(0.2, Number(dom.quality.value || 0.82)));
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
  outBlob = blob;

  dom.before.value = `${img.width}x${img.height}, ${bytes(file.size)}`;
  dom.after.value = `${w}x${h}, ${bytes(blob.size)} (${Math.max(0, 100 - Math.round((blob.size / file.size) * 100))}% 절감)`;
  dom.preview.src = URL.createObjectURL(blob);
  dom.preview.hidden = false;
  dom.download.disabled = false;
  setMessage('이미지 최적화 완료.');
}

dom.run.addEventListener('click', () => run().catch(() => setMessage('이미지 최적화 실패.', true)));
dom.download.addEventListener('click', () => {
  if (!outBlob) return;
  const ext = dom.format.value.split('/')[1] || 'bin';
  const a = document.createElement('a');
  const url = URL.createObjectURL(outBlob);
  a.href = url;
  a.download = `optimized.${ext}`;
  a.click();
  URL.revokeObjectURL(url);
});
