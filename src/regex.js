import './style.css';
import { t } from './i18n.js';

const dom = {
  pattern: document.getElementById('rePattern'),
  flags: document.getElementById('reFlags'),
  input: document.getElementById('reInput'),
  result: document.getElementById('reResult'),
  matches: document.getElementById('reMatches'),
  message: document.getElementById('reMessage'),
  testBtn: document.getElementById('reTestBtn'),
  clearBtn: document.getElementById('reClearBtn'),
  sampleBtn: document.getElementById('reSampleBtn'),
};

const SAMPLE_TEXT = `name: alice\nemail: alice@example.com\nphone: +82-10-1234-5678\nurl: https://all-tools-site.pages.dev`;

function showMessage(text, isError = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', isError);
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildHighlighted(input, ranges) {
  if (!ranges.length) return escapeHtml(input);

  let out = '';
  let cursor = 0;

  for (const [start, end] of ranges) {
    out += escapeHtml(input.slice(cursor, start));
    out += `<mark class="re-hit">${escapeHtml(input.slice(start, end))}</mark>`;
    cursor = end;
  }

  out += escapeHtml(input.slice(cursor));
  return out;
}

function testRegex() {
  dom.matches.value = '';
  dom.result.innerHTML = '';

  const pattern = dom.pattern.value;
  const flags = dom.flags.value;
  const input = dom.input.value;

  if (!pattern) {
    showMessage(t('regex.error.pattern'), true);
    return;
  }

  try {
    const regex = new RegExp(pattern, flags);
    const globalRegex = flags.includes('g') ? regex : new RegExp(pattern, `${flags}g`);

    const hits = [];
    const ranges = [];

    for (const match of input.matchAll(globalRegex)) {
      const value = match[0] ?? '';
      const index = match.index ?? 0;
      const end = index + value.length;
      hits.push(`${hits.length + 1}. [${index}-${end}] ${value}`);
      if (value.length > 0) ranges.push([index, end]);
    }

    dom.result.innerHTML = buildHighlighted(input, ranges);
    dom.matches.value = hits.join('\n');

    if (hits.length === 0) {
      showMessage(t('regex.result.none'));
    } else {
      showMessage(t('regex.result.count', { count: String(hits.length) }));
    }
  } catch (err) {
    showMessage(t('regex.error.invalid', { message: err.message || 'Invalid pattern' }), true);
  }
}

function applySample() {
  dom.pattern.value = '(\\b[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b)|(https?:\\/\\/\\S+)';
  dom.flags.value = 'g';
  dom.input.value = SAMPLE_TEXT;
  testRegex();
}

dom.testBtn.addEventListener('click', testRegex);
dom.clearBtn.addEventListener('click', () => {
  dom.pattern.value = '';
  dom.flags.value = 'g';
  dom.input.value = '';
  dom.result.textContent = '';
  dom.matches.value = '';
  showMessage('');
});
dom.sampleBtn.addEventListener('click', applySample);

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.value || target.textContent || '');
      showMessage(t('common.copySuccess'));
    } catch {
      showMessage(t('common.copyFail'), true);
    }
  });
});

applySample();
