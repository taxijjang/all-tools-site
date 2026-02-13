import './style.css';

const dom = {
  base: document.getElementById('utmBase'),
  source: document.getElementById('utmSource'),
  medium: document.getElementById('utmMedium'),
  campaign: document.getElementById('utmCampaign'),
  term: document.getElementById('utmTerm'),
  content: document.getElementById('utmContent'),
  build: document.getElementById('utmBuildBtn'),
  url: document.getElementById('utmOutput'),
  short: document.getElementById('utmShortOutput'),
  message: document.getElementById('utmMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

async function shortCode(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).slice(0, 4).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function build() {
  try {
    const url = new URL(dom.base.value.trim());
    const params = new URLSearchParams(url.search);
    if (dom.source.value) params.set('utm_source', dom.source.value.trim());
    if (dom.medium.value) params.set('utm_medium', dom.medium.value.trim());
    if (dom.campaign.value) params.set('utm_campaign', dom.campaign.value.trim());
    if (dom.term.value) params.set('utm_term', dom.term.value.trim());
    if (dom.content.value) params.set('utm_content', dom.content.value.trim());
    url.search = params.toString();

    const out = url.toString();
    dom.url.value = out;
    const code = await shortCode(out);
    dom.short.value = `https://all-tools-site.pages.dev/go/${code}`;
    setMessage('UTM URL 생성 완료.');
  } catch {
    setMessage('기본 URL이 올바르지 않습니다.', true);
  }
}

dom.build.addEventListener('click', () => build().catch(() => setMessage('생성 실패.', true)));
