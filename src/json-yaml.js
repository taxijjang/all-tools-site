import './style.css';

const dom = {
  input: document.getElementById('jyInput'),
  toYaml: document.getElementById('jyToYamlBtn'),
  toJson: document.getElementById('jyToJsonBtn'),
  clear: document.getElementById('jyClearBtn'),
  output: document.getElementById('jyOutput'),
  message: document.getElementById('jyMessage'),
};

function setMessage(text, err = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', err);
}

function toYaml() {
  try {
    const obj = JSON.parse(dom.input.value);
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    dom.output.value = window.jsyaml.dump(obj, { lineWidth: 120 });
    setMessage('JSON → YAML 변환 완료.');
  } catch (e) {
    setMessage(`변환 실패: ${e.message}`, true);
  }
}

function toJson() {
  try {
    if (!window.jsyaml) throw new Error('js-yaml not loaded');
    const obj = window.jsyaml.load(dom.input.value);
    dom.output.value = JSON.stringify(obj, null, 2);
    setMessage('YAML → JSON 변환 완료.');
  } catch (e) {
    setMessage(`변환 실패: ${e.message}`, true);
  }
}

dom.toYaml.addEventListener('click', toYaml);
dom.toJson.addEventListener('click', toJson);
dom.clear.addEventListener('click', () => {
  dom.input.value = '';
  dom.output.value = '';
  setMessage('');
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage('복사했습니다.');
  });
});
