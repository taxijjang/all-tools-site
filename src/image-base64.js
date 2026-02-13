import './style.css';

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
    setMessage('이미지를 선택하세요.', true);
    return;
  }
  try {
    const dataUrl = await readAsDataUrl(file);
    dom.output.value = dataUrl;
    dom.preview.src = dataUrl;
    dom.preview.hidden = false;
    setMessage('Base64 변환 완료.');
  } catch {
    setMessage('변환 실패', true);
  }
}

function decodeToFile() {
  const value = dom.output.value.trim();
  const match = value.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    setMessage('유효한 data URL 형식이 아닙니다.', true);
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
  setMessage('파일 저장 완료.');
}

dom.encode.addEventListener('click', encodeFile);
dom.decode.addEventListener('click', decodeToFile);
document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage('복사했습니다.');
  });
});
