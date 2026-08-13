import './style.css';
import { t } from './i18n.js';

const dom = {
  base: document.getElementById('qbBaseUrl'),
  rows: document.getElementById('qbRows'),
  add: document.getElementById('qbAddRowBtn'),
  build: document.getElementById('qbBuildBtn'),
  output: document.getElementById('qbOutput'),
  message: document.getElementById('qbMessage'),
  presetGeneral: document.getElementById('qbPresetGeneral'),
  presetUtm: document.getElementById('qbPresetUtm'),
};

function row(key = '', value = '') {
  const div = document.createElement('div');
  div.className = 'tool-grid-3';
  div.innerHTML = `<input type=\"text\" class=\"qb-key\" placeholder=\"key\" value=\"${key}\" />
    <input type=\"text\" class=\"qb-value\" placeholder=\"value\" value=\"${value}\" />
    <button type=\"button\" class=\"ghost qb-remove\">${t('query.remove')}</button>`;
  div.querySelector('.qb-remove').addEventListener('click', () => div.remove());
  return div;
}

function setMessage(text, err = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', err);
}

function build() {
  try {
    const url = new URL(dom.base.value || 'https://example.com');
    const params = new URLSearchParams();
    dom.rows.querySelectorAll('.tool-grid-3').forEach((r) => {
      const k = r.querySelector('.qb-key').value.trim();
      const v = r.querySelector('.qb-value').value;
      if (k) params.append(k, v);
    });
    url.search = params.toString();
    dom.output.value = url.toString();
    setMessage(t('query.success'));
  } catch {
    setMessage(t('query.error.base'), true);
  }
}

function setPreset(kind) {
  dom.rows.innerHTML = '';
  if (kind === 'utm') {
    [
      ['utm_source', 'google'],
      ['utm_medium', 'cpc'],
      ['utm_campaign', ''],
      ['utm_term', ''],
      ['utm_content', ''],
    ].forEach(([key, value]) => dom.rows.appendChild(row(key, value)));
  } else {
    dom.rows.appendChild(row());
  }
  dom.presetGeneral?.classList.toggle('is-active', kind !== 'utm');
  dom.presetUtm?.classList.toggle('is-active', kind === 'utm');
  build();
}

dom.add.addEventListener('click', () => dom.rows.appendChild(row()));
dom.build.addEventListener('click', build);
dom.presetGeneral?.addEventListener('click', () => setPreset('general'));
dom.presetUtm?.addEventListener('click', () => setPreset('utm'));

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage(t('common.copySuccess'));
  });
});

setPreset(new URLSearchParams(window.location.search).get('preset') === 'utm' ? 'utm' : 'general');
