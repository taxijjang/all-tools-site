import './style.css';
import { createWorker } from 'tesseract.js';
import { t } from './i18n.js';

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
    setMessage(t('messages.ocr.selectFile'), true);
    return;
  }

  dom.progress.value = 0;
  setMessage(t('messages.ocr.loading'));

  const worker = await createWorker(dom.lang.value, 1, {
    logger: (message) => {
      if (message.status === 'recognizing text' && message.progress) {
        dom.progress.value = Math.round(message.progress * 100);
      }
    },
  });

  try {
    const { data } = await worker.recognize(file);
    dom.output.value = data.text.trim();
    setMessage(t('messages.ocr.done'));
  } finally {
    await worker.terminate();
  }
}

dom.run.addEventListener('click', () => {
  runOcr().catch(() => {
    setMessage(t('messages.ocr.failed'), true);
  });
});
