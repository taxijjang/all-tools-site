import './style.css';

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
    setMessage('정보 갱신 완료.');
  } catch {
    dom.ip.value = 'unavailable';
    setMessage('IP 조회 실패(네트워크/CORS).', true);
  }
}

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage('복사했습니다.');
  });
});

dom.refresh.addEventListener('click', refresh);
refresh();
