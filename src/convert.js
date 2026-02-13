import './style.css';
import { t } from './i18n.js';

const dom = {
  category: document.getElementById('cvCategory'),
  from: document.getElementById('cvFrom'),
  to: document.getElementById('cvTo'),
  input: document.getElementById('cvInput'),
  output: document.getElementById('cvOutput'),
  swap: document.getElementById('cvSwapBtn'),
  convert: document.getElementById('cvConvertBtn'),
  message: document.getElementById('cvMessage'),
};

const units = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    in: 0.0254,
    ft: 0.3048,
  },
  weight: {
    kg: 1,
    g: 0.001,
    lb: 0.45359237,
    oz: 0.0283495231,
  },
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function getUnitOptions(category) {
  if (category === 'temp') return ['C', 'F', 'K'];
  return Object.keys(units[category] || {});
}

function repopulateUnits() {
  const category = dom.category.value;
  const options = getUnitOptions(category);
  dom.from.innerHTML = options.map((u) => `<option value="${u}">${u}</option>`).join('');
  dom.to.innerHTML = options.map((u) => `<option value="${u}">${u}</option>`).join('');
  if (options[1]) dom.to.value = options[1];
}

function convertTemp(value, from, to) {
  let c;
  if (from === 'C') c = value;
  if (from === 'F') c = (value - 32) * 5 / 9;
  if (from === 'K') c = value - 273.15;

  if (to === 'C') return c;
  if (to === 'F') return c * 9 / 5 + 32;
  return c + 273.15;
}

function convert() {
  const value = Number(dom.input.value);
  if (Number.isNaN(value)) {
    setMessage(t('convert.error.nan'), true);
    return;
  }

  const category = dom.category.value;
  const from = dom.from.value;
  const to = dom.to.value;

  let result = 0;
  if (category === 'temp') {
    result = convertTemp(value, from, to);
  } else {
    const base = value * units[category][from];
    result = base / units[category][to];
  }

  dom.output.value = String(result);
  setMessage(t('convert.success'));
}

repopulateUnits();
convert();

dom.category.addEventListener('change', () => {
  repopulateUnits();
  convert();
});
dom.convert.addEventListener('click', convert);
dom.swap.addEventListener('click', () => {
  const a = dom.from.value;
  dom.from.value = dom.to.value;
  dom.to.value = a;
  convert();
});
