import './style.css';
import { t } from './i18n.js';

const dom = {
  left: document.getElementById('diffLeft'),
  right: document.getElementById('diffRight'),
  compare: document.getElementById('diffCompareBtn'),
  clear: document.getElementById('diffClearBtn'),
  output: document.getElementById('diffOutput'),
  unified: document.getElementById('diffUnified'),
  message: document.getElementById('diffMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function esc(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function compareLines(a, b) {
  const left = a.split('\n');
  const right = b.split('\n');
  const n = left.length;
  const m = right.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      if (left[i] === right[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (left[i] === right[j]) {
      ops.push({ type: 'same', text: left[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'del', text: left[i] });
      i += 1;
    } else {
      ops.push({ type: 'add', text: right[j] });
      j += 1;
    }
  }
  while (i < n) {
    ops.push({ type: 'del', text: left[i] });
    i += 1;
  }
  while (j < m) {
    ops.push({ type: 'add', text: right[j] });
    j += 1;
  }
  return ops;
}

function render() {
  const ops = compareLines(dom.left.value, dom.right.value);
  let changed = 0;
  let html = '';
  let unified = '';

  for (const op of ops) {
    if (op.type === 'same') {
      html += `<div class="diff-line"><span class="diff-tag diff-tag-same"> </span>${esc(op.text)}</div>`;
      unified += ` ${op.text}\n`;
    }
    if (op.type === 'add') {
      changed += 1;
      html += `<div class="diff-line diff-add"><span class="diff-tag">+</span>${esc(op.text)}</div>`;
      unified += `+${op.text}\n`;
    }
    if (op.type === 'del') {
      changed += 1;
      html += `<div class="diff-line diff-del"><span class="diff-tag">-</span>${esc(op.text)}</div>`;
      unified += `-${op.text}\n`;
    }
  }

  dom.output.innerHTML = html;
  dom.unified.value = unified.trimEnd();
  setMessage(changed ? t('diff.result.changed', { count: changed }) : t('diff.result.same'));
}

dom.compare.addEventListener('click', render);
dom.clear.addEventListener('click', () => {
  dom.left.value = '';
  dom.right.value = '';
  dom.output.textContent = '';
  dom.unified.value = '';
  setMessage('');
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || target.textContent || '');
    setMessage(t('common.copySuccess'));
  });
});

render();
