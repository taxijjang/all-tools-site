export const HOME_FILTERS = [
  {
    key: 'all',
    labels: {
      ko: '전체',
      en: 'All tools',
    },
  },
  {
    key: 'api',
    labels: {
      ko: 'API · 데이터',
      en: 'API & Data',
    },
  },
  {
    key: 'ai',
    labels: {
      ko: 'AI 명령어',
      en: 'AI Commands',
    },
  },
  {
    key: 'text',
    labels: {
      ko: '텍스트 · 콘텐츠',
      en: 'Text & Content',
    },
  },
  {
    key: 'file',
    labels: {
      ko: '파일 · 이미지',
      en: 'Files & Media',
    },
  },
  {
    key: 'ops',
    labels: {
      ko: '운영 · 유틸',
      en: 'Ops & Utility',
    },
  },
];

export const TOOL_CATEGORY_MAP = {
  '/ai-tools': 'ai',
  '/claude-code-cheatsheet': 'ai',
  '/codex-cheatsheet': 'ai',
  '/uuid': 'api',
  '/base64': 'api',
  '/json': 'api',
  '/jwt': 'api',
  '/url': 'api',
  '/json-yaml': 'api',
  '/api-tester': 'api',
  '/ip-ua': 'ops',
  '/ip-cidr': 'ops',
  '/cron': 'ops',
  '/timestamp': 'ops',
  '/hash': 'ops',
  '/password': 'ops',
  '/convert': 'ops',
  '/seo-check': 'ops',
  '/utm-builder': 'ops',
  '/color': 'ops',
  '/regex': 'text',
  '/diff': 'text',
  '/markdown': 'text',
  '/case-convert': 'text',
  '/text-cleaner': 'text',
  '/text-stats': 'text',
  '/pdf-toolkit': 'file',
  '/image-optimize': 'file',
  '/image-base64': 'file',
  '/ocr': 'file',
  '/qr': 'file',
  '/file-hash': 'file',
};

export const HOME_SEARCH_KEYWORDS = {
  '/ai-tools': 'ai coding assistant command cheatsheet claude codex slash prompt mcp hooks skills',
  '/claude-code-cheatsheet':
    'claude code claude-code commands compact clear context run verify code review background agents mcp hooks skills claude md anthropic',
  '/codex-cheatsheet':
    'codex openai cli slash commands permissions sandbox approval agents md skills mcp automations worktree exec doctor',
  '/uuid': 'uuid guid random v4 ulid binary16 hex request id trace id correlation id db primary key',
  '/base64': 'base64 b64 encode decode url safe data url atob btoa binary file token payload',
  '/json': 'json formatter validator pretty print minify parse tree api response payload config log',
  '/jwt': 'jwt decoder token claims exp nbf iat jwks verify bearer oidc oauth base64url',
  '/url': 'url encode decode percent encoding query string uri component escape unescape',
  '/hash': 'sha sha256 sha512 digest checksum hash hmac integrity',
  '/cron': 'cron crontab schedule parser next run linux job expression',
  '/timestamp': 'unix epoch timestamp date timezone iso utc milliseconds seconds',
  '/password': 'password generator random secure passphrase entropy',
  '/regex': 'regex regexp regular expression tester match replace flags pattern',
  '/qr': 'qr qrcode generator scanner wifi scan image',
  '/diff': 'diff compare text patch changed lines',
  '/color': 'color hex rgb hsl contrast wcag palette',
  '/markdown': 'markdown md preview html render readme',
  '/convert': 'unit converter length weight temperature',
  '/file-hash': 'file hash sha256 checksum integrity download verify',
  '/image-base64': 'image base64 data url encode decode png jpg webp svg',
  '/case-convert': 'case convert camel snake kebab pascal title slug',
  '/json-yaml': 'json yaml yml convert csv config kubernetes',
  '/ip-ua': 'ip user agent ua browser locale timezone',
  '/ip-cidr': 'cidr ip subnet netmask broadcast host range ipv4',
  '/text-stats': 'text stats count words characters lines reading time',
  '/pdf-toolkit': 'pdf merge split extract watermark metadata text',
  '/image-optimize': 'image optimize compress resize webp jpeg png quality',
  '/ocr': 'ocr text extract image screenshot scan korean english tesseract',
  '/seo-check': 'seo meta title description canonical og robots json ld search console adsense',
  '/utm-builder': 'utm campaign source medium url analytics tracking',
  '/text-cleaner': 'text cleaner dedupe trim whitespace sort slugify normalize',
  '/api-tester': 'api tester http request curl fetch rest headers json response',
};

export const FILE_PICKER_META = {
  'base64:fileInput': {
    hint: {
      ko: '로컬 파일을 끌어다 놓으면 바로 Base64 문자열로 바꿉니다.',
      en: 'Drop a local file to turn it into a copyable Base64 string right away.',
    },
    chips: ['ANY', 'BASE64'],
  },
  'file-hash:fhFile': {
    hint: {
      ko: '브라우저 안에서만 SHA 해시를 계산하므로 서버 업로드 없이 바로 확인할 수 있습니다.',
      en: 'Compute a SHA hash in the browser without uploading the file to a server.',
    },
    chips: ['ANY', 'SHA'],
  },
  'image-base64:ibFile': {
    hint: {
      ko: 'PNG, JPG, WEBP, SVG 이미지를 data URL로 바꾸거나 다시 파일로 저장할 수 있습니다.',
      en: 'Use PNG, JPG, WEBP, or SVG files and turn them into data URLs or back into files.',
    },
    chips: ['PNG', 'JPG', 'WEBP', 'SVG'],
  },
  'image-optimize:imgOptFile': {
    hint: {
      ko: '이미지를 올린 뒤 너비, 품질, 출력 포맷을 조절해 바로 최적화하세요.',
      en: 'Upload an image, then tune width, quality, and output format before optimizing.',
    },
    chips: ['PNG', 'JPG', 'WEBP', 'SVG'],
  },
  'ocr:ocrFile': {
    hint: {
      ko: '스크린샷이나 스캔 이미지를 올려 한국어와 영어 텍스트를 추출하세요.',
      en: 'Drop a screenshot or scan to extract Korean and English text.',
    },
    chips: ['PNG', 'JPG', 'WEBP', 'OCR'],
  },
  'qr:qrScanFile': {
    hint: {
      ko: 'QR 코드가 들어 있는 이미지 파일을 올리면 브라우저에서 바로 스캔합니다.',
      en: 'Drop an image that contains a QR code and scan it directly in the browser.',
    },
    chips: ['PNG', 'JPG', 'WEBP', 'QR'],
  },
};

export const HOME_DISCOVERY_COPY = {
  ko: {
    kicker: 'Tool Search',
    heading: '필요한 도구만 빠르게 찾기',
    lead: '키워드를 입력하거나 카테고리를 고르면 바로 쓸 도구만 남습니다.',
    spotlightKicker: 'Start Here',
    spotlightHeading: '많이 여는 조합을 먼저 보여드립니다',
    spotlightLead: '자주 이어서 쓰는 도구를 작업 흐름별로 묶어 뒀습니다. 급하면 여기서 바로 들어가면 됩니다.',
    searchPlaceholder: 'json jwt uuid pdf regex seo',
    searchLabel: '도구 검색',
    catalogKicker: 'Tool Catalog',
    catalogHeading: '도구 전체',
    catalogLink: '가이드',
    workflowEyebrow: 'Workflow',
    resultsAll: '전체 {count}개',
    resultsFiltered: '{filter} {count}개',
    resultsSearch: '"{query}" {count}개',
    resultsMixed: '{filter} 안에서 "{query}" {count}개',
    resultsEmpty: '맞는 도구가 없습니다. 다른 키워드로 찾아보세요.',
  },
  en: {
    kicker: 'Tool Search',
    heading: 'Find the tool you need',
    lead: 'Search by keyword or choose a category to narrow the catalog quickly.',
    spotlightKicker: 'Start Here',
    spotlightHeading: 'Open the combinations people reach for most',
    spotlightLead: 'These clusters bundle the tools that are commonly used back-to-back, so you can move faster without scanning the full catalog first.',
    searchPlaceholder: 'json jwt uuid pdf regex seo',
    searchLabel: 'Search tools',
    catalogKicker: 'Tool Catalog',
    catalogHeading: 'All tools',
    catalogLink: 'Guides',
    workflowEyebrow: 'Workflow',
    resultsAll: 'All {count}',
    resultsFiltered: '{count} in {filter}',
    resultsSearch: '{count} for "{query}"',
    resultsMixed: '{count} for "{query}" in {filter}',
    resultsEmpty: 'No matching tools. Try another keyword.',
  },
};

export const HOME_WORKFLOWS = [
  {
    labels: {
      ko: {
        title: 'API 응답 빠르게 뜯어보기',
        description: 'JSON 구조 확인부터 토큰 점검, 재현 요청까지 한 흐름으로 이어집니다.',
      },
      en: {
        title: 'Debug API payloads fast',
        description: 'Move from JSON structure checks to token inspection and reproducible requests in one flow.',
      },
    },
    links: [
      {
        href: '/json',
        labels: { ko: 'JSON 포매터', en: 'Open JSON Formatter' },
      },
      {
        href: '/jwt',
        labels: { ko: 'JWT 디코더', en: 'Open JWT Decoder' },
      },
      {
        href: '/api-tester',
        labels: { ko: 'API 요청 테스트', en: 'Open API Request Tester' },
      },
    ],
  },
  {
    labels: {
      ko: {
        title: '인코딩과 링크 문제 정리',
        description: 'Base64, URL, 쿼리 문자열을 한 번에 점검할 때 가장 빠른 조합입니다.',
      },
      en: {
        title: 'Untangle encodings and links',
        description: 'The fastest path when Base64, URL encoding, and query strings are all involved.',
      },
    },
    links: [
      {
        href: '/base64',
        labels: { ko: 'Base64 변환기', en: 'Base64 Tool' },
      },
      {
        href: '/url',
        labels: { ko: 'URL', en: 'URL' },
      },
    ],
  },
  {
    labels: {
      ko: {
        title: '파일과 이미지 전처리',
        description: 'PDF, 이미지 최적화, OCR 같은 업로드 전 작업을 브라우저 안에서 끝낼 수 있습니다.',
      },
      en: {
        title: 'Prep files and images',
        description: 'Handle PDF cleanup, image optimization, and OCR work without leaving the browser.',
      },
    },
    links: [
      {
        href: '/pdf-toolkit',
        labels: { ko: 'PDF 병합/분할', en: 'PDF Merge/Split' },
      },
      {
        href: '/image-optimize',
        labels: { ko: '이미지 최적화', en: 'Image Optimize' },
      },
      {
        href: '/ocr',
        labels: { ko: 'OCR', en: 'OCR' },
      },
    ],
  },
  {
    labels: {
      ko: {
        title: '텍스트 정리와 패턴 테스트',
        description: '정규식 확인, 대량 정리, 마크다운 점검처럼 읽고 쓰는 작업을 빠르게 묶어줍니다.',
      },
      en: {
        title: 'Clean text and test patterns',
        description: 'A fast cluster for regex checks, bulk text cleanup, and Markdown review.',
      },
    },
    links: [
      {
        href: '/regex',
        labels: { ko: '정규식 테스트기', en: 'Regex Tester' },
      },
      {
        href: '/text-cleaner',
        labels: { ko: '텍스트 정리', en: 'Text Cleaner' },
      },
      {
        href: '/markdown',
        labels: { ko: 'Markdown', en: 'Markdown' },
      },
    ],
  },
];

export const HOME_SPOTLIGHTS = [
  {
    labels: {
      ko: {
        eyebrow: 'API',
        title: '응답과 토큰을 빠르게 확인할 때',
        description: 'JSON 구조 확인부터 JWT 해석, 재현 가능한 요청 테스트까지 한 번에 이어집니다.',
      },
      en: {
        eyebrow: 'API',
        title: 'Inspect payloads and tokens fast',
        description: 'Move from JSON structure checks to JWT inspection and reproducible request tests in one pass.',
      },
    },
    links: [
      {
        href: '/json',
        labels: { ko: 'JSON 포매터', en: 'Open JSON Formatter' },
      },
      {
        href: '/jwt',
        labels: { ko: 'JWT 디코더', en: 'Open JWT Decoder' },
      },
      {
        href: '/api-tester',
        labels: { ko: 'API 요청 테스트', en: 'Open API Request Tester' },
      },
      {
        href: '/seo-check',
        labels: { ko: 'SEO 메타 태그 검사', en: 'Check meta tags' },
      },
    ],
  },
  {
    labels: {
      ko: {
        eyebrow: 'Encode',
        title: '문자열과 링크를 빨리 정리할 때',
        description: 'Base64, URL 인코딩, 쿼리 스트링, 정규식을 한 흐름으로 묶었습니다.',
      },
      en: {
        eyebrow: 'Encode',
        title: 'Clean up strings and links',
        description: 'Bundle Base64, URL encoding, query strings, and regex checks into one quick lane.',
      },
    },
    links: [
      {
        href: '/base64',
        labels: { ko: 'Base64 변환기', en: 'Base64 Tool' },
      },
      {
        href: '/url',
        labels: { ko: 'URL', en: 'URL' },
      },
      {
        href: '/regex',
        labels: { ko: '정규식 테스트기', en: 'Regex Tester' },
      },
    ],
  },
  {
    labels: {
      ko: {
        eyebrow: 'Files',
        title: '파일 작업을 브라우저 안에서 끝낼 때',
        description: 'PDF, 이미지 최적화, OCR, QR 스캔처럼 무거운 작업을 바로 이어서 처리할 수 있습니다.',
      },
      en: {
        eyebrow: 'Files',
        title: 'Finish file work inside the browser',
        description: 'Handle PDFs, image optimization, OCR, and QR scanning without hopping between tools.',
      },
    },
    links: [
      {
        href: '/pdf-toolkit',
        labels: { ko: 'PDF 병합/분할', en: 'PDF Merge/Split' },
      },
      {
        href: '/image-optimize',
        labels: { ko: '이미지 최적화', en: 'Image Optimize' },
      },
      {
        href: '/ocr',
        labels: { ko: 'OCR 텍스트 추출', en: 'OCR Extractor' },
      },
      {
        href: '/qr',
        labels: { ko: 'QR 코드 생성기', en: 'QR Code Tool' },
      },
    ],
  },
];

export const QUICK_START_META = {
  uuid: {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '추적 ID를 만들거나 저장 형식을 비교할 때 가장 먼저 쓰는 흐름',
        lead: '새 UUID를 만들고, 샘플 값을 hex(binary16)으로 바꾸고, 정렬 가능한 UUID v7까지 바로 이어서 볼 수 있습니다.',
        checks: ['요청 추적용 식별자 생성', 'binary(16) 저장 형식 비교', '32자리 레거시 hex 복구'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'The fastest path for tracing IDs and storage-format checks',
        lead: 'Generate a fresh UUID, convert a sample into hex(binary16), and jump straight to UUID v7 when ordering matters.',
        checks: ['Generate a tracing ID', 'Compare binary(16) storage formats', 'Recover 32-char legacy hex'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'uuid-generate',
        labels: {
          ko: '새 UUID 만들기',
          en: 'Generate UUID',
        },
      },
      {
        kind: 'action',
        key: 'uuid-sample-hex',
        labels: {
          ko: '샘플 UUID → hex',
          en: 'Sample UUID → hex',
        },
      },
    ],
  },
  base64: {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '인코딩 값이 문제인지, 전송 경로가 문제인지 바로 구분해보세요',
        lead: '샘플 텍스트를 바로 인코딩하거나 URL-safe Base64를 복구해서 값 자체가 깨졌는지 먼저 확인할 수 있습니다.',
        checks: ['텍스트를 바로 Base64로 변환', 'URL-safe 값 복구 테스트', '전송 길이 증가 전 빠른 점검'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'Separate encoding problems from transport problems quickly',
        lead: 'Encode a sample string right away or decode a URL-safe value to see whether the issue lives in the value itself.',
        checks: ['Convert text to Base64', 'Decode a URL-safe sample', 'Check transport overhead early'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'base64-sample-encode',
        labels: {
          ko: '샘플 텍스트 인코딩',
          en: 'Encode sample text',
        },
      },
      {
        kind: 'action',
        key: 'base64-sample-decode',
        labels: {
          ko: '샘플 Base64 디코딩',
          en: 'Decode sample Base64',
        },
      },
      {
        kind: 'link',
        href: '/url',
        labels: {
          ko: 'URL 인코더 열기',
          en: 'Open URL tool',
        },
      },
    ],
  },
  json: {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '압축된 응답을 붙여 넣고 구조를 파악하는 가장 빠른 시작점',
        lead: '샘플 JSON을 바로 불러오거나, 지금 입력한 값을 즉시 포맷해서 읽을 수 있는 상태부터 만들 수 있습니다.',
        checks: ['샘플 응답 구조 보기', '현재 입력 즉시 포맷', 'JSON ↔ YAML 흐름으로 넘기기'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'The fastest start for compressed payloads and nested responses',
        lead: 'Load a sample payload or pretty-print the current input immediately so the structure becomes readable first.',
        checks: ['Inspect a sample response', 'Format current input instantly', 'Hand off to JSON ↔ YAML next'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'json-sample',
        labels: {
          ko: '샘플 JSON 불러오기',
          en: 'Load sample JSON',
        },
      },
      {
        kind: 'action',
        key: 'json-format',
        labels: {
          ko: '현재 입력 포맷',
          en: 'Format current input',
        },
      },
      {
        kind: 'link',
        href: '/json-yaml',
        labels: {
          ko: 'JSON ↔ YAML 열기',
          en: 'Open JSON ↔ YAML',
        },
      },
    ],
  },
  jwt: {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '토큰 구조와 만료 시간을 10초 안에 확인하는 흐름',
        lead: '샘플 JWT를 넣어 구조를 익히고, 현재 토큰을 바로 디코드해서 헤더와 클레임 문제를 먼저 볼 수 있습니다.',
        checks: ['샘플 토큰 구조 익히기', '현재 토큰 즉시 디코드', 'JSON 포매터로 세부 필드 비교'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'A 10-second flow for structure and expiry checks',
        lead: 'Load a sample token to learn the layout, then decode the current token immediately to inspect headers and claims.',
        checks: ['Learn from a sample token', 'Decode the current token', 'Compare details in JSON Formatter'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'jwt-sample',
        labels: {
          ko: '샘플 JWT 불러오기',
          en: 'Load sample JWT',
        },
      },
      {
        kind: 'action',
        key: 'jwt-decode',
        labels: {
          ko: '현재 토큰 디코드',
          en: 'Decode current token',
        },
      },
      {
        kind: 'link',
        href: '/json',
        labels: {
          ko: 'JSON 포매터 열기',
          en: 'Open JSON Formatter',
        },
      },
    ],
  },
  'seo-check': {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '메타 태그 상태를 샘플로 익히고 실제 HTML로 바로 비교하세요',
        lead: '샘플 HTML을 불러온 뒤 결과 형식을 익히고, 실제 페이지 소스를 붙여 넣어 누락된 title, description, canonical, OG 태그를 빠르게 확인할 수 있습니다.',
        checks: ['샘플 HTML로 결과 형식 확인', 'paste한 소스의 누락 태그 점검', 'URL fetch가 막힐 때 HTML 소스로 우회'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'Learn the output on a sample, then compare it with real HTML',
        lead: 'Load a sample document first, then paste real markup to catch missing title, description, canonical, and OG tags quickly.',
        checks: ['Inspect the result format on a sample', 'Check pasted markup for missing tags', 'Use raw HTML when URL fetch is blocked'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'seo-load-sample',
        labels: {
          ko: '샘플 HTML 넣기',
          en: 'Load sample HTML',
        },
      },
      {
        kind: 'action',
        key: 'seo-run-sample',
        labels: {
          ko: '바로 점검 실행',
          en: 'Run sample audit',
        },
      },
      {
        kind: 'link',
        href: '/utm-builder',
        labels: {
          ko: 'UTM 생성기 열기',
          en: 'Open UTM Generator',
        },
      },
    ],
  },
  regex: {
    copy: {
      ko: {
        kicker: 'Quick Start',
        title: '패턴이 실제로 어디를 잡는지 눈으로 확인하는 시작점',
        lead: '샘플 패턴을 먼저 불러오고, 현재 입력으로 바로 테스트해서 매치 범위를 확인한 뒤 정리 도구로 이어갈 수 있습니다.',
        checks: ['샘플 패턴 즉시 확인', '현재 입력으로 바로 테스트', '텍스트 정리 도구와 함께 사용'],
      },
      en: {
        kicker: 'Quick Start',
        title: 'Start by seeing exactly what your pattern is catching',
        lead: 'Load the sample first, run the current pattern immediately, then continue into cleanup tools if you need replacements next.',
        checks: ['Inspect a working sample', 'Run the current pattern now', 'Pair with text cleanup next'],
      },
    },
    actions: [
      {
        kind: 'action',
        key: 'regex-sample',
        labels: {
          ko: '샘플 패턴 불러오기',
          en: 'Load sample pattern',
        },
      },
      {
        kind: 'action',
        key: 'regex-test',
        labels: {
          ko: '현재 패턴 테스트',
          en: 'Run current pattern',
        },
      },
      {
        kind: 'link',
        href: '/text-cleaner',
        labels: {
          ko: '텍스트 정리 열기',
          en: 'Open Text Cleaner',
        },
      },
    ],
  },
};
