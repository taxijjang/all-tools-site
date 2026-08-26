import './style.css';
import { onLocaleChange, t } from './i18n.js';
import { SERP_LIMITS, analyzeField, cjkRatio } from './serp-pixel.js';

const dom = {
  url: document.getElementById('seoUrl'),
  html: document.getElementById('seoHtml'),
  run: document.getElementById('seoRunBtn'),
  sample: document.getElementById('seoSampleBtn'),
  output: document.getElementById('seoOutput'),
  inspector: document.getElementById('seoInspector'),
  message: document.getElementById('seoMessage'),
};
let lastResult = null;

const SAMPLE_URL = 'https://example.com/blog/base64-guide';

const SAMPLE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Base64 Guide for API Payloads | Example Dev Blog</title>
  <meta
    name="description"
    content="Practical tips for debugging Base64 payloads, choosing URL-safe output, and avoiding whitespace issues in transport layers."
  />
  <link rel="canonical" href="https://example.com/blog/base64-guide" />
  <meta property="og:title" content="Base64 Guide for API Payloads" />
  <meta
    property="og:description"
    content="Understand Base64 transport issues, URL-safe encoding, and common decoding mistakes in API workflows."
  />
  <meta name="robots" content="index,follow" />
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article","headline":"Base64 Guide for API Payloads"}
  </script>
</head>
<body>
  <main>
    <h1>Debug Base64 payloads without guessing</h1>
    <p>Use browser-side utilities to compare encoding options, decode logs, and verify payload handling safely.</p>
  </main>
</body>
</html>`;

const SEO_COPY = {
  ko: {
    summary: '요약',
    source: '분석 기준',
    recommendations: '권장 조치',
    title: 'Title',
    description: 'Description',
    h1: 'H1',
    canonical: 'Canonical',
    jsonLd: 'JSON-LD',
    fixes: '수정',
    sourceHtml: '붙여 넣은 HTML',
    sourceUrl: '직접 조회한 URL',
    statusOk: 'OK',
    statusWarn: 'WARN',
    statusMissing: 'MISSING',
    present: '있음',
    missing: '없음',
    defaultRobots: '미설정 (기본 index/follow)',
    titleLength: 'Title 길이',
    descriptionLength: 'Description 길이',
    textChars: '{count}자',
    blocks: '{count}개',
    noRecommendations: '눈에 띄는 기본 누락은 없습니다. 실제 검색 의도와 본문 품질만 추가로 확인하면 됩니다.',
    sampleLoaded: '샘플 HTML을 불러왔습니다.',
    useHtmlFallback: '브라우저에서 다른 사이트를 직접 읽을 때는 CORS로 막힐 수 있습니다. 그런 경우 HTML 소스를 붙여 넣어 확인하세요.',
    suggestionTitleMissing: 'Title 태그를 추가하고, 검색 결과에서 클릭 이유가 보이게 핵심 목적을 앞쪽에 넣어 보세요.',
    suggestionTitleLength: 'Title 길이를 45~65자 근처로 맞추면 검색 결과와 브라우저 탭에서 읽기 편합니다.',
    suggestionDescriptionMissing: 'Meta description을 추가해 페이지 목적과 기대 결과를 1~2문장으로 설명하세요.',
    suggestionDescriptionLength: 'Description 길이를 대략 120~160자 안팎으로 다듬어 스니펫 잘림 가능성을 줄여 보세요.',
    suggestionH1Missing: '본문 안에 H1을 두어 페이지의 핵심 주제를 명확히 보여 주세요.',
    suggestionCanonicalMissing: 'Canonical URL을 추가해 중복 페이지나 파라미터 URL보다 대표 주소를 분명히 하세요.',
    suggestionOgMissing: 'OG title과 description을 채워 공유 미리보기 품질을 맞추세요.',
    suggestionRobotsNoindex: 'Robots에 noindex가 들어 있어 검색 노출이 제한됩니다. 의도된 설정인지 다시 확인하세요.',
    suggestionJsonLdMissing: '구조화 데이터가 없으면 치명적이지는 않지만, 문서 성격이 뚜렷한 페이지라면 JSON-LD를 검토해볼 만합니다.',
  },
  en: {
    summary: 'Summary',
    source: 'Source',
    recommendations: 'Recommendations',
    title: 'Title',
    description: 'Description',
    h1: 'H1',
    canonical: 'Canonical',
    jsonLd: 'JSON-LD',
    fixes: 'Fixes',
    sourceHtml: 'Pasted HTML',
    sourceUrl: 'Fetched URL',
    statusOk: 'OK',
    statusWarn: 'WARN',
    statusMissing: 'MISSING',
    present: 'present',
    missing: 'missing',
    defaultRobots: 'not set (defaults apply)',
    titleLength: 'Title length',
    descriptionLength: 'Description length',
    textChars: '{count} chars',
    blocks: '{count} block(s)',
    noRecommendations:
      'No obvious baseline gaps were found. The next check is whether the page intent and body content satisfy the searcher.',
    sampleLoaded: 'Loaded sample HTML.',
    useHtmlFallback:
      'Direct browser fetches often fail on other sites because of CORS. When that happens, paste the raw HTML instead.',
    suggestionTitleMissing:
      'Add a <title> tag and put the clearest page purpose near the front so the click reason is obvious in search.',
    suggestionTitleLength:
      'Aim for roughly 45-65 characters so the title stays readable in tabs and search results.',
    suggestionDescriptionMissing:
      'Add a meta description that explains the page purpose and expected outcome in one or two sentences.',
    suggestionDescriptionLength:
      'Trim or expand the description toward roughly 120-160 characters to reduce awkward truncation.',
    suggestionH1Missing:
      'Include an H1 in the body so the page has a clear visible topic heading.',
    suggestionCanonicalMissing:
      'Add a canonical URL so the preferred version stays clear when duplicate or parameterized URLs exist.',
    suggestionOgMissing:
      'Fill in OG title and description so shared previews stay consistent with search snippets.',
    suggestionRobotsNoindex:
      'Your robots directive includes noindex, which blocks search visibility. Confirm that this is intentional.',
    suggestionJsonLdMissing:
      'Structured data is optional here, but pages with a clear document type may benefit from adding JSON-LD.',
  },
};

function getCopy(locale = document.documentElement.getAttribute('lang') || 'ko') {
  return SEO_COPY[locale] || SEO_COPY.en;
}

function formatCopy(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function getStatus(statusKey) {
  const copy = getCopy();
  return copy[statusKey] || statusKey;
}

function renderInspector(result) {
  if (!dom.inspector) return;
  if (!result) {
    dom.inspector.innerHTML = '';
    return;
  }

  const copy = getCopy();
  const statusState = {
    statusOk: 'ok',
    statusWarn: 'warn',
    statusMissing: 'error',
  };
  const entries = [
    [copy.title, `${result.titleLength}`, statusState[result.titleStatus]],
    [copy.description, `${result.descriptionLength}`, statusState[result.descriptionStatus]],
    [copy.h1, getStatus(result.h1Status), statusState[result.h1Status]],
    [copy.canonical, getStatus(result.canonicalStatus), statusState[result.canonicalStatus]],
    [copy.jsonLd, `${result.jsonLdCount}`, statusState[result.jsonLdStatus]],
    [copy.fixes, `${result.recommendationCount}`, result.recommendationCount ? 'warn' : 'ok'],
  ];

  dom.inspector.innerHTML = entries
    .map(
      ([label, value, state = '']) => `
        <div class="tool-inspector__item${state ? ` tool-inspector__item--${state}` : ''}">
          <span class="tool-inspector__label">${label}</span>
          <span class="tool-inspector__value">${value}</span>
        </div>
      `,
    )
    .join('');
}

function buildMetric(status, label, value, detail = '') {
  const suffix = detail ? ` (${detail})` : '';
  return `[${getStatus(status)}] ${label}: ${value}${suffix}`;
}

function scoreLength(length, min, max) {
  if (!length) return 'statusMissing';
  if (length < min || length > max) return 'statusWarn';
  return 'statusOk';
}

function analyzeHtml(html, sourceKind) {
  const copy = getCopy();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('title')?.textContent?.trim() || '';
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
  const h1 = doc.querySelector('h1')?.textContent?.trim() || '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() || '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() || '';
  const ogDescription =
    doc.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() || '';
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.trim() || '';
  const jsonLdCount = doc.querySelectorAll('script[type="application/ld+json"]').length;

  const titleStatus = scoreLength(title.length, 45, 65);
  const descriptionStatus = scoreLength(description.length, 120, 160);
  const h1Status = h1 ? 'statusOk' : 'statusMissing';
  const canonicalStatus = canonical ? 'statusOk' : 'statusMissing';
  const ogStatus = ogTitle && ogDescription ? 'statusOk' : 'statusWarn';
  const robotsStatus = /noindex/i.test(robots) ? 'statusWarn' : 'statusOk';
  const jsonLdStatus = jsonLdCount > 0 ? 'statusOk' : 'statusWarn';

  const recommendations = [];
  if (titleStatus === 'statusMissing') recommendations.push(copy.suggestionTitleMissing);
  else if (titleStatus === 'statusWarn') recommendations.push(copy.suggestionTitleLength);

  if (descriptionStatus === 'statusMissing') recommendations.push(copy.suggestionDescriptionMissing);
  else if (descriptionStatus === 'statusWarn') recommendations.push(copy.suggestionDescriptionLength);

  if (h1Status === 'statusMissing') recommendations.push(copy.suggestionH1Missing);
  if (canonicalStatus === 'statusMissing') recommendations.push(copy.suggestionCanonicalMissing);
  if (ogStatus !== 'statusOk') recommendations.push(copy.suggestionOgMissing);
  if (robotsStatus === 'statusWarn') recommendations.push(copy.suggestionRobotsNoindex);
  if (jsonLdStatus === 'statusWarn') recommendations.push(copy.suggestionJsonLdMissing);

  const summary = [
    `${copy.summary}`,
    buildMetric('statusOk', copy.source, sourceKind === 'url' ? copy.sourceUrl : copy.sourceHtml),
    buildMetric(
      titleStatus,
      t('seo.report.title'),
      title || copy.missing,
      formatCopy(copy.textChars, { count: title.length }),
    ),
    buildMetric(
      descriptionStatus,
      t('seo.report.description'),
      description || copy.missing,
      formatCopy(copy.textChars, { count: description.length }),
    ),
    buildMetric(h1Status, t('seo.report.h1'), h1 || copy.missing),
    buildMetric(canonicalStatus, t('seo.report.canonical'), canonical || copy.missing),
    buildMetric(ogStatus, t('seo.report.ogTitle'), ogTitle || copy.missing),
    buildMetric(ogStatus, t('seo.report.ogDescription'), ogDescription || copy.missing),
    buildMetric(robotsStatus, t('seo.report.robots'), robots || copy.defaultRobots),
    buildMetric(
      jsonLdStatus,
      t('seo.report.jsonLdBlocks'),
      jsonLdCount ? formatCopy(copy.blocks, { count: jsonLdCount }) : copy.missing,
    ),
  ];

  const recommendationLines = recommendations.length
    ? recommendations.map((item, index) => `${index + 1}. ${item}`)
    : [copy.noRecommendations];

  return {
    report: `${summary.join('\n')}\n\n${copy.recommendations}\n${recommendationLines.join('\n')}`,
    recommendationCount: recommendations.length,
    titleLength: title.length,
    titleStatus,
    descriptionLength: description.length,
    descriptionStatus,
    h1Status,
    canonicalStatus,
    jsonLdStatus,
    jsonLdCount,
  };
}

async function loadHtmlFromUrl(url) {
  const response = await fetch(url);
  return response.text();
}

function loadSampleHtml() {
  dom.url.value = SAMPLE_URL;
  dom.html.value = SAMPLE_HTML;
  setMessage(getCopy().sampleLoaded);
}

async function run() {
  let html = dom.html.value.trim();
  const url = dom.url.value.trim();
  const sourceKind = html ? 'html' : 'url';

  if (!html && url) {
    try {
      html = await loadHtmlFromUrl(url);
    } catch {
      setMessage(t('messages.seo.fetchFailed'), true);
      dom.output.value = getCopy().useHtmlFallback;
      lastResult = null;
      renderInspector(null);
      return;
    }
  }

  if (!html) {
    setMessage(t('messages.seo.needInput'), true);
    lastResult = null;
    renderInspector(null);
    return;
  }

  const result = analyzeHtml(html, sourceKind);
  lastResult = result;
  dom.output.value = result.report;
  renderInspector(result);
  window.statelessTools?.trackToolInteraction?.('seo_audit_complete', {
    source_kind: sourceKind,
    recommendation_count: result.recommendationCount,
    title_length: result.titleLength,
    description_length: result.descriptionLength,
  });
  setMessage(t('messages.seo.done'));
}

dom.run?.addEventListener('click', () => {
  run().catch(() => {
    setMessage(t('messages.seo.failed'), true);
  });
});

dom.sample?.addEventListener('click', () => {
  loadSampleHtml();
});

onLocaleChange(() => {
  if (dom.output.value.trim() === getCopy('en').useHtmlFallback || dom.output.value.trim() === getCopy('ko').useHtmlFallback) {
    dom.output.value = getCopy().useHtmlFallback;
  }
  renderInspector(lastResult);
});

// --- 제목·설명 픽셀 검사 (검색어 "title tag check"가 실제로 원하는 것) ---

const serpCopy = {
  ko: {
    title: '제목',
    description: '설명',
    desktop: '데스크톱',
    mobile: '모바일',
    px: 'px',
    chars: '자',
    fits: '전체 표시',
    cut: '잘림',
    empty: '제목을 입력하면 검색결과에 어떻게 보일지 계산합니다.',
    cjkNote: (pct) =>
      `한글 비중 ${pct}% — 한글 한 자는 Arial 20px 기준 약 17px, 영문 소문자는 약 10px입니다. 1.6배 넘게 차이 나므로 글자 수만 세는 도구는 한국어 제목에서 크게 틀립니다.`,
    approxNote:
      '측정 기준: 제목 Arial 20px, 설명 Arial 14px. 한글은 Arial에 글리프가 없어 브라우저가 대체한 폰트로 재므로 근사치입니다. 구글이 제목을 다시 쓸지 여부는 폭과 별개로 결정됩니다.',
  },
  en: {
    title: 'Title',
    description: 'Description',
    desktop: 'Desktop',
    mobile: 'Mobile',
    px: 'px',
    chars: 'chars',
    fits: 'fits',
    cut: 'truncated',
    empty: 'Enter a title to see how it renders in search results.',
    cjkNote: (pct) =>
      `${pct}% CJK characters — one Korean glyph measures about 17px at Arial 20px against about 10px for a Latin lowercase letter. That is over 1.6x, so character-count tools are badly wrong for CJK titles.`,
    approxNote:
      'Measured at Arial 20px for titles and Arial 14px for descriptions. Korean text has no Arial glyphs, so the browser substitutes a font and the width is an approximation. Whether Google rewrites a title is decided separately from its width.',
  },
};

function serpLocale() {
  return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ko';
}

function widthBar(width, limit) {
  const pct = Math.min(100, Math.round((width / limit) * 100));
  const state = width > limit ? 'is-over' : width > limit * 0.9 ? 'is-near' : 'is-ok';
  return `<div class="serp-bar ${state}"><span style="width:${pct}%"></span></div>`;
}

function renderSerp() {
  const preview = document.getElementById('serpPreview');
  const metrics = document.getElementById('serpMetrics');
  if (!preview || !metrics) return;

  const c = serpCopy[serpLocale()];
  const rawTitle = document.getElementById('serpTitle')?.value || '';
  const rawDesc = document.getElementById('serpDesc')?.value || '';
  const url = (document.getElementById('serpUrl')?.value || 'example.com').trim();

  if (!rawTitle.trim() && !rawDesc.trim()) {
    preview.innerHTML = `<p class="serp-preview__empty">${c.empty}</p>`;
    metrics.innerHTML = '';
    return;
  }

  const t = analyzeField(rawTitle, 'title');
  const d = analyzeField(rawDesc, 'description');

  preview.innerHTML = ['desktop', 'mobile']
    .map(
      (view) => `
      <div class="serp-card serp-card--${view}">
        <span class="serp-card__view">${view === 'desktop' ? c.desktop : c.mobile}</span>
        <span class="serp-card__url">${escapeText(url)}</span>
        <span class="serp-card__title">${escapeText(t[view].text) || '&nbsp;'}</span>
        <span class="serp-card__desc">${escapeText(d[view].text)}</span>
      </div>`,
    )
    .join('');

  const rows = [];
  for (const [field, a, label] of [
    ['title', t, c.title],
    ['description', d, c.description],
  ]) {
    if (!a.value) continue;
    const lim = SERP_LIMITS[field];
    rows.push(`
      <div class="tool-inspector__row">
        <span class="tool-inspector__label">${label}</span>
        <span class="tool-inspector__value">${a.width}${c.px} · ${a.chars}${c.chars}</span>
      </div>
      <div class="tool-inspector__row">
        <span class="tool-inspector__label">${c.desktop} (${lim.desktop}${c.px})</span>
        <span class="tool-inspector__value">${widthBar(a.width, lim.desktop)} ${
          a.desktop.truncated ? c.cut : c.fits
        }</span>
      </div>
      <div class="tool-inspector__row">
        <span class="tool-inspector__label">${c.mobile} (${lim.mobile}${c.px})</span>
        <span class="tool-inspector__value">${widthBar(a.width, lim.mobile)} ${
          a.mobile.truncated ? c.cut : c.fits
        }</span>
      </div>`);
  }

  const ratio = cjkRatio(rawTitle + rawDesc);
  if (ratio > 0.2) {
    rows.push(`<p class="content-note">${c.cjkNote(Math.round(ratio * 100))}</p>`);
  }
  rows.push(`<p class="content-note">${c.approxNote}</p>`);
  metrics.innerHTML = rows.join('');
}

function escapeText(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
}

function initSerp() {
  const ids = ['serpTitle', 'serpDesc', 'serpUrl'];
  const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if (!els.length) return;
  els.forEach((el) => el.addEventListener('input', renderSerp));
  document.getElementById('serpSampleBtn')?.addEventListener('click', () => {
    document.getElementById('serpTitle').value = '만나이 계산법 | 세는 나이·연 나이 차이';
    document.getElementById('serpDesc').value =
      '만나이 세는 법과 2023년 만 나이 통일이 실제로 바꾼 범위. 병역법·청소년보호법이 여전히 연 나이를 쓰는 이유를 정리했습니다.';
    document.getElementById('serpUrl').value = 'taxijjang.com › age-guide';
    renderSerp();
  });
  onLocaleChange(renderSerp);
  renderSerp();
}

initSerp();
