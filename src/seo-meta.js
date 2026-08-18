// ponytail: 기본값을 커스텀 도메인으로 두면 Pages 빌드 환경변수를 설정할 필요가 없다.
// SITE_ORIGIN / VITE_SITE_ORIGIN으로 여전히 덮어쓸 수 있다.
const DEFAULT_SITE_ORIGIN = 'https://taxijjang.com';

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
  'ai-tools': {
    path: '/ai-tools',
    kind: 'content',
    title: 'AI 코딩 치트시트 | Claude Code, Codex 최신 명령 모음',
    description:
      'Claude Code와 Codex를 빠르게 다시 쓰기 위한 최신 명령, 워크플로, GitHub skills 탐색 링크, 공식 문서 링크를 묶은 AI 코딩 치트시트 허브입니다.',
  },
  'claude-code-cheatsheet': {
    path: '/claude-code-cheatsheet',
    kind: 'content',
    title: 'Claude Code 치트시트 | Commands, Skills, MCP, Hooks',
    description:
      'Claude Code commands, skills, MCP, hooks, run/verify, code review, routines까지 한 페이지에서 검색하고 공식 문서로 이동하는 치트시트입니다.',
  },
  'codex-cheatsheet': {
    path: '/codex-cheatsheet',
    kind: 'content',
    title: 'Codex 치트시트 | CLI, Slash Commands, Skills, MCP',
    description:
      'Codex CLI, 앱, slash commands, AGENTS.md, Skills, MCP, Automations, worktree 설정 포인트를 빠르게 정리한 최신 치트시트입니다.',
  },
  'uuid-v4-v7': {
    path: '/uuid-v4-v7',
    kind: 'content',
    title: 'UUID v4 vs v7 가이드 | 언제 어떤 UUID를 써야 할까',
    description:
      'UUID v4와 UUID v7의 차이, 정렬 특성, 데이터베이스 저장 전략, 운영 중 선택 기준을 정리한 실무 가이드입니다.',
  },
  'jwt-exp-nbf': {
    path: '/jwt-exp-nbf',
    kind: 'content',
    title: 'JWT exp nbf 가이드 | 만료 시간과 not before 읽는 법',
    description:
      'JWT exp, nbf, iat 클레임을 어떻게 해석해야 하는지와 clock skew, 검증 흐름, 운영 중 자주 생기는 실수를 정리했습니다.',
  },
  'base64-vs-url-encoding': {
    path: '/base64-vs-url-encoding',
    kind: 'content',
    title: 'Base64 vs URL 인코딩 가이드 | 언제 어떤 인코딩을 써야 할까',
    description:
      'Base64와 URL 인코딩의 차이, URL-safe 처리, 디버깅 포인트, 실제 사용 흐름을 비교한 브라우저 기반 실무 가이드입니다.',
  },
  'pdf-merge-split-guide': {
    path: '/pdf-merge-split-guide',
    kind: 'content',
    title: 'PDF 병합/분할 가이드 | 언제 합치고 언제 나눠야 할까',
    description:
      'PDF 병합, 분할, 범위 추출, 워터마크, 텍스트 추출을 언제 어떻게 쓰는지와 브라우저 처리의 한계를 정리한 가이드입니다.',
  },
  index: {
    path: '/',
    kind: 'home',
    title: '개발자 도구 런처 | UUID, JSON, Base64, PDF, SEO',
    description:
      'UUID, JSON, Base64, JWT, PDF, 이미지, SEO 등 자주 쓰는 브라우저 기반 개발자 도구를 검색하고 바로 실행하세요.',
  },
  learn: {
    path: '/learn',
    kind: 'content',
    title: '개발자 유틸 가이드 | UUID, JWT, Base64',
    description:
      'UUID, JWT, Base64, URL 인코딩, PDF 작업처럼 자주 쓰는 개발자 유틸을 개별 가이드로 정리한 허브 페이지입니다.',
  },
  about: {
    path: '/about',
    kind: 'content',
    title: '사이트 소개 | Stateless Tools 운영 원칙과 브라우저 도구 모음',
    description:
      'Stateless Tools를 만든 이유, 대상 사용자, 브라우저 우선 처리 원칙, 운영자와 공개 피드백 경로를 정리한 소개 페이지입니다.',
  },
  privacy: {
    path: '/privacy',
    kind: 'content',
    title: '개인정보 처리 안내 | 브라우저 처리, 분석, 광고 정책',
    description:
      'Stateless Tools의 브라우저 내부 처리, localStorage 저장, Google Analytics, AdSense, 외부 라이브러리 사용 방식을 정리한 개인정보 안내입니다.',
  },
  contact: {
    path: '/contact',
    kind: 'content',
    title: '문의 안내 | 오류 제보, 기능 요청, 피드백 경로',
    description:
      'Stateless Tools의 오류 제보, 기능 요청, 사용 경험 피드백을 보낼 수 있는 GitHub Issue와 공개 연락 경로를 안내합니다.',
  },
  uuid: {
    path: '/uuid',
    kind: 'tool',
    title: 'UUID 변환기 | UUID 생성기, UUID v4, ULID, Hex 변환',
    description:
      'UUID v4와 ULID를 생성하고 UUID를 hex(binary16)으로 변환하거나 다시 UUID로 복구할 수 있는 브라우저 도구입니다.',
    applicationCategory: 'DeveloperApplication',
    faq: [
      {
        question: 'UUID hex(binary16)은 왜 사용하나요?',
        answer:
          'UUID 문자열에서 하이픈을 제거한 32자리 16진수 형태로, 일부 데이터베이스의 binary 컬럼 저장이나 레거시 데이터 비교에 유용합니다.',
      },
      {
        question: 'UUID v4와 UUID v7 중 어떤 것을 선택해야 하나요?',
        answer:
          '일반적인 무작위 식별자는 UUID v4가 단순하고, 생성 순서나 시간 정렬이 중요하면 UUID v7이 더 적합합니다.',
      },
      {
        question: 'UUID 변환 값이 서버로 전송되나요?',
        answer:
          '이 도구의 UUID 생성과 형식 변환은 브라우저 안에서 처리되며 입력값을 별도 서버로 업로드하지 않습니다.',
      },
    ],
  },
  base64: {
    path: '/base64',
    kind: 'tool',
    title: 'Base64 인코더/디코더 | Base64 변환, URL-safe, 파일 인코딩',
    description:
      '문자열과 파일을 Base64로 인코딩하거나 디코딩하고, URL-safe와 공백 정리 옵션까지 브라우저에서 처리할 수 있습니다.',
    applicationCategory: 'UtilitiesApplication',
    faq: [
      {
        question: 'Base64는 암호화인가요?',
        answer:
          '아니요. Base64는 데이터를 다른 문자 표현으로 바꾸는 인코딩일 뿐이며 누구나 다시 디코딩할 수 있습니다.',
      },
      {
        question: 'Base64 결과가 원본보다 길어지는 이유는 무엇인가요?',
        answer:
          'Base64는 3바이트를 4개의 출력 문자로 표현하므로 일반적으로 원본보다 약 33% 정도 길어집니다.',
      },
      {
        question: 'URL-safe Base64는 언제 쓰나요?',
        answer:
          'Base64 값을 URL 파라미터, 콜백 URL, 짧은 토큰처럼 URL 안에서 전달해야 할 때 예약 문자를 피하기 위해 사용합니다.',
      },
    ],
  },
  json: {
    path: '/json',
    kind: 'tool',
    title: 'JSON 포매터/검증기 | Formatter, Validator, Tree View',
    description:
      'JSON 유효성 검사, 포맷/압축, 키 검색, 트리 뷰 확인까지 한 번에 할 수 있는 브라우저 도구입니다.',
    applicationCategory: 'DeveloperApplication',
    faq: [
      {
        question: 'JSON 포매터는 어떤 오류를 가장 자주 잡아주나요?',
        answer:
          '누락된 큰따옴표, 마지막 쉼표, 잘못된 괄호, 문자열 안의 이스케이프 오류처럼 표준 JSON 파서가 거부하는 문법 문제를 빠르게 확인할 수 있습니다.',
      },
      {
        question: 'JSON 포맷과 압축은 언제 각각 사용하나요?',
        answer:
          '사람이 읽고 검토할 때는 포맷을 사용하고, 전송 크기를 줄이거나 한 줄 payload가 필요할 때는 압축을 사용합니다.',
      },
      {
        question: '붙여넣은 JSON이 서버로 전송되나요?',
        answer:
          'JSON 검증과 포맷팅은 브라우저 메모리에서 수행되며 입력값을 별도 서버로 업로드하지 않습니다.',
      },
    ],
  },
  jwt: {
    path: '/jwt',
    kind: 'tool',
    title: 'JWT 디코더/검사기 | Decoder, Claims, Expiry, JWKS',
    description:
      'JWT 헤더와 페이로드를 디코딩하고 exp, nbf, claims를 확인할 수 있는 브라우저용 JWT 검사 도구입니다.',
    applicationCategory: 'DeveloperApplication',
    faq: [
      {
        question: 'JWT 디코딩만으로 토큰을 신뢰할 수 있나요?',
        answer:
          '아니요. 디코딩은 내용을 읽는 단계이고, 토큰을 신뢰하려면 issuer와 audience 확인 및 서명 검증이 필요합니다.',
      },
      {
        question: 'JWT exp와 nbf는 무엇인가요?',
        answer:
          'exp는 만료 시간, nbf는 not before 시간을 의미합니다. 두 값은 보통 Unix timestamp라서 서버 시간 차이와 함께 확인해야 합니다.',
      },
      {
        question: 'JWT payload에 민감한 정보를 넣어도 되나요?',
        answer:
          'JWT payload는 Base64URL로 인코딩되어 쉽게 읽을 수 있으므로 비밀값이나 민감한 개인정보를 담는 구조는 피하는 것이 좋습니다.',
      },
    ],
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
    title: '글자수 세기 | 공백 포함·제외, 단어·문장·원고지 분량',
    description:
      '자기소개서·리포트 글자수 제한을 맞출 때 쓰는 글자수 세기입니다. 공백 포함/제외 글자수, 단어·문장·문단 수, 원고지 분량, 바이트를 입력하는 즉시 계산합니다.',
    applicationCategory: 'UtilitiesApplication',
  },
  'seo-check': {
    path: '/seo-check',
    kind: 'tool',
    title: 'SEO 메타 태그 검사기 | Title, Description, OG, Canonical',
    description:
      '페이지 제목, 설명, Open Graph, canonical 태그를 점검해 자주 놓치는 SEO 문제를 빠르게 확인할 수 있습니다.',
    applicationCategory: 'DeveloperApplication',
    faq: [
      {
        question: 'SEO 메타 태그 검사기는 외부 URL을 항상 읽을 수 있나요?',
        answer:
          '아니요. 브라우저에서 직접 요청하기 때문에 상대 사이트의 CORS 정책에 막힐 수 있으며, 이 경우 HTML 소스를 붙여넣어 점검하는 방식이 더 안정적입니다.',
      },
      {
        question: 'title과 description만 고치면 검색 순위가 오르나요?',
        answer:
          '기본 신호를 정리하는 데 도움이 되지만, 실제 검색 성과는 본문 품질, 검색 의도 충족, 내부 링크, 사이트 신뢰도까지 함께 영향을 받습니다.',
      },
      {
        question: 'SEO 점검에서 가장 먼저 볼 항목은 무엇인가요?',
        answer:
          '비어 있는 title과 description, 잘못된 canonical, accidental noindex, OG 태그 누락처럼 기본 노출과 공유 품질에 영향을 주는 항목부터 확인하는 것이 좋습니다.',
      },
    ],
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
};

export const FEATURED_TOOL_PATHS = [
  '/uuid',
  '/base64',
  '/json',
  '/jwt',
  '/seo-check',
  '/url',
  '/password',
  '/timestamp',
  '/api-tester',
];
