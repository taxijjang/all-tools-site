import './style.css';
import { t } from './i18n.js';

const dom = {
  refresh: document.getElementById('iuRefreshBtn'),
  ip: document.getElementById('iuIp'),
  ua: document.getElementById('iuUa'),
  lang: document.getElementById('iuLang'),
  tz: document.getElementById('iuTz'),
  platform: document.getElementById('iuPlatform'),
  message: document.getElementById('iuMessage'),
};

function setMessage(text, err = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', err);
}

async function refresh() {
  dom.ua.value = navigator.userAgent || '';
  dom.lang.value = navigator.language || '';
  dom.tz.value = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  dom.platform.value = navigator.platform || '';

  try {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    const data = await res.json();
    dom.ip.value = data.ip || 'unavailable';
    setMessage(t('ipua.success'));
  } catch {
    dom.ip.value = 'unavailable';
    setMessage(t('ipua.error.ip'), true);
  }
}

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage(t('common.copySuccess'));
  });
});

dom.refresh.addEventListener('click', refresh);
refresh();
