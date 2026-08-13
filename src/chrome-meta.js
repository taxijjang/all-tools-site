export const CONTENT_PAGES = new Set([
  'learn',
  'ai-tools',
  'about',
  'privacy',
  'contact',
  'claude-code-cheatsheet',
  'codex-cheatsheet',
  'uuid-v4-v7',
  'jwt-exp-nbf',
  'base64-vs-url-encoding',
  'pdf-merge-split-guide',
]);

// placement: 'nav'은 상단 바, 'footer'는 푸터.
// 상단 바에 컨트롤이 8개까지 늘어나 도구가 화면 아래로 밀렸다. 정책·소개 링크는
// 푸터가 관례적인 자리이고, 애드센스가 보는 발견성도 푸터로 충족된다.
export const UTILITY_LINKS = [
  {
    key: 'learn',
    href: '/learn',
    placement: 'nav',
    labels: {
      ko: '가이드',
      en: 'Guides',
    },
  },
  {
    key: 'aiTools',
    href: '/ai-tools',
    placement: 'nav',
    labels: {
      ko: 'AI 명령어',
      en: 'AI Commands',
    },
  },
  {
    key: 'about',
    href: '/about',
    placement: 'footer',
    labels: {
      ko: '소개',
      en: 'About',
    },
  },
  {
    key: 'privacy',
    href: '/privacy',
    placement: 'footer',
    labels: {
      ko: '개인정보 처리',
      en: 'Privacy',
    },
  },
  {
    key: 'contact',
    href: '/contact',
    placement: 'footer',
    labels: {
      ko: '문의',
      en: 'Contact',
    },
  },
];

export const NAV_UTILITY_LINKS = UTILITY_LINKS.filter((link) => link.placement !== 'footer');
export const FOOTER_UTILITY_LINKS = UTILITY_LINKS.filter((link) => link.placement === 'footer');

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
  { value: '/case-convert', labels: { ko: '케이스 변환기', en: 'Case Converter' } },
  { value: '/json-yaml', labels: { ko: 'JSON YAML 변환', en: 'JSON YAML' } },
  { value: '/query-builder', labels: { ko: 'URL 쿼리 작업대', en: 'URL Query Workbench' } },
  { value: '/ip-ua', labels: { ko: 'IP / User-Agent', en: 'IP / User-Agent' } },
  { value: '/ip-cidr', labels: { ko: 'CIDR 계산기', en: 'CIDR Calculator' } },
  { value: '/text-stats', labels: { ko: '텍스트 통계', en: 'Text Stats' } },
  { value: '/pdf-toolkit', labels: { ko: 'PDF 병합/분할', en: 'PDF Merge/Split' } },
  { value: '/image-optimize', labels: { ko: '이미지 최적화', en: 'Image Optimizer' } },
  { value: '/ocr', labels: { ko: 'OCR 텍스트 추출', en: 'OCR Extractor' } },
  { value: '/seo-check', labels: { ko: 'SEO 메타 태그 검사', en: 'SEO Meta Check' } },
  { value: '/text-cleaner', labels: { ko: '텍스트 정리기', en: 'Text Cleaner' } },
  { value: '/api-tester', labels: { ko: 'API 요청 테스트', en: 'API Request Tester' } },
];
