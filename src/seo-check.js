import './style.css';

const dom = {
  url: document.getElementById('seoUrl'),
  html: document.getElementById('seoHtml'),
  run: document.getElementById('seoRunBtn'),
  output: document.getElementById('seoOutput'),
  message: document.getElementById('seoMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function analyze(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('title')?.textContent?.trim() || '-';
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '-';
  const h1 = doc.querySelector('h1')?.textContent?.trim() || '-';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '-';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '-';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '-';
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '-';
  const jsonLdCount = doc.querySelectorAll('script[type="application/ld+json"]').length;

  return [
    `Title: ${title}`,
    `Description: ${desc}`,
    `H1: ${h1}`,
    `Canonical: ${canonical}`,
    `OG Title: ${ogTitle}`,
    `OG Description: ${ogDesc}`,
    `Robots: ${robots}`,
    `JSON-LD blocks: ${jsonLdCount}`,
  ].join('\n');
}

async function run() {
  let html = dom.html.value.trim();
  const url = dom.url.value.trim();

  if (!html && url) {
    try {
      const res = await fetch(url);
      html = await res.text();
    } catch {
      setMessage('URL 직접 조회 실패(CORS 가능성). HTML 소스를 붙여넣어 검사하세요.', true);
      return;
    }
  }

  if (!html) {
    setMessage('URL 또는 HTML 소스를 입력하세요.', true);
    return;
  }

  dom.output.value = analyze(html);
  setMessage('SEO 점검 완료.');
}

dom.run.addEventListener('click', () => run().catch(() => setMessage('SEO 점검 실패.', true)));
