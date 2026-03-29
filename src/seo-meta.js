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
    title: 'UUID 변환기 | UUID Generator, UUID v4, ULID, Hex(binary16)',
    description:
      'UUID v4와 ULID를 생성하고 UUID를 hex(binary16)으로 변환하거나 다시 UUID로 복구할 수 있는 브라우저 도구입니다.',
    applicationCategory: 'DeveloperApplication',
  },
  base64: {
    path: '/base64',
    kind: 'tool',
    allowAds: true,
    title: 'Base64 인코더/디코더 | Encode Decode, URL-Safe, 파일 변환',
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
    title: 'URL 인코더/디코더 | Query String Parser',
    description:
      'URL 인코딩/디코딩, 쿼리 스트링 파싱, URL-safe 문자열 확인을 브라우저에서 바로 처리할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
  },
  hash: {
    path: '/hash',
    kind: 'tool',
    title: 'SHA Hash Generator | SHA-256, SHA-1, SHA-384, SHA-512',
    description:
      'Hash text with SHA algorithms in the browser and copy the result as hex or Base64.',
    applicationCategory: 'DeveloperApplication',
  },
  cron: {
    path: '/cron',
    kind: 'tool',
    title: 'Cron Expression Parser | Human Readable and Next Run Times',
    description:
      'Parse cron expressions, read them in plain language, and inspect upcoming run times in your browser.',
    applicationCategory: 'DeveloperApplication',
  },
  timestamp: {
    path: '/timestamp',
    kind: 'tool',
    title: 'Unix Timestamp Converter | Epoch to Date and Date to Epoch',
    description:
      'Convert Unix timestamps into readable dates and turn dates back into epoch seconds or milliseconds.',
    applicationCategory: 'DeveloperApplication',
  },
  password: {
    path: '/password',
    kind: 'tool',
    title: 'Password Generator | Secure Random Password Tool',
    description:
      'Generate strong random passwords with custom length and character sets, then review estimated strength.',
    applicationCategory: 'SecurityApplication',
  },
  regex: {
    path: '/regex',
    kind: 'tool',
    title: 'Regex Tester | Match Groups, Flags, and Replacements',
    description:
      'Test regular expressions, inspect matches, and experiment with flags and replacement patterns.',
    applicationCategory: 'DeveloperApplication',
  },
  qr: {
    path: '/qr',
    kind: 'tool',
    title: 'QR Code Generator and Scanner | Text, URL, Wi-Fi',
    description:
      'Create QR codes for text, URLs, or Wi-Fi credentials and decode uploaded QR images in the browser.',
    applicationCategory: 'UtilitiesApplication',
  },
  diff: {
    path: '/diff',
    kind: 'tool',
    title: 'Text Diff Checker | Compare Lines and Generate Unified Diff',
    description:
      'Compare two text blocks, highlight changes line by line, and review a unified diff output.',
    applicationCategory: 'DeveloperApplication',
  },
  color: {
    path: '/color',
    kind: 'tool',
    title: 'Color Converter and Contrast Checker | HEX, RGB, HSL',
    description:
      'Convert between HEX, RGB, and HSL values while checking contrast ratios in the browser.',
    applicationCategory: 'UtilitiesApplication',
  },
  markdown: {
    path: '/markdown',
    kind: 'tool',
    title: 'Markdown Previewer | HTML Output and Live Rendering',
    description:
      'Preview Markdown, inspect rendered HTML, and validate content formatting without leaving the browser.',
    applicationCategory: 'DeveloperApplication',
  },
  convert: {
    path: '/convert',
    kind: 'tool',
    title: 'Unit Converter | Length, Weight, Temperature and More',
    description:
      'Convert common units for length, weight, temperature, and other measurements with instant browser-side results.',
    applicationCategory: 'UtilitiesApplication',
  },
  'file-hash': {
    path: '/file-hash',
    kind: 'tool',
    title: 'File Hash Calculator | SHA-256 and SHA-512 in Browser',
    description:
      'Generate file hashes locally in the browser for quick integrity checks without uploading files.',
    applicationCategory: 'DeveloperApplication',
  },
  'image-base64': {
    path: '/image-base64',
    kind: 'tool',
    title: 'Image to Base64 Converter | Data URL Encode and Decode',
    description:
      'Turn images into Base64 data URLs and decode data URLs back into image previews in the browser.',
    applicationCategory: 'UtilitiesApplication',
  },
  uuidv7: {
    path: '/uuidv7',
    kind: 'tool',
    title: 'UUID v7 Generator | Time Ordered UUID Tool',
    description:
      'Generate sortable UUID v7 values directly in the browser for modern database and event workflows.',
    applicationCategory: 'DeveloperApplication',
  },
  'case-convert': {
    path: '/case-convert',
    kind: 'tool',
    title: 'Case Converter | camelCase, snake_case, kebab-case',
    description:
      'Convert text between common naming conventions such as camelCase, snake_case, kebab-case, and PascalCase.',
    applicationCategory: 'DeveloperApplication',
  },
  'json-yaml': {
    path: '/json-yaml',
    kind: 'tool',
    title: 'JSON YAML Converter | JSON to YAML, YAML to JSON, CSV',
    description:
      'Convert between JSON and YAML, and move structured data into CSV-friendly formats in the browser.',
    applicationCategory: 'DeveloperApplication',
  },
  'query-builder': {
    path: '/query-builder',
    kind: 'tool',
    title: 'URL Query Builder | Encode Parameters and Share Links',
    description:
      'Build query strings from key-value pairs, encode special characters, and copy shareable URLs.',
    applicationCategory: 'DeveloperApplication',
  },
  'ip-ua': {
    path: '/ip-ua',
    kind: 'tool',
    title: 'IP and User-Agent Viewer | Browser Network Details',
    description:
      'Inspect browser-reported IP, user-agent, language, and device information for quick environment checks.',
    applicationCategory: 'UtilitiesApplication',
  },
  'ip-cidr': {
    path: '/ip-cidr',
    kind: 'tool',
    title: 'CIDR Calculator | IPv4 Subnet, Broadcast, Host Range',
    description:
      'Calculate subnet masks, network ranges, broadcast addresses, and host counts from IPv4 CIDR blocks.',
    applicationCategory: 'UtilitiesApplication',
  },
  'pdf-toolkit': {
    path: '/pdf-toolkit',
    kind: 'tool',
    allowAds: true,
    title: 'PDF 툴킷 | 병합, 분할, 페이지 추출, 워터마크',
    description:
      'PDF 병합, 분할, 페이지 추출, 워터마크 작업을 파일 업로드 없이 브라우저에서 처리할 수 있습니다.',
    applicationCategory: 'BusinessApplication',
  },
  'image-optimize': {
    path: '/image-optimize',
    kind: 'tool',
    title: 'Image Optimizer | Resize, Compress, Convert WEBP JPEG PNG',
    description:
      'Resize and compress images, then export them as WEBP, JPEG, or PNG directly in the browser.',
    applicationCategory: 'UtilitiesApplication',
  },
  ocr: {
    path: '/ocr',
    kind: 'tool',
    title: 'OCR Text Extractor | Browser-Based Image to Text',
    description:
      'Extract text from uploaded images with browser-based OCR for quick copy, search, and cleanup workflows.',
    applicationCategory: 'UtilitiesApplication',
  },
  'text-stats': {
    path: '/text-stats',
    kind: 'tool',
    title: 'Text Statistics Counter | Words, Characters, Reading Time',
    description:
      'Count words, characters, lines, and estimated reading time for any text block in the browser.',
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
    title: 'UTM Builder | Campaign URL Generator',
    description:
      'Generate clean campaign URLs with UTM parameters for ads, social posts, newsletters, and reporting.',
    applicationCategory: 'BusinessApplication',
  },
  'text-cleaner': {
    path: '/text-cleaner',
    kind: 'tool',
    title: 'Text Cleaner | Trim Spaces, Deduplicate Lines, Slugify',
    description:
      'Clean pasted text by removing duplicate lines, normalizing whitespace, sorting entries, or creating slugs.',
    applicationCategory: 'UtilitiesApplication',
  },
  'api-tester': {
    path: '/api-tester',
    kind: 'tool',
    title: 'API Tester | HTTP Request Builder and cURL Export',
    description:
      'Send HTTP requests, inspect responses, and export cURL commands for quick browser-based API testing.',
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
