import './style.css';

const dom = {
  file: document.getElementById('fhFile'),
  algo: document.getElementById('fhAlgo'),
  run: document.getElementById('fhRunBtn'),
  output: document.getElementById('fhOutput'),
  message: document.getElementById('fhMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function toHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function runHash() {
  const file = dom.file.files?.[0];
  if (!file) {
    setMessage('파일을 선택하세요.', true);
    return;
  }

  try {
    const data = await file.arrayBuffer();
    const algo = dom.algo.value;
    const digest = await crypto.subtle.digest(algo, data);
    dom.output.value = toHex(digest);
    setMessage(`${algo} 계산 완료 (${file.name})`);
  } catch {
    setMessage('해시 계산 실패', true);
  }
}

dom.run.addEventListener('click', runHash);
document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage('복사했습니다.');
  });
});
