import './style.css';
import { t } from './i18n.js';

const dom = {
  input: document.getElementById('mdInput'),
  preview: document.getElementById('mdPreview'),
  render: document.getElementById('mdRenderBtn'),
  clear: document.getElementById('mdClearBtn'),
  sample: document.getElementById('mdSampleBtn'),
  html: document.getElementById('mdHtml'),
  message: document.getElementById('mdMessage'),
};

const SAMPLE = `# Markdown Preview\n\n- Fast draft writing\n- Check code blocks\n\n\`\`\`js\nconsole.log('hello markdown');\n\`\`\``;

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function renderMarkdown() {
  const text = dom.input.value;
  if (!window.marked || !window.marked.parse) {
    setMessage(t('markdown.error.lib'), true);
    return;
  }
  try {
    const html = window.marked.parse(text, { breaks: true });
    dom.preview.innerHTML = html;
    dom.html.value = html;
    setMessage(t('markdown.success.render'));
  } catch {
    setMessage(t('markdown.error.render'), true);
  }
}

dom.render.addEventListener('click', renderMarkdown);
dom.sample.addEventListener('click', () => {
  dom.input.value = SAMPLE;
  renderMarkdown();
});
dom.clear.addEventListener('click', () => {
  dom.input.value = '';
  dom.preview.innerHTML = '';
  dom.html.value = '';
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

dom.input.value = SAMPLE;
renderMarkdown();
