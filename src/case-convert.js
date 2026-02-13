import './style.css';
import { t } from './i18n.js';

const dom = {
  input: document.getElementById('ccInput'),
  run: document.getElementById('ccRunBtn'),
  clear: document.getElementById('ccClearBtn'),
  camel: document.getElementById('ccCamel'),
  pascal: document.getElementById('ccPascal'),
  snake: document.getElementById('ccSnake'),
  kebab: document.getElementById('ccKebab'),
  upper: document.getElementById('ccUpper'),
  lower: document.getElementById('ccLower'),
  message: document.getElementById('ccMessage'),
};

function wordsOf(input) {
  return input.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').trim().split(/\s+/).filter(Boolean);
}

function cap(s) {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : '';
}

function run() {
  const words = wordsOf(dom.input.value);
  if (!words.length) {
    dom.message.textContent = t('case.error.empty');
    dom.message.classList.add('message--error');
    return;
  }

  const low = words.map((w) => w.toLowerCase());
  dom.camel.value = low[0] + low.slice(1).map(cap).join('');
  dom.pascal.value = low.map(cap).join('');
  dom.snake.value = low.join('_');
  dom.kebab.value = low.join('-');
  dom.upper.value = dom.input.value.toUpperCase();
  dom.lower.value = dom.input.value.toLowerCase();
  dom.message.textContent = t('case.success');
  dom.message.classList.remove('message--error');
}

dom.run.addEventListener('click', run);
dom.clear.addEventListener('click', () => {
  dom.input.value = '';
  [dom.camel, dom.pascal, dom.snake, dom.kebab, dom.upper, dom.lower].forEach((e) => (e.value = ''));
  dom.message.textContent = '';
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    dom.message.textContent = t('common.copySuccess');
  });
});

run();
