export const CONTENT_PAGES = new Set([
  'learn',
  'about',
  'privacy',
  'contact',
  'uuid-v4-v7',
  'jwt-exp-nbf',
  'base64-vs-url-encoding',
  'pdf-merge-split-guide',
]);

export const UTILITY_LINKS = [
  {
    key: 'learn',
    href: '/learn',
    labels: {
      ko: '가이드',
      en: 'Guides',
    },
  },
  {
    key: 'about',
    href: '/about',
    labels: {
      ko: '소개',
      en: 'About',
    },
  },
  {
    key: 'privacy',
    href: '/privacy',
    labels: {
      ko: '개인정보 처리',
      en: 'Privacy',
    },
  },
  {
    key: 'contact',
    href: '/contact',
    labels: {
      ko: '문의',
      en: 'Contact',
    },
  },
];

export const NAV_TOOLS = [
  { value: '/', labels: { ko: '홈', en: 'Home' } },
  { value: '/uuid', labels: { ko: 'UUID 변환기', en: 'UUID Converter' } },
  { value: '/base64', labels: { ko: 'Base64 변환기', en: 'Base64 Encoder/Decoder' } },
  { value: '/json', labels: { ko: 'JSON 포매터', en: 'JSON Formatter' } },
  { value: '/jwt', labels: { ko: 'JWT 디코더', en: 'JWT Decoder' } },
  { value: '/cron', labels: { ko: 'Cron 파서', en: 'Cron Parser' } },
  { value: '/url', labels: { ko: 'URL 인코더/디코더', en: 'URL Encoder/Decoder' } },
  { value: '/hash', labels: { ko: 'SHA 해시 계산기', en: 'SHA Hash' } },
  { value: '/timestamp', labels: { ko: '타임스탬프 변환', en: 'Timestamp Converter' } },
  { value: '/password', labels: { ko: '비밀번호 생성기', en: 'Password' } },
  { value: '/regex', labels: { ko: '정규식 테스트기', en: 'Regex Tester' } },
  { value: '/qr', labels: { ko: 'QR 코드 생성기', en: 'QR Code' } },
  { value: '/diff', labels: { ko: '텍스트 비교기', en: 'Text Diff' } },
  { value: '/color', labels: { ko: '색상 변환기', en: 'Color Converter' } },
  { value: '/markdown', labels: { ko: 'Markdown 미리보기', en: 'Markdown' } },
  { value: '/convert', labels: { ko: '단위 변환기', en: 'Unit Converter' } },
  { value: '/file-hash', labels: { ko: '파일 해시 계산기', en: 'File Hash' } },
  { value: '/image-base64', labels: { ko: '이미지 Base64 변환', en: 'Image Base64' } },
  { value: '/uuidv7', labels: { ko: 'UUID v7 생성기', en: 'UUID v7' } },
  { value: '/case-convert', labels: { ko: '케이스 변환기', en: 'Case Converter' } },
  { value: '/json-yaml', labels: { ko: 'JSON YAML 변환', en: 'JSON YAML' } },
  { value: '/query-builder', labels: { ko: 'URL 쿼리 생성기', en: 'URL Query Builder' } },
  { value: '/ip-ua', labels: { ko: 'IP / User-Agent', en: 'IP / User-Agent' } },
  { value: '/ip-cidr', labels: { ko: 'CIDR 계산기', en: 'CIDR Calculator' } },
  { value: '/text-stats', labels: { ko: '텍스트 통계', en: 'Text Stats' } },
  { value: '/pdf-toolkit', labels: { ko: 'PDF 병합/분할', en: 'PDF Merge/Split' } },
  { value: '/image-optimize', labels: { ko: '이미지 최적화', en: 'Image Optimizer' } },
  { value: '/ocr', labels: { ko: 'OCR 텍스트 추출', en: 'OCR Extractor' } },
  { value: '/seo-check', labels: { ko: 'SEO 메타 태그 검사', en: 'SEO Meta Check' } },
  { value: '/utm-builder', labels: { ko: 'UTM 생성기', en: 'UTM Builder' } },
  { value: '/text-cleaner', labels: { ko: '텍스트 정리기', en: 'Text Cleaner' } },
  { value: '/api-tester', labels: { ko: 'API 요청 테스트', en: 'API Request Tester' } },
];
