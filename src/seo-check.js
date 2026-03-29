import './style.css';
import { onLocaleChange, t } from './i18n.js';

const dom = {
  url: document.getElementById('seoUrl'),
  html: document.getElementById('seoHtml'),
  run: document.getElementById('seoRunBtn'),
  sample: document.getElementById('seoSampleBtn'),
  output: document.getElementById('seoOutput'),
  message: document.getElementById('seoMessage'),
};

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
    descriptionLength: description.length,
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
      return;
    }
  }

  if (!html) {
    setMessage(t('messages.seo.needInput'), true);
    return;
  }

  const result = analyzeHtml(html, sourceKind);
  dom.output.value = result.report;
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
});
