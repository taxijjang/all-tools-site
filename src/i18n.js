const SUPPORTED_LOCALES = ['ko', 'en'];

const translations = {
  ko: {
    'common.languageLabel': '언어',
    'common.languageKorean': '한국어',
    'common.languageEnglish': 'English',
    'common.copy': '복사',
    'common.copySuccess': '클립보드에 복사했습니다.',
    'common.copyFail': '복사에 실패했습니다. 브라우저 권한을 확인하세요.',
    'common.clear': '지우기',
    'common.sample': '샘플',
    'common.back': '← 도구 목록으로',
    'common.shareState': '상태 공유 링크',
    'common.snippetTitle': 'CLI · 코드 스니펫',
    'common.snippetSubtitle': 'Node.js · shell',
    'common.footerHome': '© 2025 stateless tools · Cloudflare Pages 배포용 정적 사이트',
    'common.footerBase64':
      '© 2025 stateless tools · 모든 변환은 브라우저에서만 처리되며 파일/쿠키를 서버로 전송하지 않습니다.',
    'common.footerUuid': '© 2025 stateless tools · Cloudflare Pages 배포용 정적 사이트',
    'common.footerJson': '© 2025 stateless tools · JSON 처리는 브라우저 메모리에서만 수행됩니다.',
    'home.eyebrow': 'stateless dev tools',
    'home.title': '브라우저 네이티브 유틸 모음',
    'home.description': '터미널 대신 탭 하나로 디버깅하세요. 모든 변환은 클라이언트 메모리에서만 실행됩니다.',
    'home.card.uuid.title': 'UUID 변환기',
    'home.card.uuid.desc': '랜덤 UUID 생성, hex(binary16) 변환 및 복구 기능 제공.',
    'home.card.base64.title': 'Base64 인코더',
    'home.card.base64.desc': '문자열↔Base64, URL-safe, 공백 제거 옵션까지 한번에.',
    'home.card.json.title': 'JSON Viewer',
    'home.card.json.desc': 'JSON을 즉시 검증하고 포맷/압축/복사하는 개발자용 뷰어.',
    'home.card.jwt.title': 'JWT Inspector',
    'home.card.jwt.desc': '헤더·페이로드와 만료 정보를 한 번에 확인하세요.',
    'home.card.url.title': 'URL 인코더',
    'home.card.url.desc': '인코딩/디코딩과 쿼리 파라미터 파싱 지원.',
    'home.card.hash.title': '해시 계산기',
    'home.card.hash.desc': 'SHA 계열 해시를 브라우저에서 안전하게 계산.',
    'base64.title': 'Base64 인코더',
    'base64.description': '텍스트와 Base64 사이를 즉시 변환하고 URL-safe/공백 제거 옵션을 적용하세요.',
    'base64.encode.title': '문자열 → Base64',
    'base64.encode.input': '문자열 입력',
    'base64.encode.placeholder': '예: 안녕하세요',
    'base64.encode.urlSafe': 'URL-safe 변환',
    'base64.encode.button': '인코딩',
    'base64.encode.result': 'Base64 결과',
    'base64.decode.title': 'Base64 → 문자열',
    'base64.decode.input': 'Base64 입력',
    'base64.decode.placeholder': '예: 7JWI64WV7ZWY7IS47JqU',
    'base64.decode.strip': '공백 제거',
    'base64.decode.urlSafe': 'URL-safe 복구',
    'base64.decode.button': '디코딩',
    'base64.decode.result': '문자열 결과',
    'base64.file.title': '파일 ↔ Base64',
    'base64.file.helper': '파일을 선택하면 즉시 Base64로 변환됩니다.',
    'base64.file.downloadPlaceholder': 'decoded.bin',
    'base64.file.downloadBtn': 'Base64 → 파일 저장',
    'uuid.title': 'UUID 변환기',
    'uuid.description': 'crypto.randomUUID() 기반 랜덤 생성과 hex(binary16) 상호 변환을 제공합니다.',
    'uuid.random.label': '랜덤 UUID',
    'uuid.random.button': '새로 생성',
    'uuid.random.mode': '생성 옵션',
    'uuid.random.v4': 'UUID v4',
    'uuid.random.ulid': 'ULID (가독성)',
    'uuid.toHex.title': 'UUID → Hex(binary16)',
    'uuid.toHex.input': 'UUID 입력',
    'uuid.toHex.placeholder': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    'uuid.toHex.button': '변환',
    'uuid.toHex.output': 'Hex 결과',
    'uuid.toUuid.title': 'Hex(binary16) → UUID',
    'uuid.toUuid.input': 'Hex 입력 (32자리)',
    'uuid.toUuid.placeholder': '32자리 16진수',
    'uuid.toUuid.button': '복구',
    'uuid.toUuid.output': 'UUID 결과',
    'uuid.bulk.title': '대량 생성',
    'uuid.bulk.count': '개수',
    'uuid.bulk.button': '생성',
    'json.title': 'JSON Viewer',
    'json.description': '실행 중인 서비스 설정을 점검하듯 JSON을 검증하고, 포맷/압축/복사하세요.',
    'json.input': '입력 JSON',
    'json.placeholder': '{"hello":"world"}',
    'json.format': '포맷',
    'json.minify': '압축',
    'json.output': '출력',
    'json.searchLabel': '키/값 검색',
    'json.searchPlaceholder': 'user.id',
    'json.highlightTitle': '하이라이트',
    'json.treeTitle': '트리 뷰',
    'json.treeCollapse': '모두 접기',
    'json.treeNode.array': '배열',
    'json.treeNode.object': '객체',
    'json.meta.empty': '입력 없음',
    'messages.base64.encodeSuccess': '문자열을 Base64로 인코딩했습니다.',
    'messages.base64.encodeError': '인코딩 중 오류가 발생했습니다.',
    'messages.base64.decodeSuccess': 'Base64를 문자열로 디코딩했습니다.',
    'messages.base64.decodeError': '디코딩 중 오류가 발생했습니다. 입력을 확인하세요.',
    'messages.base64.fileEncoded': '{name} 파일을 Base64로 변환했습니다.',
    'messages.base64.fileDecoded': 'Base64를 파일로 내보냈습니다.',
    'messages.base64.fileError': '파일 변환에 실패했습니다.',
    'messages.uuid.randomGenerated': '새 UUID를 생성했습니다.',
    'messages.uuid.toHexSuccess': 'UUID를 hex(binary16)으로 변환했습니다.',
    'messages.uuid.toHexError': 'UUID 형식이 올바르지 않습니다.',
    'messages.uuid.toUuidSuccess': 'hex(binary16)을 UUID로 복구했습니다.',
    'messages.uuid.toUuidError': 'Hex(binary16)은 32자리 16진수여야 합니다.',
    'messages.uuid.bulkGenerated': '{count}개의 식별자를 생성했습니다.',
    'messages.json.empty': 'JSON 입력이 비었습니다.',
    'messages.json.pretty': 'JSON을 보기 좋게 정렬했습니다.',
    'messages.json.compact': 'JSON을 압축했습니다.',
    'messages.json.error': 'JSON 파싱 실패: {message}',
    'messages.json.cleared': '입력을 초기화했습니다.',
    'messages.json.sample': '샘플 JSON을 불러왔습니다.',
    'json.meta.array': '배열 · {count} items',
    'json.meta.object': '객체 · {count} keys ({examples})',
    'json.meta.primitive': '프리미티브 · {type}',
    'jwt.title': 'JWT Inspector',
    'jwt.description': 'JWT 헤더·페이로드를 확인하고 exp/nbf 등 만료 클레임을 점검하세요. 서명 검증은 지원하지 않습니다.',
    'jwt.input': 'JWT 토큰',
    'jwt.placeholder': 'eyJhbGciOi...',
    'jwt.action.decode': '디코드',
    'jwt.output.header': '헤더',
    'jwt.output.payload': '페이로드',
    'jwt.success': 'JWT를 디코드했습니다.',
    'jwt.error.empty': 'JWT 값을 입력하세요.',
    'jwt.error.format': 'JWT 형식이 올바르지 않습니다.',
    'jwt.error.decode': 'JWT 디코딩에 실패했습니다.',
    'jwt.meta.expires': '만료: {date}',
    'jwt.meta.expired': '만료됨: {date}',
    'jwt.meta.nbfActive': 'nbf 통과: {date}',
    'jwt.meta.nbfPending': 'nbf 대기: {date}',
    'cron.title': 'Cron 계산기',
    'cron.description': 'Cron 표현식을 해석하고 다음 실행 시간을 미리 확인하세요.',
    'cron.input': 'Cron 표현식',
    'cron.nextRuns': '다음 실행 시간 (5회)',
    'url.title': 'URL 인코더',
    'url.description': 'RFC3986 기반 인코딩/디코딩과 쿼리 파라미터 분석 지원.',
    'url.input': '원본 문자열/URL',
    'url.placeholder': 'https://example.com?q=안녕하세요',
    'url.encode': '인코딩',
    'url.decode': '디코딩',
    'url.output': '결과',
    'url.outputHelper': '복사하거나 파라미터 테이블을 확인하세요.',
    'url.paramsTitle': '쿼리 파라미터',
    'url.paramsEmpty': '표시할 파라미터가 없습니다.',
    'url.success.encode': 'URL을 인코딩했습니다.',
    'url.success.decode': 'URL을 디코딩했습니다.',
    'url.error.empty': '값을 입력하세요.',
    'url.error.encode': '인코딩에 실패했습니다.',
    'url.error.decode': '디코딩에 실패했습니다.',
    'hash.title': '해시 계산기',
    'hash.description': 'SHA-1/256/384/512 해시를 WebCrypto로 계산합니다.',
    'hash.input': '입력 문자열',
    'hash.placeholder': 'stateless tools',
    'hash.algorithm': '알고리즘',
    'hash.uppercase': 'HEX 대문자 출력',
    'hash.compute': '해시 계산',
    'hash.hex': 'HEX',
    'hash.base64': 'Base64',
    'hash.error.empty': '입력 문자열이 필요합니다.',
    'hash.error.unsupported': '이 브라우저에서 해시 계산을 완료할 수 없습니다.',
    'hash.success': '{algorithm} 해시를 계산했습니다.',
  },
  en: {
    'common.languageLabel': 'Language',
    'common.languageKorean': '한국어',
    'common.languageEnglish': 'English',
    'common.copy': 'Copy',
    'common.copySuccess': 'Copied to clipboard.',
    'common.copyFail': 'Failed to copy. Check your browser permissions.',
    'common.clear': 'Clear',
    'common.sample': 'Sample',
    'common.back': '← Back to tools',
    'common.shareState': 'Copy shareable link',
    'common.snippetTitle': 'CLI · Code Snippet',
    'common.snippetSubtitle': 'Node.js · shell',
    'common.footerHome': '© 2025 stateless tools · Static site for Cloudflare Pages deployment',
    'common.footerBase64': '© 2025 stateless tools · All conversion stays inside your browser. No files/cookies sent.',
    'common.footerUuid': '© 2025 stateless tools · Static site for Cloudflare Pages deployment',
    'common.footerJson': '© 2025 stateless tools · JSON stays entirely in browser memory.',
    'home.eyebrow': 'stateless dev tools',
    'home.title': 'Browser-Native Utility Suite',
    'home.description': 'Debug from a single tab instead of the terminal. Every transform runs in client memory.',
    'home.card.uuid.title': 'UUID Converter',
    'home.card.uuid.desc': 'Random UUIDs plus round-trip hex(binary16) conversion.',
    'home.card.base64.title': 'Base64 Encoder',
    'home.card.base64.desc': 'Text ↔ Base64 with URL-safe and whitespace cleanup options.',
    'home.card.json.title': 'JSON Viewer',
    'home.card.json.desc': 'Validate, format, minify, and copy JSON instantly in the browser.',
    'home.card.jwt.title': 'JWT Inspector',
    'home.card.jwt.desc': 'Inspect headers/payloads and expiry claims instantly.',
    'home.card.url.title': 'URL Encoder',
    'home.card.url.desc': 'Encode/decode strings and parse query params.',
    'home.card.hash.title': 'Hash Calculator',
    'home.card.hash.desc': 'Compute SHA hashes safely in your browser.',
    'base64.title': 'Base64 Encoder',
    'base64.description': 'Hop between text and Base64 instantly with URL-safe/whitespace options.',
    'base64.encode.title': 'Text → Base64',
    'base64.encode.input': 'Text input',
    'base64.encode.placeholder': 'e.g. Hello, world',
    'base64.encode.urlSafe': 'URL-safe output',
    'base64.encode.button': 'Encode',
    'base64.encode.result': 'Base64 result',
    'base64.decode.title': 'Base64 → Text',
    'base64.decode.input': 'Base64 input',
    'base64.decode.placeholder': 'e.g. SGVsbG8sIHdvcmxkIQ==',
    'base64.decode.strip': 'Strip whitespace',
    'base64.decode.urlSafe': 'Restore URL-safe',
    'base64.decode.button': 'Decode',
    'base64.decode.result': 'Text result',
    'base64.file.title': 'File ↔ Base64',
    'base64.file.helper': 'Drop any file to convert it into Base64 immediately.',
    'base64.file.downloadPlaceholder': 'decoded.bin',
    'base64.file.downloadBtn': 'Export Base64 to file',
    'uuid.title': 'UUID Converter',
    'uuid.description': 'crypto.randomUUID() generation plus hex(binary16) round-trips.',
    'uuid.random.label': 'Random UUID',
    'uuid.random.button': 'Generate',
    'uuid.random.mode': 'Generation mode',
    'uuid.random.v4': 'UUID v4',
    'uuid.random.ulid': 'ULID (readable)',
    'uuid.toHex.title': 'UUID → Hex(binary16)',
    'uuid.toHex.input': 'UUID input',
    'uuid.toHex.placeholder': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    'uuid.toHex.button': 'Convert',
    'uuid.toHex.output': 'Hex output',
    'uuid.toUuid.title': 'Hex(binary16) → UUID',
    'uuid.toUuid.input': 'Hex input (32 chars)',
    'uuid.toUuid.placeholder': '32 hex characters',
    'uuid.toUuid.button': 'Restore',
    'uuid.toUuid.output': 'UUID output',
    'uuid.bulk.title': 'Bulk generation',
    'uuid.bulk.count': 'Count',
    'uuid.bulk.button': 'Generate',
    'json.title': 'JSON Viewer',
    'json.description': 'Audit JSON the way you inspect service configs—format, minify, and copy safely.',
    'json.input': 'JSON input',
    'json.placeholder': '{"hello":"world"}',
    'json.format': 'Format',
    'json.minify': 'Minify',
    'json.output': 'Output',
    'json.searchLabel': 'Search keys/values',
    'json.searchPlaceholder': 'user.id',
    'json.highlightTitle': 'Highlighted JSON',
    'json.treeTitle': 'Tree view',
    'json.treeCollapse': 'Collapse all',
    'json.treeNode.array': 'Array',
    'json.treeNode.object': 'Object',
    'json.meta.empty': 'No input',
    'messages.base64.encodeSuccess': 'Encoded text to Base64.',
    'messages.base64.encodeError': 'Failed to encode. Please check the input.',
    'messages.base64.decodeSuccess': 'Decoded Base64 back to text.',
    'messages.base64.decodeError': 'Failed to decode Base64. Please verify the value.',
    'messages.base64.fileEncoded': 'Converted {name} to Base64.',
    'messages.base64.fileDecoded': 'Exported Base64 as a file.',
    'messages.base64.fileError': 'File conversion failed.',
    'messages.uuid.randomGenerated': 'Generated a fresh UUID.',
    'messages.uuid.toHexSuccess': 'Converted UUID to hex(binary16).',
    'messages.uuid.toHexError': 'Invalid UUID format.',
    'messages.uuid.toUuidSuccess': 'Recovered UUID from hex(binary16).',
    'messages.uuid.toUuidError': 'Hex(binary16) must be a 32-character hex string.',
    'messages.uuid.bulkGenerated': 'Generated {count} identifiers.',
    'messages.json.empty': 'JSON input is empty.',
    'messages.json.pretty': 'Pretty-printed the JSON.',
    'messages.json.compact': 'Minified the JSON.',
    'messages.json.error': 'JSON parse failed: {message}',
    'messages.json.cleared': 'Reset the input.',
    'messages.json.sample': 'Loaded a sample JSON.',
    'json.meta.array': 'Array · {count} items',
    'json.meta.object': 'Object · {count} keys ({examples})',
    'json.meta.primitive': 'Primitive · {type}',
    'jwt.title': 'JWT Inspector',
    'jwt.description': 'Decode JWT headers/payloads and audit exp/nbf claims. Signature verification not included.',
    'jwt.input': 'JWT token',
    'jwt.placeholder': 'eyJhbGciOi...',
    'jwt.action.decode': 'Decode',
    'jwt.output.header': 'Header',
    'jwt.output.payload': 'Payload',
    'jwt.success': 'Decoded JWT successfully.',
    'jwt.error.empty': 'Please paste a JWT.',
    'jwt.error.format': 'Invalid JWT format.',
    'jwt.error.decode': 'Failed to decode JWT.',
    'jwt.meta.expires': 'expires: {date}',
    'jwt.meta.expired': 'expired: {date}',
    'jwt.meta.nbfActive': 'nbf passed: {date}',
    'jwt.meta.nbfPending': 'nbf pending: {date}',
    'cron.title': 'Cron Calculator',
    'cron.description': 'Parse cron expressions and preview next execution times.',
    'cron.input': 'Cron Expression',
    'cron.nextRuns': 'Next 5 Runs',
    'url.title': 'URL Encoder',
    'url.description': 'Encode/decode per RFC3986 and inspect query parameters.',
    'url.input': 'Original string/URL',
    'url.placeholder': 'https://example.com?q=Hello',
    'url.encode': 'Encode',
    'url.decode': 'Decode',
    'url.output': 'Result',
    'url.outputHelper': 'Copy or inspect the parameter table.',
    'url.paramsTitle': 'Query parameters',
    'url.paramsEmpty': 'No parameters to display.',
    'url.success.encode': 'Encoded the value.',
    'url.success.decode': 'Decoded the value.',
    'url.error.empty': 'Enter a value first.',
    'url.error.encode': 'Encoding failed.',
    'url.error.decode': 'Decoding failed.',
    'hash.title': 'Hash Calculator',
    'hash.description': 'Compute SHA-1/256/384/512 hashes via WebCrypto.',
    'hash.input': 'Input text',
    'hash.placeholder': 'stateless tools',
    'hash.algorithm': 'Algorithm',
    'hash.uppercase': 'Uppercase HEX output',
    'hash.compute': 'Compute hash',
    'hash.hex': 'HEX',
    'hash.base64': 'Base64',
    'hash.error.empty': 'Input text is required.',
    'hash.error.unsupported': 'Unable to compute hash in this browser.',
    'hash.success': 'Generated {algorithm} hash.',
  },
};

const initialLocale = window.__preferredLocale || getInitialLocale();
let currentLocale = initialLocale;
const listeners = new Set();

function getInitialLocale() {
  const stored = safeStorage('get', 'stateless-tools-locale');
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    return stored;
  }
  const browser = navigator.language?.slice(0, 2);
  if (browser && SUPPORTED_LOCALES.includes(browser)) {
    return browser;
  }
  return 'ko';
}

function safeStorage(action, key, value) {
  try {
    if (action === 'set') {
      localStorage.setItem(key, value);
    } else if (action === 'get') {
      return localStorage.getItem(key);
    }
  } catch (err) {
    // ignore storage failures (private mode, etc)
  }
  return null;
}

function format(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (match, name) => (vars[name] ?? match));
}

export function t(key, vars) {
  const dict = translations[currentLocale] || translations.ko;
  const template = dict[key];
  if (!template) return key;
  if (vars) {
    return format(template, vars);
  }
  return template;
}

function applyTranslations(root = document) {
  const elements = root.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const value = t(key);
    if (!value) return;
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.textContent = value;
    }
  });
}

export function setLocale(locale, { root = document } = {}) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    locale = 'en';
  }
  if (currentLocale === locale) return;
  currentLocale = locale;
  safeStorage('set', 'stateless-tools-locale', locale);
  document.documentElement.setAttribute('lang', locale);
  applyTranslations(root);
  listeners.forEach((cb) => cb(locale));
}

export function initI18n({ root = document } = {}) {
  document.documentElement.setAttribute('lang', currentLocale);
  applyTranslations(root);
  document.documentElement.classList.remove('i18n-pending');
  return currentLocale;
}

export function bindLocaleSwitcher(selectEl, { root = document } = {}) {
  if (!selectEl) return;
  selectEl.value = currentLocale;
  selectEl.addEventListener('change', (event) => {
    setLocale(event.target.value, { root });
  });
  listeners.add((locale) => {
    selectEl.value = locale;
  });
}

export function onLocaleChange(handler) {
  listeners.add(handler);
  return () => listeners.delete(handler);
}
