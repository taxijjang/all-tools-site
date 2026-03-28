import './style.css';
import { t } from './i18n.js';

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
    `${t('seo.report.title')}: ${title}`,
    `${t('seo.report.description')}: ${desc}`,
    `${t('seo.report.h1')}: ${h1}`,
    `${t('seo.report.canonical')}: ${canonical}`,
    `${t('seo.report.ogTitle')}: ${ogTitle}`,
    `${t('seo.report.ogDescription')}: ${ogDesc}`,
    `${t('seo.report.robots')}: ${robots}`,
    `${t('seo.report.jsonLdBlocks')}: ${jsonLdCount}`,
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
      setMessage(t('messages.seo.fetchFailed'), true);
      return;
    }
  }

  if (!html) {
    setMessage(t('messages.seo.needInput'), true);
    return;
  }

  dom.output.value = analyze(html);
  setMessage(t('messages.seo.done'));
}

dom.run.addEventListener('click', () => {
  run().catch(() => {
    setMessage(t('messages.seo.failed'), true);
  });
});
