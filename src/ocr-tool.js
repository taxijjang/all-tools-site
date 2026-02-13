import './style.css';
import { createWorker } from 'tesseract.js';

const dom = {
  file: document.getElementById('ocrFile'),
  lang: document.getElementById('ocrLang'),
  run: document.getElementById('ocrRunBtn'),
  progress: document.getElementById('ocrProgress'),
  output: document.getElementById('ocrOutput'),
  message: document.getElementById('ocrMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

async function runOcr() {
  const file = dom.file.files?.[0];
  if (!file) {
    setMessage('OCR 처리할 이미지를 선택하세요.', true);
    return;
  }

  dom.progress.value = 0;
  setMessage('OCR 엔진 로딩 중...');

  const worker = await createWorker(dom.lang.value, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && m.progress) {
        dom.progress.value = Math.round(m.progress * 100);
      }
    },
  });

  try {
    const { data } = await worker.recognize(file);
    dom.output.value = data.text.trim();
    setMessage('OCR 완료.');
  } finally {
    await worker.terminate();
  }
}

dom.run.addEventListener('click', () => runOcr().catch(() => setMessage('OCR 실패.', true)));
