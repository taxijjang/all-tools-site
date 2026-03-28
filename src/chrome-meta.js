export const CONTENT_PAGES = new Set(['learn', 'about', 'privacy', 'contact']);

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
  { value: '/uuid', labels: { ko: 'UUID 변환기', en: 'UUID' } },
  { value: '/base64', labels: { ko: 'Base64 인코더', en: 'Base64' } },
  { value: '/json', labels: { ko: 'JSON 뷰어', en: 'JSON' } },
  { value: '/jwt', labels: { ko: 'JWT 검사기', en: 'JWT' } },
  { value: '/cron', labels: { ko: 'Cron 계산기', en: 'Cron' } },
  { value: '/url', labels: { ko: 'URL 인코더', en: 'URL' } },
  { value: '/hash', labels: { ko: '해시 계산기', en: 'Hash' } },
  { value: '/timestamp', labels: { ko: '타임스탬프', en: 'Timestamp' } },
  { value: '/password', labels: { ko: '비밀번호 생성기', en: 'Password' } },
  { value: '/regex', labels: { ko: 'Regex 테스터', en: 'Regex' } },
  { value: '/qr', labels: { ko: 'QR 생성기', en: 'QR' } },
  { value: '/diff', labels: { ko: '텍스트 Diff', en: 'Diff' } },
  { value: '/color', labels: { ko: '색상 도구', en: 'Color' } },
  { value: '/markdown', labels: { ko: 'Markdown 미리보기', en: 'Markdown' } },
  { value: '/convert', labels: { ko: '단위 변환기', en: 'Convert' } },
  { value: '/file-hash', labels: { ko: '파일 해시', en: 'File Hash' } },
  { value: '/image-base64', labels: { ko: '이미지 Base64', en: 'Image Base64' } },
  { value: '/uuidv7', labels: { ko: 'UUID v7', en: 'UUID v7' } },
  { value: '/case-convert', labels: { ko: '케이스 변환', en: 'Case Convert' } },
  { value: '/json-yaml', labels: { ko: 'JSON ↔ YAML', en: 'JSON YAML' } },
  { value: '/query-builder', labels: { ko: '쿼리 빌더', en: 'Query Builder' } },
  { value: '/ip-ua', labels: { ko: 'IP / User-Agent', en: 'IP / UA' } },
  { value: '/ip-cidr', labels: { ko: 'IP/CIDR 계산기', en: 'IP/CIDR' } },
  { value: '/text-stats', labels: { ko: '텍스트 통계', en: 'Text Stats' } },
  { value: '/pdf-toolkit', labels: { ko: 'PDF 툴킷', en: 'PDF Toolkit' } },
  { value: '/image-optimize', labels: { ko: '이미지 최적화', en: 'Image Optimize' } },
  { value: '/ocr', labels: { ko: 'OCR 추출', en: 'OCR' } },
  { value: '/seo-check', labels: { ko: 'SEO 퀵체크', en: 'SEO Check' } },
  { value: '/utm-builder', labels: { ko: 'UTM 빌더', en: 'UTM Builder' } },
  { value: '/text-cleaner', labels: { ko: '텍스트 정리기', en: 'Text Cleaner' } },
  { value: '/api-tester', labels: { ko: 'API 테스터', en: 'API Tester' } },
];
