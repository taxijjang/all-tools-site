import './style.css';

const dom = {
  input: document.getElementById('mdInput'),
  preview: document.getElementById('mdPreview'),
  render: document.getElementById('mdRenderBtn'),
  clear: document.getElementById('mdClearBtn'),
  sample: document.getElementById('mdSampleBtn'),
  html: document.getElementById('mdHtml'),
  message: document.getElementById('mdMessage'),
};

const SAMPLE = `# Markdown Preview\n\n- 빠르게 문서 초안 작성\n- 코드 블록 확인\n\n\`\`\`js\nconsole.log('hello markdown');\n\`\`\``;

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function renderMarkdown() {
  const text = dom.input.value;
  if (!window.marked || !window.marked.parse) {
    setMessage('Markdown 라이브러리를 불러오지 못했습니다.', true);
    return;
  }
  try {
    const html = window.marked.parse(text, { breaks: true });
    dom.preview.innerHTML = html;
    dom.html.value = html;
    setMessage('렌더링 완료.');
  } catch {
    setMessage('렌더링 실패', true);
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
    setMessage('복사했습니다.');
  });
});

dom.input.value = SAMPLE;
renderMarkdown();
