// 구글은 제목과 설명을 글자 수가 아니라 픽셀 폭으로 자른다.
// 'W'와 'i'의 폭이 다르고, 한글 한 자는 Arial 20px 기준 약 17px 대 영문 소문자 약 10px로 1.6배 넘게
// 차이 난다. 그래서 글자 수 기준은 한국어에서 특히 크게 틀린다. (실측값, 대체 폰트에 따라 달라진다)
//
// 측정 기준 (2026): 제목 Arial 20px, 설명 Arial 14px.
// 데스크톱 제목 600px / 모바일 480px, 데스크톱 설명 920px / 모바일 680px.
// 구글이 공식 수치를 내놓은 적은 없어서 관측값이고, 리라이팅 여부는 이와 별개로 결정된다.
export const SERP_LIMITS = {
  title: { desktop: 600, mobile: 480, font: 'bold 20px Arial, sans-serif' },
  description: { desktop: 920, mobile: 680, font: '14px Arial, sans-serif' },
};

// ponytail: 캔버스 컨텍스트는 하나만 만들어 재사용한다. 폰트만 바꿔 쓰면 된다.
let ctx = null;
function context() {
  if (ctx) return ctx;
  if (typeof document === 'undefined') return null;
  ctx = document.createElement('canvas').getContext('2d');
  return ctx;
}

// 한글에 Arial 글리프가 없으므로 브라우저가 CJK 폰트로 대체한다.
// 구글도 같은 대체를 하지만 고르는 폰트가 환경마다 달라 한국어 측정값은 근사치다.
// 이 근사치도 글자 수보다는 훨씬 정확하다.
export function measureWidth(text, font) {
  const c = context();
  if (!c) return null;
  c.font = font;
  return c.measureText(text).width;
}

// 폭 제한에 걸리는 지점까지만 남기고 말줄임표를 붙인다. 구글이 하는 방식과 같다.
// measure를 주입받는 순수 함수라 캔버스 없이 테스트할 수 있다.
export function truncateByWidth(text, maxWidth, measure) {
  const full = measure(text);
  if (full <= maxWidth) return { text, truncated: false, width: full };

  const ellipsis = '…';
  const budget = maxWidth - measure(ellipsis);
  if (budget <= 0) return { text: ellipsis, truncated: true, width: full };

  // 이분 탐색. 한 글자씩 줄이면 긴 설명에서 수백 번 측정한다.
  const chars = [...text]; // 서로게이트 페어를 쪼개지 않는다
  let lo = 0;
  let hi = chars.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measure(chars.slice(0, mid).join('')) <= budget) lo = mid;
    else hi = mid - 1;
  }
  const kept = chars.slice(0, lo).join('').replace(/\s+$/, '');
  return { text: kept + ellipsis, truncated: true, width: full };
}

export function truncateToWidth(text, font, maxWidth) {
  const c = context();
  if (!c) return { text, truncated: false, width: 0 };
  return truncateByWidth(text, maxWidth, (t) => measureWidth(t, font));
}

export function analyzeField(text, kind) {
  const limits = SERP_LIMITS[kind];
  const value = (text || '').replace(/\s+/g, ' ').trim();
  const width = measureWidth(value, limits.font);
  return {
    value,
    chars: [...value].length, // 이모지·결합 문자를 한 글자로 센다
    width: width === null ? null : Math.round(width),
    desktop: truncateToWidth(value, limits.font, limits.desktop),
    mobile: truncateToWidth(value, limits.font, limits.mobile),
    limits,
  };
}

// 한글 비중이 높으면 같은 글자 수에서 폭이 훨씬 크다는 점을 알려주기 위해 센다.
export function cjkRatio(text) {
  const chars = [...(text || '')];
  if (!chars.length) return 0;
  const cjk = chars.filter((ch) => /[ᄀ-ᇿ㄰-㆏가-힯぀-ヿ一-鿿]/.test(ch));
  return cjk.length / chars.length;
}
