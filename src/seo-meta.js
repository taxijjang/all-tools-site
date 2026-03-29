const DEFAULT_SITE_ORIGIN = 'https://all-tools-site.pages.dev';

function normalizeSiteOrigin(origin) {
  if (!origin) {
    return DEFAULT_SITE_ORIGIN;
  }

  return origin
    .trim()
    .replace(/\/+$/, '')
    .replace(/^http:\/\//i, 'https://');
}

export const SITE_ORIGIN = normalizeSiteOrigin(
  process.env.SITE_ORIGIN || process.env.VITE_SITE_ORIGIN || DEFAULT_SITE_ORIGIN,
);
export const SITE_NAME = 'Stateless Tools';
export const SITE_ALT_NAME = 'stateless dev tools';
export const SITE_LOGO_PATH = '/icon.svg';
export const SITE_SOCIALS = [
  'https://github.com/taxijjang/all-tools-site',
  'https://taxijjang.tistory.com/',
];

export const PAGE_META = {
  index: {
    path: '/',
    kind: 'home',
    title: '개발자 도구 모음 | UUID 변환기, Base64, JSON, JWT',
    description:
      'UUID 변환기, Base64 인코더/디코더, JSON 포매터, JWT 디코더 등 개발자용 브라우저 도구를 바로 사용할 수 있습니다.',
  },
  learn: {
    path: '/learn',
    kind: 'content',
    allowAds: true,
    title: '개발자 유틸 가이드 | UUID, JWT, Base64',
    description:
      'UUID, JWT, Base64, URL 인코딩 같은 개발자 유틸을 언제 어떻게 쓰는지 실무 중심으로 정리한 가이드입니다.',
  },
  about: {
    path: '/about',
    kind: 'content',
    title: 'About Stateless Tools | Browser-Based Utility Suite',
    description:
      'Learn why Stateless Tools was built, who it helps, and how the browser-first utility site is maintained.',
  },
  privacy: {
    path: '/privacy',
    kind: 'content',
    title: 'Privacy Guide | Stateless Tools',
    description:
      'How Stateless Tools handles browser-side processing, analytics, cached preferences, and third-party services.',
  },
  contact: {
    path: '/contact',
    kind: 'content',
    title: 'Contact and Feedback | Stateless Tools',
    description:
      'Where to report bugs, request features, and share feedback for Stateless Tools.',
  },
  uuid: {
    path: '/uuid',
    kind: 'tool',
    allowAds: true,
    title: 'UUID 변환기 | UUID 생성기, UUID v4, ULID, Hex 변환',
    description:
      'UUID v4와 ULID를 생성하고 UUID를 hex(binary16)으로 변환하거나 다시 UUID로 복구할 수 있는 브라우저 도구입니다.',
    applicationCategory: 'DeveloperApplication',
  },
  base64: {
    path: '/base64',
    kind: 'tool',
    allowAds: true,
    title: 'Base64 인코더/디코더 | Base64 변환, URL-safe, 파일 인코딩',
    description:
      '문자열과 파일을 Base64로 인코딩하거나 디코딩하고, URL-safe와 공백 정리 옵션까지 브라우저에서 처리할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  json: {
    path: '/json',
    kind: 'tool',
    title: 'JSON 포매터/검증기 | Formatter, Validator, Tree View',
    description:
      'JSON 유효성 검사, 포맷/압축, 키 검색, 트리 뷰 확인까지 한 번에 할 수 있는 브라우저 도구입니다.',
    applicationCategory: 'DeveloperApplication',
  },
  jwt: {
    path: '/jwt',
    kind: 'tool',
    allowAds: true,
    title: 'JWT 디코더/검사기 | Decoder, Claims, Expiry, JWKS',
    description:
      'JWT 헤더와 페이로드를 디코딩하고 exp, nbf, claims를 확인할 수 있는 브라우저용 JWT 검사 도구입니다.',
    applicationCategory: 'DeveloperApplication',
  },
  url: {
    path: '/url',
    kind: 'tool',
    title: 'URL 인코더/디코더 | URL Decode, Query String Parser',
    description:
      'URL 인코딩/디코딩, 쿼리 스트링 파싱, URL-safe 문자열 확인을 브라우저에서 바로 처리할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  hash: {
    path: '/hash',
    kind: 'tool',
    title: 'SHA 해시 계산기 | SHA-256, SHA-1, SHA-384, SHA-512',
    description:
      'SHA-1, SHA-256, SHA-384, SHA-512 해시를 계산하고 HEX 또는 Base64로 바로 복사할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  cron: {
    path: '/cron',
    kind: 'tool',
    title: 'Cron 표현식 파서 | Cron 해석, 다음 실행 시간',
    description:
      'Cron 표현식을 사람이 읽기 쉬운 문장으로 해석하고 다음 실행 시간을 계산할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  timestamp: {
    path: '/timestamp',
    kind: 'tool',
    title: 'Unix 타임스탬프 변환기 | Epoch 변환, 날짜 변환',
    description:
      '유닉스 타임스탬프를 날짜로 변환하고 날짜를 epoch 초 또는 밀리초로 다시 바꿀 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  password: {
    path: '/password',
    kind: 'tool',
    title: '비밀번호 생성기 | 랜덤 비밀번호, 강도 확인',
    description:
      '길이와 문자셋 옵션으로 랜덤 비밀번호를 생성하고 강도를 바로 확인할 수 있습니다.',
    applicationCategory: 'SecurityApplication',
  },
  regex: {
    path: '/regex',
    kind: 'tool',
    title: '정규식 테스트기 | Regex Tester, Flags, Replace',
    description:
      '정규식 패턴과 플래그를 테스트하고 매치 결과와 치환 결과를 빠르게 확인할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  qr: {
    path: '/qr',
    kind: 'tool',
    title: 'QR 코드 생성기/스캐너 | QR 생성, QR 읽기, Wi-Fi QR',
    description:
      '텍스트, URL, Wi-Fi 정보를 QR 코드로 만들고 업로드한 QR 이미지를 바로 읽을 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  diff: {
    path: '/diff',
    kind: 'tool',
    title: '텍스트 비교기 | Diff Checker, Unified Diff',
    description:
      '두 텍스트를 줄 단위로 비교하고 변경 내용을 unified diff 형태로 확인할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  color: {
    path: '/color',
    kind: 'tool',
    title: '색상 변환기/대비 검사기 | HEX, RGB, HSL',
    description:
      'HEX, RGB, HSL 색상 코드를 서로 변환하고 대비 비율을 계산할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  markdown: {
    path: '/markdown',
    kind: 'tool',
    title: 'Markdown 미리보기 | Markdown HTML 변환',
    description:
      'Markdown을 실시간으로 렌더링하고 HTML 출력까지 함께 확인할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  convert: {
    path: '/convert',
    kind: 'tool',
    title: '단위 변환기 | 길이, 무게, 온도 변환',
    description:
      '길이, 무게, 온도 등 자주 쓰는 단위를 브라우저에서 빠르게 변환합니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'file-hash': {
    path: '/file-hash',
    kind: 'tool',
    title: '파일 해시 계산기 | SHA-256, SHA-512',
    description:
      '업로드한 파일의 SHA 해시를 로컬에서 계산해 무결성을 빠르게 점검할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'image-base64': {
    path: '/image-base64',
    kind: 'tool',
    title: '이미지 Base64 변환기 | Data URL 인코딩/디코딩',
    description:
      '이미지 파일을 Base64 data URL로 변환하거나 data URL을 다시 이미지로 복원할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  uuidv7: {
    path: '/uuidv7',
    kind: 'tool',
    title: 'UUID v7 생성기 | Time Ordered UUID',
    description:
      '시간순 정렬에 유리한 UUID v7 값을 브라우저에서 바로 생성할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'case-convert': {
    path: '/case-convert',
    kind: 'tool',
    title: '텍스트 케이스 변환기 | camelCase, snake_case, kebab-case',
    description:
      'camelCase, snake_case, kebab-case, PascalCase를 서로 변환할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'json-yaml': {
    path: '/json-yaml',
    kind: 'tool',
    title: 'JSON YAML 변환기 | JSON to YAML, YAML to JSON, CSV',
    description:
      'JSON과 YAML을 서로 변환하고 구조화된 데이터를 CSV 형태로 정리할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'query-builder': {
    path: '/query-builder',
    kind: 'tool',
    title: 'URL 쿼리 생성기 | Query String Builder',
    description:
      '키-값 쌍으로 쿼리 스트링을 만들고 인코딩된 공유 URL을 빠르게 생성할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'ip-ua': {
    path: '/ip-ua',
    kind: 'tool',
    title: 'IP/User-Agent 확인 | 브라우저 네트워크 정보',
    description:
      'IP 주소, User-Agent, 언어, 타임존 같은 브라우저 환경 정보를 빠르게 확인할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'ip-cidr': {
    path: '/ip-cidr',
    kind: 'tool',
    title: 'CIDR 계산기 | IPv4 서브넷, 브로드캐스트, 호스트 범위',
    description:
      'IPv4 CIDR 블록에서 서브넷, 브로드캐스트 주소, 호스트 범위를 계산할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'pdf-toolkit': {
    path: '/pdf-toolkit',
    kind: 'tool',
    allowAds: true,
    title: 'PDF 병합/분할 툴 | PDF 병합, 분할, 페이지 추출, 워터마크',
    description:
      'PDF 병합, 분할, 페이지 추출, 워터마크 작업을 파일 업로드 없이 브라우저에서 처리할 수 있습니다.',
    applicationCategory: 'BusinessApplication',
  },
  'image-optimize': {
    path: '/image-optimize',
    kind: 'tool',
    title: '이미지 최적화 | 이미지 압축, 리사이즈, WEBP 변환',
    description:
      '이미지를 압축하고 리사이즈한 뒤 WEBP, JPEG, PNG로 변환할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  ocr: {
    path: '/ocr',
    kind: 'tool',
    title: 'OCR 텍스트 추출 | 이미지 글자 인식, Image to Text',
    description:
      '이미지에서 한글과 영어 텍스트를 추출해 복사, 검색, 정리에 활용할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'text-stats': {
    path: '/text-stats',
    kind: 'tool',
    title: '텍스트 통계 계산기 | 글자 수, 단어 수, 읽기 시간',
    description:
      '글자 수, 단어 수, 줄 수, 예상 읽기 시간을 한 번에 계산합니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'seo-check': {
    path: '/seo-check',
    kind: 'tool',
    allowAds: true,
    title: 'SEO 메타 태그 검사기 | Title, Description, OG, Canonical',
    description:
      '페이지 제목, 설명, Open Graph, canonical 태그를 점검해 자주 놓치는 SEO 문제를 빠르게 확인할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'utm-builder': {
    path: '/utm-builder',
    kind: 'tool',
    title: 'UTM 생성기 | Campaign URL Builder',
    description:
      '광고, 소셜, 뉴스레터용 UTM 파라미터 URL을 만들어 추적 링크를 빠르게 생성합니다.',
    applicationCategory: 'BusinessApplication',
  },
  'text-cleaner': {
    path: '/text-cleaner',
    kind: 'tool',
    title: '텍스트 정리기 | 공백 제거, 중복 제거, slugify',
    description:
      '공백 정리, 줄 중복 제거, 정렬, slugify 작업을 한 번에 처리합니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'api-tester': {
    path: '/api-tester',
    kind: 'tool',
    title: 'API 요청 테스트 | HTTP Request Builder, cURL',
    description:
      'HTTP 요청을 보내고 응답을 확인한 뒤 cURL 명령으로 내보낼 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  'csv-tools': {
    path: '/csv-tools',
    kind: 'alias',
    noindex: true,
    canonicalPath: '/json-yaml',
  },
  'jwt-verify': {
    path: '/jwt-verify',
    kind: 'alias',
    noindex: true,
    canonicalPath: '/jwt',
  },
  'qr-advanced': {
    path: '/qr-advanced',
    kind: 'alias',
    noindex: true,
    canonicalPath: '/qr',
  },
};

export const FEATURED_TOOL_PATHS = [
  '/uuid',
  '/base64',
  '/json',
  '/jwt',
  '/url',
  '/password',
  '/timestamp',
  '/api-tester',
];
