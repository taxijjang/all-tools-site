import './style.css';

const dom = {
  input: document.getElementById('tcInput'),
  output: document.getElementById('tcOutput'),
  trim: document.getElementById('tcTrim'),
  removeEmpty: document.getElementById('tcRemoveEmpty'),
  dedupe: document.getElementById('tcDedupe'),
  sort: document.getElementById('tcSort'),
  slug: document.getElementById('tcSlug'),
  run: document.getElementById('tcRunBtn'),
  message: document.getElementById('tcMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function run() {
  let lines = dom.input.value.split(/\r?\n/);
  if (dom.trim.checked) lines = lines.map((l) => l.trim());
  if (dom.removeEmpty.checked) lines = lines.filter((l) => l.length > 0);
  if (dom.dedupe.checked) lines = Array.from(new Set(lines));
  if (dom.sort.checked) lines = [...lines].sort((a, b) => a.localeCompare(b));

  let out = lines.join('\n');
  if (dom.slug.checked) out = slugify(out);

  dom.output.value = out;
  setMessage('텍스트 정리 완료.');
}

dom.run.addEventListener('click', run);
