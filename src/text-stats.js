import './style.css';
import { t } from './i18n.js';

const dom = {
  input: document.getElementById('tsInput'),
  runBtn: document.getElementById('tsRunBtn'),
  clearBtn: document.getElementById('tsClearBtn'),
  sampleBtn: document.getElementById('tsSampleBtn'),
  charsWithSpaces: document.getElementById('tsCharsWithSpaces'),
  charsNoSpaces: document.getElementById('tsCharsNoSpaces'),
  words: document.getElementById('tsWords'),
  lines: document.getElementById('tsLines'),
  paragraphs: document.getElementById('tsParagraphs'),
  sentences: document.getElementById('tsSentences'),
  readingTime: document.getElementById('tsReadingTime'),
  bytes: document.getElementById('tsBytes'),
  uniqueWords: document.getElementById('tsUniqueWords'),
  message: document.getElementById('tsMessage'),
};

function setMessage(message, error = false) {
  dom.message.textContent = message;
  dom.message.classList.toggle('message--error', error);
}

function getWordList(text) {
  if (!text.trim()) return [];
  return text
    .toLowerCase()
    .match(/[a-z0-9가-힣]+/gu)
    ?.map((w) => w.trim())
    .filter(Boolean) || [];
}

function calculate() {
  const value = dom.input.value || '';

  const lines = value.length === 0 ? [] : value.replace(/\r/g, '').split('\n');
  const words = getWordList(value);

  const charsWithSpaces = value.length;
  const charsNoSpaces = value.replace(/\s/g, '').length;
  const lineCount = lines.length === 0 ? 0 : lines.length;
  const paragraphCount = value
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean).length;
  const sentenceCount = value.trim()
    ? Math.max(1, (value.match(/[.!?。！？]\s+/g) || []).length + 1)
    : 0;
  const uniqueCount = new Set(words).size;
  const bytes = new TextEncoder().encode(value).length;
  const readingMinutes = value.trim() ? (charsNoSpaces / 5) / 200 : 0;
  const seconds = Math.max(0, Math.round(readingMinutes * 60));

  dom.charsWithSpaces.value = String(charsWithSpaces);
  dom.charsNoSpaces.value = String(charsNoSpaces);
  dom.words.value = String(words.length);
  dom.lines.value = String(lineCount);
  dom.paragraphs.value = String(paragraphCount);
  dom.sentences.value = String(sentenceCount);
  dom.readingTime.value = value.trim() ? `${Math.max(1, Math.round(seconds / 60))} min ${seconds % 60} sec` : '0 min 0 sec';
  dom.bytes.value = String(bytes);
  dom.uniqueWords.value = String(uniqueCount);

  setMessage(t('textStats.success'));
}

function clearText() {
  dom.input.value = '';
  calculate();
}

function fillSample() {
  dom.input.value = '안녕하세요. Quick brown fox jumps over the lazy dog.\n\nThis is a sample text for counting characters and words.\n여러 줄과 문장도 같이 계산됩니다.';
  calculate();
}

dom.runBtn.addEventListener('click', calculate);
dom.clearBtn.addEventListener('click', clearText);
dom.sampleBtn.addEventListener('click', fillSample);
dom.input.addEventListener('input', calculate);

calculate();
