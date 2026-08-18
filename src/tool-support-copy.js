export const TOOL_SUPPORT_COPY = {
  '/cron': {
    ko: {
      heading: 'Cron 표현식 파서 실무 활용',
      lead: '서버 배치, 워커 스케줄, 알림 작업의 실행 주기를 배포 전에 읽을 수 있는 문장과 다음 실행 시각으로 확인합니다.',
      cards: [
        {
          title: '배포 전 스케줄 검산',
          body: '*/15 * * * * 같은 표현식이 의도한 간격으로 동작하는지 먼저 확인해 야간 배치나 정산 작업의 오실행을 줄입니다.',
        },
        {
          title: '운영자와 공유하기 쉬운 설명',
          body: '크론 문법에 익숙하지 않은 사람도 이해할 수 있도록 표현식을 자연어 설명과 다음 실행 목록으로 함께 봅니다.',
        },
        {
          title: '브라우저 안 계산',
          body: '입력한 표현식은 현재 브라우저에서 해석하며, 스케줄 문자열을 별도 서버에 저장하거나 전송하지 않습니다.',
        },
      ],
      steps: [
        '5필드 cron 표현식을 입력하고 해석 결과가 의도한 주기와 맞는지 확인합니다.',
        '다음 실행 시간 5개를 보면서 시작 시각, 반복 간격, 월말 또는 주말 실행 여부를 검산합니다.',
        '서버의 실제 타임존과 브라우저 타임존이 다르면 운영 환경 기준으로 한 번 더 비교합니다.',
        '배포 설정이나 문서에 붙여 넣기 전에 공백과 필드 개수가 맞는지 확인합니다.',
      ],
      notes: [
        {
          title: '요일과 일자 필드',
          body: 'day-of-month와 day-of-week를 동시에 쓰면 라이브러리나 시스템별 해석 차이가 생길 수 있으므로 중요한 배치는 실제 런타임 문서와 함께 확인하세요.',
        },
        {
          title: '초 필드 지원 여부',
          body: '일부 스케줄러는 초 단위 필드를 지원하지만 전통적인 crontab은 5필드를 사용합니다. 실행 환경이 요구하는 형식을 기준으로 맞춰야 합니다.',
        },
      ],
    },
    en: {
      heading: 'Practical cron expression checks',
      lead: 'Check server jobs, worker schedules, and alert timing as readable text plus upcoming run times before deploying them.',
      cards: [
        {
          title: 'Validate schedules before release',
          body: 'Confirm that expressions such as */15 * * * * match the intended interval before they reach production jobs.',
        },
        {
          title: 'Share readable timing',
          body: 'Pair the raw expression with a human-readable explanation so teammates can review the schedule without memorizing cron syntax.',
        },
        {
          title: 'Runs in the browser',
          body: 'The expression is parsed locally in your browser and is not stored or sent to a separate server by this tool.',
        },
      ],
      steps: [
        'Paste a 5-field cron expression and compare the explanation with the intended cadence.',
        'Review the next five run times for start time, interval, month-end behavior, and weekend behavior.',
        'Compare browser timezone with the timezone used by the actual server or scheduler.',
        'Check spacing and field count before copying the expression into deployment config or documentation.',
      ],
      notes: [
        {
          title: 'Day fields can differ',
          body: 'Schedulers can interpret day-of-month and day-of-week combinations differently, so verify critical jobs against the target runtime.',
        },
        {
          title: 'Seconds are runtime-specific',
          body: 'Some systems support a seconds field, while traditional crontab uses five fields. Match the format expected by your scheduler.',
        },
      ],
    },
  },
  '/qr': {
    ko: {
      heading: 'QR 코드 생성과 스캔 기준',
      lead: 'URL, 짧은 문구, Wi-Fi 접속 정보를 QR로 만들고, 이미지 속 QR을 브라우저에서 바로 읽어 링크나 설정값을 확인합니다.',
      cards: [
        {
          title: '공유용 링크 제작',
          body: '긴 URL이나 Wi-Fi 정보를 QR로 바꿔 모바일 테스트, 오프라인 안내문, 내부 문서에 붙이기 좋게 만듭니다.',
        },
        {
          title: '이미지 QR 확인',
          body: '스크린샷이나 전달받은 QR 이미지를 업로드해 실제로 어떤 텍스트가 들어 있는지 열기 전에 확인할 수 있습니다.',
        },
        {
          title: '로컬 처리',
          body: 'QR 생성과 이미지 스캔은 브라우저에서 처리되며, 업로드한 이미지를 별도 서버로 전송하지 않습니다.',
        },
      ],
      steps: [
        '텍스트, URL, Wi-Fi 정보 중 만들려는 QR 유형을 고릅니다.',
        '스캔될 값을 입력한 뒤 QR 이미지가 정상적으로 생성되는지 확인합니다.',
        '필요하면 PNG로 저장하거나 다른 기기 카메라로 한 번 더 스캔합니다.',
        '이미지 QR을 읽을 때는 선명한 원본을 사용하고 결과 문자열을 열기 전에 확인합니다.',
      ],
      notes: [
        {
          title: '너무 긴 데이터',
          body: 'QR에 넣는 문자열이 길수록 코드가 복잡해지고 작은 인쇄물에서 스캔 실패가 늘어납니다. 긴 링크는 짧게 정리하는 편이 안정적입니다.',
        },
        {
          title: 'Wi-Fi QR 검토',
          body: '공유 전 SSID, 암호화 방식, 비밀번호를 다시 확인하세요. 공개 장소에 붙이는 QR에는 민감한 네트워크 정보를 넣지 않는 것이 좋습니다.',
        },
      ],
    },
    en: {
      heading: 'QR generation and scanning checks',
      lead: 'Create QR codes for URLs, short text, and Wi-Fi details, then decode QR images in the browser before opening or sharing them.',
      cards: [
        {
          title: 'Prepare shareable links',
          body: 'Turn long URLs or Wi-Fi settings into QR images for mobile testing, printed notes, and internal documents.',
        },
        {
          title: 'Inspect QR images',
          body: 'Upload a screenshot or received QR image to see the actual text before opening an unknown link.',
        },
        {
          title: 'Local processing',
          body: 'QR generation and scanning happen in the browser; uploaded images are not sent to a separate server by this tool.',
        },
      ],
      steps: [
        'Choose whether you are creating a text, URL, or Wi-Fi QR code.',
        'Enter the value that should be scanned and confirm that the QR image renders correctly.',
        'Save the PNG or scan it with another device when you need a final check.',
        'When decoding an image QR, use a sharp source image and inspect the resulting text before opening it.',
      ],
      notes: [
        {
          title: 'Large payloads scan poorly',
          body: 'The longer the value, the denser the QR code becomes. Shorter links are usually more reliable for small print sizes.',
        },
        {
          title: 'Review Wi-Fi details',
          body: 'Check SSID, encryption type, and password before sharing. Avoid placing sensitive network credentials in public QR codes.',
        },
      ],
    },
  },
  '/diff': {
    ko: {
      heading: '텍스트 비교기 활용 포인트',
      lead: '설정 파일, 문서 초안, API 응답처럼 비슷해 보이는 두 텍스트의 줄 단위 차이를 빠르게 확인합니다.',
      cards: [
        {
          title: '변경 줄 찾기',
          body: '긴 텍스트에서 실제로 바뀐 줄만 분리해 배포 전 설정 차이와 문서 수정 범위를 확인합니다.',
        },
        {
          title: '복사 가능한 diff',
          body: '결과를 unified diff 형태로 확인해 이슈, PR, 메신저에 변경 내용을 그대로 공유하기 쉽습니다.',
        },
        {
          title: '민감 데이터 로컬 비교',
          body: '비교 작업은 브라우저에서 처리되므로 토큰이나 내부 설정을 외부 diff 서비스에 붙여 넣는 일을 줄일 수 있습니다.',
        },
      ],
      steps: [
        '원본 텍스트와 비교 대상 텍스트를 각각 붙여 넣습니다.',
        '줄바꿈, 공백, 들여쓰기 차이가 실제 의미 있는 변경인지 함께 확인합니다.',
        '결과 영역에서 추가, 삭제, 변경 줄을 확인합니다.',
        '공유가 필요하면 민감 값을 마스킹한 뒤 diff 결과를 복사합니다.',
      ],
      notes: [
        {
          title: '공백 차이',
          body: 'JSON, YAML, Markdown은 공백이 의미를 가질 수 있습니다. 단순히 모양이 비슷해 보여도 들여쓰기 차이를 함께 보세요.',
        },
        {
          title: '대용량 텍스트',
          body: '매우 큰 로그나 파일은 브라우저 메모리를 많이 사용할 수 있으므로 필요한 구간만 잘라 비교하는 편이 안정적입니다.',
        },
      ],
    },
    en: {
      heading: 'Text diff workflow notes',
      lead: 'Compare two similar text blocks such as config files, drafts, or API responses and focus on the changed lines.',
      cards: [
        {
          title: 'Find changed lines',
          body: 'Isolate the lines that changed so deployment config and document edits are easier to review.',
        },
        {
          title: 'Copyable diff output',
          body: 'Review changes in a unified diff style that is easy to paste into issues, pull requests, or team chat.',
        },
        {
          title: 'Compare sensitive text locally',
          body: 'The comparison runs in the browser, reducing the need to paste internal values into external diff services.',
        },
      ],
      steps: [
        'Paste the original text and the revised text into the two input areas.',
        'Check whether line endings, spacing, or indentation are part of the meaningful change.',
        'Review added, removed, and changed lines in the result area.',
        'Mask sensitive values before copying the diff for sharing.',
      ],
      notes: [
        {
          title: 'Whitespace can matter',
          body: 'JSON, YAML, and Markdown can be affected by indentation and spacing, so inspect formatting changes deliberately.',
        },
        {
          title: 'Large inputs',
          body: 'Very large logs or files can use a lot of browser memory. Compare only the relevant section when possible.',
        },
      ],
    },
  },
  '/color': {
    ko: {
      heading: '색상 변환과 대비 검토',
      lead: 'HEX, RGB, HSL 값을 같은 색상 기준으로 맞추고 흰색·검은색 배경 대비를 확인해 UI 색상 결정을 빠르게 검산합니다.',
      cards: [
        {
          title: '디자인 토큰 정리',
          body: '디자인 툴에서 받은 HEX 값을 CSS, JavaScript, 문서에 맞게 RGB와 HSL 값으로 바로 변환합니다.',
        },
        {
          title: '명도 대비 확인',
          body: '선택한 색상이 밝은 배경과 어두운 배경에서 읽히는지 대비 비율을 함께 확인합니다.',
        },
        {
          title: '복사 중심 작업',
          body: '각 형식 값을 바로 복사할 수 있어 테마 변수, 컴포넌트 스타일, 문서 표기 작업을 줄입니다.',
        },
      ],
      steps: [
        '색상 선택기에서 기준 색상을 고르거나 HEX 값을 확인합니다.',
        'RGB와 HSL 출력값을 필요한 코드 형식에 맞게 복사합니다.',
        '흰색·검은색 대비 비율을 보고 텍스트나 아이콘에 적절한지 판단합니다.',
        '실제 UI에서는 배경색, 글자 크기, 굵기를 함께 적용해 최종 확인합니다.',
      ],
      notes: [
        {
          title: '대비는 맥락과 함께 보기',
          body: '계산된 대비 비율은 빠른 기준점입니다. 실제 접근성 판단은 글자 크기, 굵기, 상태 색상, 주변 배경을 같이 봐야 합니다.',
        },
        {
          title: 'HSL 조정',
          body: 'HSL은 색조를 유지한 채 명도와 채도를 조절하기 좋아 hover, disabled, border 색상을 만들 때 유용합니다.',
        },
      ],
    },
    en: {
      heading: 'Color conversion and contrast review',
      lead: 'Convert HEX, RGB, and HSL values from the same color and check contrast against white and black backgrounds.',
      cards: [
        {
          title: 'Normalize design tokens',
          body: 'Convert HEX values from design tools into RGB and HSL formats for CSS, JavaScript, and documentation.',
        },
        {
          title: 'Check readable contrast',
          body: 'See how the selected color performs against light and dark backgrounds before using it for UI text or icons.',
        },
        {
          title: 'Copy-ready output',
          body: 'Copy each color format directly into theme variables, component styles, or design notes.',
        },
      ],
      steps: [
        'Choose a base color with the picker or inspect the current HEX value.',
        'Copy the RGB or HSL output that matches the code format you need.',
        'Review contrast against white and black before using the color for text or icons.',
        'Do a final check in the real UI with the actual background, font size, and weight.',
      ],
      notes: [
        {
          title: 'Contrast needs context',
          body: 'The ratio is a fast signal, but final accessibility depends on text size, font weight, state color, and surrounding background.',
        },
        {
          title: 'Use HSL for variants',
          body: 'HSL is useful when you want to keep hue stable while adjusting lightness or saturation for hover, disabled, and border states.',
        },
      ],
    },
  },
  '/markdown': {
    ko: {
      heading: 'Markdown 미리보기 작성 흐름',
      lead: 'README, 릴리스 노트, 이슈 템플릿 같은 Markdown 문서를 렌더링 결과와 HTML 출력으로 함께 확인합니다.',
      cards: [
        {
          title: '문서 초안 검토',
          body: '목록, 코드 블록, 링크, 제목 계층이 의도한 대로 렌더링되는지 작성 중 바로 확인합니다.',
        },
        {
          title: 'HTML 출력 확인',
          body: 'Markdown이 어떤 HTML로 바뀌는지 확인해 CMS나 정적 페이지에 붙여 넣기 전 구조를 점검합니다.',
        },
        {
          title: '샘플에서 빠른 시작',
          body: '기본 샘플을 불러와 코드 블록과 목록 형태를 먼저 확인한 뒤 본문으로 교체할 수 있습니다.',
        },
      ],
      steps: [
        '왼쪽 입력창에 Markdown 초안을 붙여 넣거나 샘플을 불러옵니다.',
        '렌더 버튼으로 미리보기와 HTML 결과를 갱신합니다.',
        '제목 단계, 코드 펜스, 링크 URL, 목록 들여쓰기가 의도와 맞는지 확인합니다.',
        'HTML이 필요하면 결과를 복사하고, Markdown 원문은 저장소나 문서 도구에 따로 보관합니다.',
      ],
      notes: [
        {
          title: '플랫폼별 Markdown 차이',
          body: 'GitHub, 블로그, 사내 위키는 확장 문법이 다를 수 있습니다. 최종 게시 플랫폼에서도 한 번 더 미리보는 것이 좋습니다.',
        },
        {
          title: 'HTML 붙여넣기 주의',
          body: '외부에 게시할 HTML은 대상 서비스의 sanitizer와 스크립트 제한을 따릅니다. 신뢰하지 않는 HTML을 그대로 게시하지 마세요.',
        },
      ],
    },
    en: {
      heading: 'Markdown preview workflow',
      lead: 'Review Markdown documents such as READMEs, release notes, and issue templates as rendered output and generated HTML.',
      cards: [
        {
          title: 'Review drafts quickly',
          body: 'Check headings, lists, links, and code fences while you are still editing the document.',
        },
        {
          title: 'Inspect generated HTML',
          body: 'See the HTML structure before pasting content into a CMS or static page.',
        },
        {
          title: 'Start from a sample',
          body: 'Load the default sample to confirm code blocks and list rendering before replacing it with your own text.',
        },
      ],
      steps: [
        'Paste a Markdown draft into the input area or load the sample.',
        'Render the document to update the preview and HTML output.',
        'Check heading hierarchy, fenced code blocks, links, and list indentation.',
        'Copy the HTML when needed and keep the Markdown source in your docs or repository.',
      ],
      notes: [
        {
          title: 'Markdown varies by platform',
          body: 'GitHub, blogs, and internal wikis can support different extensions, so preview again in the final publishing target.',
        },
        {
          title: 'Be careful with HTML',
          body: 'Published HTML depends on the target sanitizer and script restrictions. Do not publish untrusted HTML as-is.',
        },
      ],
    },
  },
  '/convert': {
    ko: {
      heading: '단위 변환기 사용 기준',
      lead: '길이, 무게, 온도 단위를 빠르게 바꿔 문서, 코드, 운영 메모에서 단위 착오를 줄입니다.',
      cards: [
        {
          title: '자주 쓰는 단위 중심',
          body: 'm, km, cm, inch, ft, kg, g, lb, oz, C, F, K처럼 개발과 문서 작업에서 자주 만나는 단위를 우선 제공합니다.',
        },
        {
          title: '양방향 변환',
          body: 'From과 To를 바꾸거나 교환 버튼으로 기준 단위를 빠르게 뒤집어 같은 값을 여러 표현으로 확인합니다.',
        },
        {
          title: '즉시 계산',
          body: '값과 단위를 바꾸면 현재 브라우저에서 바로 계산하므로 외부 계산기나 검색 결과에 의존하지 않아도 됩니다.',
        },
      ],
      steps: [
        '카테고리를 길이, 무게, 온도 중에서 선택합니다.',
        '입력 값과 변환 전·후 단위를 지정합니다.',
        '결과를 확인하고 필요하면 교환 버튼으로 반대 방향 값을 계산합니다.',
        '문서에 넣을 때는 소수점 자리수와 단위 표기를 함께 정리합니다.',
      ],
      notes: [
        {
          title: '반올림 기준',
          body: '결과는 계산값을 그대로 보여주므로 보고서나 UI에는 필요한 자릿수로 반올림해 사용하는 편이 좋습니다.',
        },
        {
          title: '온도 변환',
          body: '온도는 단순 배율이 아니라 오프셋이 포함됩니다. Celsius, Fahrenheit, Kelvin을 섞을 때는 단위를 반드시 같이 표기하세요.',
        },
      ],
    },
    en: {
      heading: 'Unit conversion checklist',
      lead: 'Convert common length, weight, and temperature units to reduce unit mistakes in docs, code, and operations notes.',
      cards: [
        {
          title: 'Common units first',
          body: 'The tool focuses on units that often appear in engineering and documentation: m, km, cm, inch, ft, kg, g, lb, oz, C, F, and K.',
        },
        {
          title: 'Two-way conversion',
          body: 'Switch From and To values or use the swap button to check the same quantity in the opposite direction.',
        },
        {
          title: 'Immediate calculation',
          body: 'Calculations run in the browser, so you can avoid jumping to a separate calculator or search result.',
        },
      ],
      steps: [
        'Select length, weight, or temperature.',
        'Enter the value and choose the source and target units.',
        'Review the result and use swap when you need the reverse conversion.',
        'When pasting into docs, decide the rounding and include the unit label.',
      ],
      notes: [
        {
          title: 'Rounding policy',
          body: 'The tool shows the calculated value directly. For reports or UI text, round to the precision your audience expects.',
        },
        {
          title: 'Temperature has offsets',
          body: 'Temperature conversion is not a simple ratio. Always keep the unit label when mixing Celsius, Fahrenheit, and Kelvin.',
        },
      ],
    },
  },
  '/file-hash': {
    ko: {
      heading: '파일 해시 계산 검증 흐름',
      lead: '다운로드 파일, 릴리스 산출물, 내부 전달 파일의 SHA 해시를 브라우저에서 계산해 무결성을 비교합니다.',
      cards: [
        {
          title: '체크섬 비교',
          body: '배포 페이지나 릴리스 노트에 공개된 SHA-256 값과 로컬 파일 해시를 비교해 파일이 바뀌지 않았는지 확인합니다.',
        },
        {
          title: '업로드 없는 계산',
          body: '파일 내용은 브라우저에서 읽어 해시를 계산하며, 선택한 파일을 별도 서버로 업로드하지 않습니다.',
        },
        {
          title: '여러 알고리즘 확인',
          body: '필요한 경우 SHA-256과 SHA-512처럼 서로 다른 해시 값을 함께 기록해 검증 문서에 남길 수 있습니다.',
        },
      ],
      steps: [
        '검증하려는 파일을 선택합니다.',
        '계산된 SHA 값을 릴리스 노트, 다운로드 페이지, 내부 문서의 기준값과 비교합니다.',
        '대소문자나 공백 차이를 제거하고 16진수 문자열만 비교합니다.',
        '값이 다르면 파일을 다시 내려받거나 전달 경로를 확인합니다.',
      ],
      notes: [
        {
          title: '해시는 암호화가 아님',
          body: '해시는 파일 식별과 무결성 확인에 쓰는 값입니다. 해시만으로 원본 파일을 복원하거나 비밀성을 보장하지 않습니다.',
        },
        {
          title: '큰 파일 처리',
          body: '아주 큰 파일은 브라우저 메모리와 처리 시간이 늘어날 수 있습니다. 계산이 멈춘 것처럼 보여도 잠시 기다려 보세요.',
        },
      ],
    },
    en: {
      heading: 'File hash verification workflow',
      lead: 'Calculate SHA hashes for downloads, release artifacts, and shared files in the browser to verify integrity.',
      cards: [
        {
          title: 'Compare checksums',
          body: 'Compare a local file hash with the SHA-256 value published in release notes or download pages.',
        },
        {
          title: 'No upload required',
          body: 'The browser reads the file and computes the hash locally; the selected file is not uploaded by this tool.',
        },
        {
          title: 'Record multiple hashes',
          body: 'When needed, keep SHA-256 and SHA-512 values together in verification notes.',
        },
      ],
      steps: [
        'Select the file you want to verify.',
        'Compare the calculated SHA value with the reference value from a release note, download page, or internal document.',
        'Ignore casing and extra whitespace when comparing hexadecimal strings.',
        'If the value differs, download the file again or review the transfer path.',
      ],
      notes: [
        {
          title: 'Hashing is not encryption',
          body: 'A hash identifies file content and helps with integrity checks. It does not restore the original file or provide secrecy.',
        },
        {
          title: 'Large files take time',
          body: 'Very large files can use more browser memory and processing time. Wait briefly before assuming the calculation failed.',
        },
      ],
    },
  },
  '/image-base64': {
    ko: {
      heading: '이미지 Base64 변환 판단 기준',
      lead: '작은 아이콘, 테스트 이미지, data URL을 파일과 문자열 사이에서 바꿔 CSS, HTML, API 샘플에 활용합니다.',
      cards: [
        {
          title: 'Data URL 만들기',
          body: '작은 PNG, JPG, WEBP, SVG 파일을 data URL로 바꿔 샘플 HTML이나 임시 테스트 코드에 바로 붙일 수 있습니다.',
        },
        {
          title: '문자열에서 파일 복원',
          body: '전달받은 Base64 이미지 문자열이 실제로 어떤 이미지인지 브라우저에서 복원해 확인합니다.',
        },
        {
          title: '외부 업로드 없이 확인',
          body: '이미지 읽기와 변환은 브라우저에서 처리되며, 파일이나 Base64 문자열을 별도 서버에 올리지 않습니다.',
        },
      ],
      steps: [
        '이미지 파일을 선택해 data URL 결과를 생성합니다.',
        'HTML, CSS, JSON 샘플에 넣을 때는 문자열 길이와 MIME 타입을 함께 확인합니다.',
        'Base64에서 이미지로 복원할 때는 접두어가 있는 data URL인지 순수 Base64인지 구분합니다.',
        '최종 서비스에는 파일 크기와 캐싱 전략을 고려해 data URL 사용 여부를 결정합니다.',
      ],
      notes: [
        {
          title: 'Base64는 크기가 늘어남',
          body: 'Base64는 원본보다 보통 더 긴 문자열이 됩니다. 큰 이미지를 data URL로 넣으면 HTML과 CSS가 무거워질 수 있습니다.',
        },
        {
          title: 'MIME 타입 확인',
          body: 'data:image/png;base64 같은 접두어가 실제 이미지 형식과 맞지 않으면 브라우저나 API에서 예상과 다르게 처리될 수 있습니다.',
        },
      ],
    },
    en: {
      heading: 'Image Base64 conversion guidance',
      lead: 'Move small icons, test images, and data URLs between files and strings for CSS, HTML, and API samples.',
      cards: [
        {
          title: 'Create data URLs',
          body: 'Convert small PNG, JPG, WEBP, or SVG files into data URLs for sample HTML or temporary test code.',
        },
        {
          title: 'Restore from strings',
          body: 'Decode a received Base64 image string in the browser to inspect what it actually contains.',
        },
        {
          title: 'No external upload',
          body: 'Image reading and conversion happen in the browser; the file or Base64 string is not uploaded by this tool.',
        },
      ],
      steps: [
        'Select an image file to generate a data URL.',
        'Check string length and MIME type before placing the value in HTML, CSS, or JSON samples.',
        'When decoding, distinguish between a full data URL and raw Base64 text.',
        'For production use, consider file size and caching before embedding images as data URLs.',
      ],
      notes: [
        {
          title: 'Base64 increases size',
          body: 'Base64 is usually longer than the original binary file. Large data URLs can make HTML and CSS heavy.',
        },
        {
          title: 'Check the MIME type',
          body: 'A prefix such as data:image/png;base64 should match the actual image format to avoid unexpected browser or API behavior.',
        },
      ],
    },
  },
  '/uuidv7': {
    ko: {
      heading: 'UUID v7 생성기 선택 기준',
      lead: '생성 시각을 반영하는 정렬 친화 UUID가 필요할 때 UUID v7 값을 빠르게 만들어 저장 키와 로그 상관관계에 활용합니다.',
      cards: [
        {
          title: '시간순 정렬에 유리',
          body: 'UUID v7은 앞부분에 시간 정보가 반영되어 로그, 이벤트, 데이터베이스 인덱스에서 생성 순서 확인이 쉽습니다.',
        },
        {
          title: '테스트 데이터 생성',
          body: '개발 중 샘플 ID, fixture, 문서 예시가 필요할 때 브라우저에서 바로 새 값을 만들 수 있습니다.',
        },
        {
          title: '비밀값으로 쓰지 않기',
          body: 'UUID는 식별자이지 인증 토큰이 아닙니다. 접근 권한을 보호하는 값으로 단독 사용하면 안 됩니다.',
        },
      ],
      steps: [
        '새 UUID v7을 생성합니다.',
        '정렬이 필요한 테이블 키, 이벤트 ID, 로그 correlation ID에 적합한지 확인합니다.',
        '외부 공개 ID라면 추측 가능성, 노출 범위, 권한 검사를 별도로 설계합니다.',
        'DB에 저장할 때는 문자열 저장과 binary 저장 중 운영 기준에 맞는 형식을 고릅니다.',
      ],
      notes: [
        {
          title: '시간 정보 노출',
          body: 'UUID v7에는 생성 시각을 추정할 수 있는 정보가 포함됩니다. 생성 시각 노출이 민감한 도메인에서는 UUID v4가 더 적합할 수 있습니다.',
        },
        {
          title: '정렬과 보안은 별개',
          body: '정렬 가능한 ID는 조회 성능과 운영성에 도움이 되지만, 인증과 인가를 대신하지 않습니다.',
        },
      ],
    },
    en: {
      heading: 'When to use UUID v7',
      lead: 'Generate sortable UUID values for storage keys, event IDs, and log correlation when creation order matters.',
      cards: [
        {
          title: 'Friendly to time ordering',
          body: 'UUID v7 includes timestamp-derived bits near the front, making generated order easier to inspect in logs and indexes.',
        },
        {
          title: 'Create test identifiers',
          body: 'Generate sample IDs for fixtures, docs, and local development without leaving the browser.',
        },
        {
          title: 'Not a secret token',
          body: 'A UUID is an identifier, not an authentication secret. Do not use it alone to protect access.',
        },
      ],
      steps: [
        'Generate a new UUID v7 value.',
        'Decide whether sortable IDs fit your table keys, event IDs, or correlation IDs.',
        'For public IDs, design authorization and exposure rules separately.',
        'Choose string or binary storage based on your database and operational conventions.',
      ],
      notes: [
        {
          title: 'Creation time can be inferred',
          body: 'UUID v7 exposes enough information to estimate creation time. UUID v4 may be better when timing should not be visible.',
        },
        {
          title: 'Ordering is not security',
          body: 'Sortable IDs can help operations and indexing, but they do not replace authentication or authorization.',
        },
      ],
    },
  },
  '/case-convert': {
    ko: {
      heading: '텍스트 케이스 변환 작업',
      lead: 'API 필드명, 환경 변수, 파일명, 문서 제목을 camelCase, snake_case, kebab-case, PascalCase 등으로 빠르게 맞춥니다.',
      cards: [
        {
          title: '코드 스타일 맞추기',
          body: '프론트엔드와 백엔드가 서로 다른 네이밍 규칙을 쓸 때 필드명을 빠르게 변환해 매핑 실수를 줄입니다.',
        },
        {
          title: 'URL과 파일명 정리',
          body: '문장형 제목을 slug나 kebab-case로 바꿔 문서 경로, 이미지 파일명, 앵커 링크에 활용합니다.',
        },
        {
          title: '일괄 변환 전 점검',
          body: '변환 결과를 바로 확인해 약어, 숫자, 공백이 의도한 방식으로 나뉘었는지 확인합니다.',
        },
      ],
      steps: [
        '변환할 텍스트나 식별자 목록을 입력합니다.',
        '원하는 출력 케이스를 선택하고 변환 결과를 확인합니다.',
        'API 약어, 숫자, 하이픈, 밑줄이 포함된 값은 결과를 수동으로 한 번 더 검토합니다.',
        '코드에 붙여 넣기 전 기존 네이밍 규칙과 충돌하지 않는지 확인합니다.',
      ],
      notes: [
        {
          title: '약어 처리',
          body: 'URL, ID, API 같은 약어는 팀 규칙에 따라 url, Url, URL로 다르게 표기될 수 있습니다. 자동 변환 후 컨벤션을 맞추세요.',
        },
        {
          title: '의미 있는 공백',
          body: '여러 단어를 합치는 과정에서 원래 의미가 달라질 수 있으므로 공개 URL이나 API 필드명은 최종 확인이 필요합니다.',
        },
      ],
    },
    en: {
      heading: 'Text case conversion workflow',
      lead: 'Convert API fields, environment variables, filenames, and document titles into camelCase, snake_case, kebab-case, PascalCase, and related formats.',
      cards: [
        {
          title: 'Match code conventions',
          body: 'Convert field names quickly when frontend and backend layers use different naming styles.',
        },
        {
          title: 'Clean URLs and filenames',
          body: 'Turn titles into slugs or kebab-case values for document paths, image names, and anchor links.',
        },
        {
          title: 'Review before bulk edits',
          body: 'Inspect how acronyms, numbers, and spacing are split before applying the result broadly.',
        },
      ],
      steps: [
        'Enter the text or identifier list you want to convert.',
        'Choose the output case and review the converted value.',
        'Manually check values containing acronyms, numbers, hyphens, or underscores.',
        'Before pasting into code, compare the result with the existing naming convention.',
      ],
      notes: [
        {
          title: 'Acronyms are team-specific',
          body: 'Terms like URL, ID, and API can be written as url, Url, or URL depending on convention. Adjust after conversion.',
        },
        {
          title: 'Meaning can shift',
          body: 'Combining words can change readability or meaning, so public URLs and API field names deserve a final review.',
        },
      ],
    },
  },
  '/json-yaml': {
    ko: {
      heading: 'JSON YAML 변환 검토',
      lead: 'API 응답, 설정 파일, 쿠버네티스 매니페스트 같은 구조화 데이터를 JSON과 YAML 사이에서 바꾸고 CSV 형태로 정리합니다.',
      cards: [
        {
          title: '설정 형식 이동',
          body: 'JSON 기반 샘플을 YAML 설정으로 옮기거나, YAML 문서를 JSON으로 바꿔 코드에서 다루기 쉽게 만듭니다.',
        },
        {
          title: '구조 확인',
          body: '변환 중 배열, 객체, 문자열, 숫자 타입이 의도대로 유지되는지 결과를 바로 비교합니다.',
        },
        {
          title: 'CSV로 평면화',
          body: '단순한 배열 데이터를 표 형태로 정리해 스프레드시트나 검수 문서로 옮기기 쉽게 만듭니다.',
        },
      ],
      steps: [
        '원본 JSON 또는 YAML을 입력합니다.',
        '변환 방향을 선택하고 출력 구조를 확인합니다.',
        '문자열 숫자, true/false, null 값이 의도한 타입으로 남아 있는지 확인합니다.',
        'CSV 출력은 중첩이 깊지 않은 배열 데이터에 우선 사용합니다.',
      ],
      notes: [
        {
          title: 'YAML 타입 추론',
          body: 'YAML은 yes, no, 날짜처럼 보이는 문자열을 타입으로 해석할 수 있습니다. 민감한 값은 따옴표로 감싸는 것이 안전합니다.',
        },
        {
          title: '주석 보존 한계',
          body: 'JSON에는 주석이 없고 변환 과정에서 YAML 주석이나 원래 서식이 유지되지 않을 수 있습니다. 운영 설정은 원본을 따로 보관하세요.',
        },
      ],
    },
    en: {
      heading: 'JSON and YAML conversion review',
      lead: 'Move structured data such as API responses, config files, and manifests between JSON, YAML, and simple CSV output.',
      cards: [
        {
          title: 'Move between config formats',
          body: 'Convert JSON samples into YAML config, or convert YAML into JSON for easier handling in code.',
        },
        {
          title: 'Inspect structure',
          body: 'Check whether arrays, objects, strings, numbers, booleans, and null values survive conversion as intended.',
        },
        {
          title: 'Flatten simple arrays',
          body: 'Turn simple array data into CSV when you need a quick spreadsheet or review table.',
        },
      ],
      steps: [
        'Paste the source JSON or YAML.',
        'Choose the conversion direction and review the output structure.',
        'Check string numbers, true/false values, and null values for type changes.',
        'Use CSV output mainly for shallow array data.',
      ],
      notes: [
        {
          title: 'YAML infers types',
          body: 'YAML can interpret values that look like yes, no, or dates. Quote sensitive string values when exact text matters.',
        },
        {
          title: 'Comments may not survive',
          body: 'JSON has no comments, and YAML comments or original formatting may be lost during conversion. Keep the original config separately.',
        },
      ],
    },
  },
  '/query-builder': {
    ko: {
      heading: 'URL 쿼리 생성기 사용 흐름',
      lead: '키-값 쌍을 안전하게 인코딩해 검색 URL, 공유 링크, API 테스트용 쿼리 문자열을 만듭니다.',
      cards: [
        {
          title: '인코딩 실수 줄이기',
          body: '공백, 한글, 특수문자가 들어간 값을 직접 이어 붙이지 않고 브라우저 URL 규칙에 맞게 인코딩합니다.',
        },
        {
          title: '테스트 링크 조립',
          body: '필터, 페이지 번호, 정렬 값처럼 여러 파라미터를 한 화면에서 조립해 API나 화면 링크를 재현합니다.',
        },
        {
          title: '복사 전 검토',
          body: '최종 URL을 복사하기 전에 누락된 필수 파라미터와 빈 값이 있는지 확인합니다.',
        },
      ],
      steps: [
        '기준 URL을 입력하거나 쿼리 문자열만 만들 준비를 합니다.',
        '파라미터 이름과 값을 행 단위로 추가합니다.',
        '생성된 URL에서 인코딩된 값과 구분자가 올바른지 확인합니다.',
        '분석 도구나 API 테스트에 붙여 넣기 전 불필요한 빈 값을 제거합니다.',
      ],
      notes: [
        {
          title: '중복 키 처리',
          body: '같은 키를 여러 번 쓰는 방식은 서버 구현마다 다르게 해석될 수 있습니다. 배열 파라미터 규칙을 API 문서와 맞추세요.',
        },
        {
          title: '민감 정보 주의',
          body: 'URL은 브라우저 기록, 로그, 공유 미리보기 등에 남을 수 있습니다. 토큰이나 개인정보를 쿼리에 넣지 않는 편이 좋습니다.',
        },
      ],
    },
    en: {
      heading: 'URL query builder workflow',
      lead: 'Encode key-value pairs safely for search URLs, share links, and API test query strings.',
      cards: [
        {
          title: 'Reduce encoding mistakes',
          body: 'Encode spaces, Korean text, and special characters according to URL rules instead of concatenating strings manually.',
        },
        {
          title: 'Assemble test links',
          body: 'Build filters, page numbers, sorting values, and other parameters in one place to reproduce API or screen states.',
        },
        {
          title: 'Review before copying',
          body: 'Check required parameters and empty values before copying the final URL.',
        },
      ],
      steps: [
        'Enter a base URL or prepare to build only the query string.',
        'Add parameter names and values row by row.',
        'Review the generated URL for correct separators and encoded values.',
        'Remove unnecessary empty values before using it in analytics tools or API tests.',
      ],
      notes: [
        {
          title: 'Repeated keys vary',
          body: 'Servers can interpret repeated keys differently. Match array parameter rules with the API documentation.',
        },
        {
          title: 'Avoid sensitive data',
          body: 'URLs can appear in browser history, logs, and previews. Avoid putting tokens or personal data in query strings.',
        },
      ],
    },
  },
  '/ip-ua': {
    ko: {
      heading: 'IP와 User-Agent 확인',
      lead: '현재 브라우저의 IP, User-Agent, 언어, 타임존 정보를 확인해 접속 환경 차이를 재현하고 지원 요청에 필요한 값을 정리합니다.',
      cards: [
        {
          title: '지원 요청 정보 수집',
          body: '사용자 환경을 재현할 때 필요한 브라우저 문자열, 언어, 시간대 정보를 한 화면에서 확인합니다.',
        },
        {
          title: '네트워크 경로 점검',
          body: 'VPN, 프록시, 회사망을 거칠 때 외부에서 보이는 IP가 예상과 같은지 빠르게 확인합니다.',
        },
        {
          title: '복사 가능한 값',
          body: '로그 분석, 고객 지원, QA 메모에 붙일 수 있도록 주요 환경 값을 바로 확인합니다.',
        },
      ],
      steps: [
        '페이지를 열어 현재 브라우저 환경 정보를 확인합니다.',
        'VPN이나 네트워크를 바꾼 뒤 새로고침해 IP 변화가 있는지 비교합니다.',
        '버그 재현 요청에는 User-Agent, 브라우저 언어, 타임존을 함께 기록합니다.',
        '공유 전 개인 IP나 내부망 정보가 노출되어도 되는지 확인합니다.',
      ],
      notes: [
        {
          title: 'IP는 위치와 다름',
          body: 'IP 기반 위치는 VPN, 프록시, 통신사망에 따라 실제 위치와 다를 수 있습니다. 정확한 위치 정보로 취급하지 마세요.',
        },
        {
          title: 'User-Agent 축소',
          body: '최신 브라우저는 개인정보 보호를 위해 User-Agent 정보를 줄이거나 고정할 수 있습니다. 세부 기능 판단에는 feature detection이 더 안정적입니다.',
        },
      ],
    },
    en: {
      heading: 'IP and User-Agent inspection',
      lead: 'Review current browser IP, User-Agent, language, and timezone values to reproduce environment-specific issues.',
      cards: [
        {
          title: 'Collect support details',
          body: 'Gather the browser string, language, and timezone that support or QA teams need for reproduction.',
        },
        {
          title: 'Check network path',
          body: 'Confirm the externally visible IP when using a VPN, proxy, office network, or mobile network.',
        },
        {
          title: 'Copy-ready environment data',
          body: 'Use the values in logs, support tickets, and QA notes after reviewing what should be shared.',
        },
      ],
      steps: [
        'Open the page and inspect the current browser environment values.',
        'Refresh after changing VPN or network settings to compare the visible IP.',
        'Record User-Agent, browser language, and timezone when asking someone to reproduce a bug.',
        'Before sharing, decide whether exposing IP or internal network details is appropriate.',
      ],
      notes: [
        {
          title: 'IP is not exact location',
          body: 'IP-based location can differ from physical location because of VPNs, proxies, carriers, and office networks.',
        },
        {
          title: 'User-Agent is reduced',
          body: 'Modern browsers may reduce or freeze User-Agent details for privacy. Feature detection is more reliable for capability checks.',
        },
      ],
    },
  },
  '/ip-cidr': {
    ko: {
      heading: 'CIDR 계산기 검토 항목',
      lead: 'IPv4 CIDR 블록에서 네트워크 주소, 브로드캐스트, 사용 가능한 호스트 범위를 계산해 방화벽과 서브넷 설정을 검산합니다.',
      cards: [
        {
          title: '서브넷 범위 확인',
          body: '10.0.0.0/24 같은 CIDR이 실제로 어떤 시작·끝 주소를 갖는지 빠르게 확인합니다.',
        },
        {
          title: '접근 제어 검산',
          body: '방화벽, allowlist, VPN 설정에 넣을 범위가 너무 넓거나 좁지 않은지 배포 전 검토합니다.',
        },
        {
          title: '문서화에 활용',
          body: '네트워크 주소, 브로드캐스트, 호스트 수를 함께 기록해 인프라 문서의 모호함을 줄입니다.',
        },
      ],
      steps: [
        'IPv4 주소와 prefix 길이를 CIDR 형식으로 입력합니다.',
        '계산된 네트워크 주소, 브로드캐스트 주소, 호스트 범위를 확인합니다.',
        'allowlist나 라우팅 규칙에 사용할 값과 실제 필요한 범위를 비교합니다.',
        '클라우드 제공자의 예약 주소 정책이 있다면 별도로 반영합니다.',
      ],
      notes: [
        {
          title: 'IPv4 기준',
          body: '이 도구는 IPv4 CIDR 계산에 초점을 둡니다. IPv6 네트워크는 다른 계산 기준과 표기법을 사용합니다.',
        },
        {
          title: '예약 주소',
          body: '클라우드 네트워크는 각 서브넷에서 일부 주소를 예약할 수 있습니다. 사용 가능 호스트 수는 플랫폼 문서를 함께 확인하세요.',
        },
      ],
    },
    en: {
      heading: 'CIDR calculation checklist',
      lead: 'Calculate network address, broadcast address, and usable IPv4 host ranges before changing firewall or subnet settings.',
      cards: [
        {
          title: 'Inspect subnet ranges',
          body: 'See the actual start and end addresses for CIDR blocks such as 10.0.0.0/24.',
        },
        {
          title: 'Review access rules',
          body: 'Check whether a firewall, allowlist, or VPN range is broader or narrower than intended before deployment.',
        },
        {
          title: 'Document network values',
          body: 'Record network address, broadcast address, and host count to make infrastructure notes clearer.',
        },
      ],
      steps: [
        'Enter the IPv4 address and prefix length in CIDR notation.',
        'Review the calculated network, broadcast, and host range values.',
        'Compare the result with the range needed by your allowlist or route rule.',
        'Apply cloud-provider reserved-address rules separately when relevant.',
      ],
      notes: [
        {
          title: 'IPv4 focused',
          body: 'This tool focuses on IPv4 CIDR calculation. IPv6 uses different notation and sizing rules.',
        },
        {
          title: 'Reserved addresses vary',
          body: 'Cloud networks may reserve some addresses in every subnet. Confirm usable host counts with the platform documentation.',
        },
      ],
    },
  },
  '/image-optimize': {
    ko: {
      heading: '이미지 최적화 작업 흐름',
      lead: '브라우저에서 이미지 크기, 품질, 출력 형식을 조절해 웹 업로드 전 파일 용량과 표시 품질을 비교합니다.',
      cards: [
        {
          title: '업로드 전 용량 줄이기',
          body: '블로그, 문서, 랜딩 페이지에 올릴 이미지를 적절한 너비와 품질로 줄여 로딩 부담을 낮춥니다.',
        },
        {
          title: '포맷 비교',
          body: 'WEBP, JPEG, PNG 출력 차이를 확인해 사진, 스크린샷, 투명 이미지에 맞는 형식을 고릅니다.',
        },
        {
          title: '로컬 변환',
          body: '이미지 리사이즈와 변환은 브라우저에서 처리되며, 선택한 원본 파일을 별도 서버로 업로드하지 않습니다.',
        },
      ],
      steps: [
        '원본 이미지를 선택합니다.',
        '목표 너비, 품질, 출력 포맷을 설정합니다.',
        '예상 용량과 표시 품질을 비교한 뒤 다운로드합니다.',
        '중요한 이미지는 실제 페이지에 넣어 선명도와 레이아웃 영향을 다시 확인합니다.',
      ],
      notes: [
        {
          title: '투명도와 포맷',
          body: 'JPEG는 투명 배경을 보존하지 않습니다. 로고나 아이콘처럼 투명도가 필요하면 PNG나 WEBP를 고려하세요.',
        },
        {
          title: '메타데이터',
          body: '브라우저 캔버스 변환 과정에서 EXIF 같은 메타데이터가 유지되지 않을 수 있습니다. 사진 기록 보존이 필요하면 원본을 따로 보관하세요.',
        },
      ],
    },
    en: {
      heading: 'Image optimization workflow',
      lead: 'Resize images, adjust quality, and compare output formats in the browser before uploading them to a website or document.',
      cards: [
        {
          title: 'Reduce upload weight',
          body: 'Prepare images for blogs, docs, and landing pages with appropriate width and quality settings.',
        },
        {
          title: 'Compare output formats',
          body: 'Choose WEBP, JPEG, or PNG based on whether the source is a photo, screenshot, or transparent graphic.',
        },
        {
          title: 'Local conversion',
          body: 'Resizing and conversion happen in the browser; the original file is not uploaded by this tool.',
        },
      ],
      steps: [
        'Select the source image.',
        'Set target width, quality, and output format.',
        'Compare the expected size and visible quality, then download the optimized file.',
        'Place important images in the real page to recheck sharpness and layout impact.',
      ],
      notes: [
        {
          title: 'Transparency and format',
          body: 'JPEG does not preserve transparency. Use PNG or WEBP when logos or icons need transparent backgrounds.',
        },
        {
          title: 'Metadata may be removed',
          body: 'Canvas-based conversion may not preserve EXIF metadata. Keep the original when photo metadata matters.',
        },
      ],
    },
  },
  '/ocr': {
    ko: {
      heading: 'OCR 텍스트 추출 기준',
      lead: '스크린샷, 스캔 이미지, 문서 캡처에서 한글과 영어 텍스트를 추출해 복사 가능한 문자열로 정리합니다.',
      cards: [
        {
          title: '이미지 속 문장 복사',
          body: '캡처된 에러 메시지, 안내 문구, 스캔 문서 일부를 다시 타이핑하지 않고 텍스트로 추출합니다.',
        },
        {
          title: '한글·영어 중심',
          body: '한국어와 영어가 섞인 화면을 대상으로 빠르게 초안을 뽑고, 결과는 사람이 한 번 더 교정하는 흐름에 맞췄습니다.',
        },
        {
          title: '브라우저 처리',
          body: '선택한 이미지는 브라우저에서 OCR 처리되며, 이 도구가 별도 서버에 이미지를 저장하지 않습니다.',
        },
      ],
      steps: [
        '텍스트가 선명하게 보이는 이미지 파일을 선택합니다.',
        'OCR 실행 후 결과 문자열을 확인합니다.',
        '오인식된 숫자, 영문 대소문자, 띄어쓰기를 수동으로 교정합니다.',
        '개인정보가 포함된 이미지는 추출 결과를 공유하기 전에 마스킹합니다.',
      ],
      notes: [
        {
          title: '이미지 품질 영향',
          body: '흐림, 기울어짐, 낮은 대비, 작은 글자는 인식률을 크게 떨어뜨립니다. 가능하면 원본 해상도와 선명한 캡처를 사용하세요.',
        },
        {
          title: 'OCR 결과는 검토 필요',
          body: 'OCR은 보조 도구입니다. 계약서, 금액, 계좌번호처럼 정확도가 중요한 텍스트는 원본과 대조해야 합니다.',
        },
      ],
    },
    en: {
      heading: 'OCR text extraction guidance',
      lead: 'Extract Korean and English text from screenshots, scans, and captured documents into copyable text.',
      cards: [
        {
          title: 'Copy text from images',
          body: 'Extract error messages, UI labels, and scanned snippets without retyping them manually.',
        },
        {
          title: 'Focused on Korean and English',
          body: 'Use it for mixed Korean and English screenshots, then review the result manually before relying on it.',
        },
        {
          title: 'Browser-side processing',
          body: 'The selected image is processed in the browser; this tool does not store the image on a separate server.',
        },
      ],
      steps: [
        'Select an image where the text is sharp and readable.',
        'Run OCR and inspect the extracted text.',
        'Manually correct misread numbers, casing, and spacing.',
        'Mask personal data before sharing the extracted result.',
      ],
      notes: [
        {
          title: 'Image quality matters',
          body: 'Blur, skew, low contrast, and tiny text reduce accuracy. Use the clearest source image available.',
        },
        {
          title: 'Review important text',
          body: 'OCR is an assistant, not a source of truth. Compare contracts, amounts, and account numbers with the original image.',
        },
      ],
    },
  },
  '/text-stats': {
    ko: {
      heading: '글자수 세기 활용',
      lead: '자기소개서·리포트처럼 글자수 제한이 있는 글을 쓸 때 공백 포함/제외 글자수와 원고지 분량을 확인해 분량을 맞춥니다.',
      cards: [
        {
          title: '입력 제한 검토',
          body: '제목, 메타 설명, SMS, 알림 문구처럼 글자 수 제한이 있는 텍스트를 제출 전에 확인합니다.',
        },
        {
          title: '원고 분량 파악',
          body: '블로그 초안, 가이드, 안내문이 어느 정도 길이인지 읽기 시간과 줄 수로 빠르게 감을 잡습니다.',
        },
        {
          title: '복사한 텍스트 정리',
          body: '외부 문서에서 가져온 텍스트의 줄바꿈과 공백을 확인해 편집 범위를 정합니다.',
        },
      ],
      steps: [
        '검사할 텍스트를 입력창에 붙여 넣습니다.',
        '글자 수, 단어 수, 줄 수, 읽기 시간을 확인합니다.',
        '제한이 있는 입력값은 공백 포함 여부와 실제 서비스 기준을 함께 비교합니다.',
        '긴 문서는 섹션별로 나눠 읽기 시간과 분량을 조절합니다.',
      ],
      notes: [
        {
          title: '한국어 단어 수',
          body: '한국어 단어 수는 띄어쓰기 품질에 영향을 받습니다. 정확한 형태소 분석이 아니라 빠른 분량 확인용으로 보는 것이 좋습니다.',
        },
        {
          title: '읽기 시간은 추정치',
          body: '읽기 시간은 독자, 문장 난도, 코드 블록 여부에 따라 달라집니다. 게시 전 참고 기준으로 사용하세요.',
        },
      ],
    },
    en: {
      heading: 'Text statistics workflow',
      lead: 'Check characters, words, lines, and estimated reading time for input limits, draft length, and UX copy sizing.',
      cards: [
        {
          title: 'Review input limits',
          body: 'Check titles, meta descriptions, SMS text, and notification copy before submitting text with strict limits.',
        },
        {
          title: 'Estimate draft size',
          body: 'Understand the length of blog drafts, guides, and notices through reading time and line count.',
        },
        {
          title: 'Inspect pasted text',
          body: 'Review line breaks and spacing from copied documents before editing or publishing.',
        },
      ],
      steps: [
        'Paste the text you want to inspect.',
        'Review character count, word count, line count, and reading time.',
        'For strict limits, compare whether the target service counts spaces or line breaks.',
        'For long documents, split by section to tune length and reading time.',
      ],
      notes: [
        {
          title: 'Korean word count is approximate',
          body: 'Korean word counts depend heavily on spacing. Treat them as a quick length signal, not morphological analysis.',
        },
        {
          title: 'Reading time is an estimate',
          body: 'Reading speed varies by audience, difficulty, and code blocks. Use the estimate as a planning signal.',
        },
      ],
    },
  },
  '/utm-builder': {
    ko: {
      heading: 'UTM 캠페인 URL 생성 기준',
      lead: 'source, medium, campaign 값을 일관되게 붙여 광고, 소셜, 뉴스레터 링크의 유입 분석 품질을 높입니다.',
      cards: [
        {
          title: '캠페인 명명 규칙 유지',
          body: '팀에서 정한 source, medium, campaign 표기를 반복 입력하지 않고 같은 형식으로 URL을 만듭니다.',
        },
        {
          title: '인코딩된 링크 생성',
          body: '공백과 한글이 포함된 캠페인명을 URL 규칙에 맞게 인코딩해 깨진 링크를 줄입니다.',
        },
        {
          title: '배포 전 검토',
          body: '최종 링크를 복사하기 전에 랜딩 URL, 필수 UTM 값, 중복 파라미터를 확인합니다.',
        },
      ],
      steps: [
        '랜딩 페이지 URL을 입력합니다.',
        'utm_source, utm_medium, utm_campaign을 팀 규칙에 맞게 채웁니다.',
        '필요하면 term과 content를 추가해 소재나 키워드 차이를 구분합니다.',
        '생성된 URL을 열어 랜딩 페이지가 정상 동작하는지 확인한 뒤 배포합니다.',
      ],
      notes: [
        {
          title: '일관성이 핵심',
          body: 'google, Google, cpc, paid 같은 표기가 섞이면 리포트가 나뉩니다. 소문자와 구분자 규칙을 먼저 정하세요.',
        },
        {
          title: '내부 링크 주의',
          body: '사이트 내부 이동에 UTM을 과도하게 붙이면 원래 유입 출처가 덮일 수 있습니다. 외부 캠페인 링크에 우선 사용하세요.',
        },
      ],
    },
    en: {
      heading: 'UTM campaign URL workflow',
      lead: 'Attach source, medium, and campaign values consistently so ad, social, and newsletter traffic is easier to analyze.',
      cards: [
        {
          title: 'Keep naming consistent',
          body: 'Build URLs using the same source, medium, and campaign conventions instead of retyping them manually.',
        },
        {
          title: 'Create encoded links',
          body: 'Encode spaces and non-English campaign names according to URL rules to reduce broken links.',
        },
        {
          title: 'Review before launch',
          body: 'Check landing URL, required UTM values, and duplicate parameters before copying the final link.',
        },
      ],
      steps: [
        'Enter the landing page URL.',
        'Fill utm_source, utm_medium, and utm_campaign using your team convention.',
        'Add term and content when you need to distinguish keywords or creatives.',
        'Open the generated URL once before publishing it.',
      ],
      notes: [
        {
          title: 'Consistency matters most',
          body: 'Mixed values such as google, Google, cpc, and paid can split reports. Decide casing and separators first.',
        },
        {
          title: 'Use carefully on internal links',
          body: 'Too many internal UTM links can overwrite the original acquisition source. Prefer UTMs for external campaign links.',
        },
      ],
    },
  },
  '/text-cleaner': {
    ko: {
      heading: '텍스트 정리기 작업 흐름',
      lead: '중복 줄 제거, 공백 정리, 정렬, slugify 같은 반복 편집을 브라우저에서 처리해 원고와 데이터 목록을 빠르게 다듬습니다.',
      cards: [
        {
          title: '붙여넣기 흔적 제거',
          body: '문서, 스프레드시트, 로그에서 복사한 텍스트의 불필요한 공백과 빈 줄을 정리합니다.',
        },
        {
          title: '목록 정리',
          body: '중복 줄 제거와 정렬을 사용해 키워드, URL, 이메일, 설정값 목록을 검수하기 쉽게 만듭니다.',
        },
        {
          title: 'Slug 초안 생성',
          body: '제목이나 문구를 URL에 쓰기 쉬운 slug 형태로 바꿔 문서 경로나 파일명 초안을 만듭니다.',
        },
      ],
      steps: [
        '정리할 텍스트를 입력합니다.',
        '공백 제거, 빈 줄 제거, 중복 제거, 정렬, slugify 중 필요한 작업을 선택합니다.',
        '결과를 원본과 비교해 의미 있는 줄바꿈이나 공백이 사라지지 않았는지 확인합니다.',
        '대량 수정 전 원본을 따로 보관하고 결과를 복사합니다.',
      ],
      notes: [
        {
          title: '원본 보관',
          body: '중복 제거와 정렬은 순서 정보를 바꿀 수 있습니다. 로그나 문서처럼 순서가 중요한 텍스트는 원본을 남겨두세요.',
        },
        {
          title: 'Slug 검토',
          body: '자동 slug는 빠른 초안입니다. 공개 URL에 쓰기 전 브랜드명, 약어, 검색 의도를 반영해 다듬는 것이 좋습니다.',
        },
      ],
    },
    en: {
      heading: 'Text cleaning workflow',
      lead: 'Clean repeated editing tasks such as trimming whitespace, removing duplicate lines, sorting, and slugifying text in the browser.',
      cards: [
        {
          title: 'Remove paste artifacts',
          body: 'Clean extra spaces and blank lines from text copied out of documents, spreadsheets, or logs.',
        },
        {
          title: 'Organize lists',
          body: 'Use duplicate removal and sorting to review keyword, URL, email, or config-value lists more easily.',
        },
        {
          title: 'Draft slugs',
          body: 'Turn titles into URL-friendly slug drafts for document paths and filenames.',
        },
      ],
      steps: [
        'Paste the text you want to clean.',
        'Choose trimming, blank-line removal, duplicate removal, sorting, or slugify actions.',
        'Compare the result with the original so meaningful spacing or ordering is not lost.',
        'Keep the original before bulk edits, then copy the cleaned result.',
      ],
      notes: [
        {
          title: 'Keep the original',
          body: 'Duplicate removal and sorting can change order. Preserve the source when sequence matters.',
        },
        {
          title: 'Review slugs',
          body: 'Automatic slugs are drafts. Before publishing URLs, adjust brand names, acronyms, and search intent manually.',
        },
      ],
    },
  },
  '/api-tester': {
    ko: {
      heading: 'API 요청 테스트 안전 사용',
      lead: '브라우저에서 HTTP 요청을 만들고 응답과 cURL 형태를 확인해 API 재현 절차를 빠르게 정리합니다.',
      cards: [
        {
          title: '요청 재현',
          body: '메서드, URL, 헤더, 본문을 한 화면에서 조합해 문제 상황을 재현하고 응답 코드를 확인합니다.',
        },
        {
          title: 'cURL로 공유',
          body: '브라우저에서 만든 요청을 cURL 형태로 바꿔 백엔드, QA, 운영 담당자에게 재현 명령으로 전달합니다.',
        },
        {
          title: 'CORS 영향 확인',
          body: '브라우저에서 직접 요청하므로 대상 API의 CORS 설정에 따라 성공 여부가 달라질 수 있습니다.',
        },
      ],
      steps: [
        '요청 메서드와 URL을 입력합니다.',
        '필요한 헤더와 JSON 본문을 추가합니다.',
        '요청을 보내 응답 상태, 헤더, 본문을 확인합니다.',
        '공유가 필요하면 토큰과 개인정보를 마스킹한 뒤 cURL을 복사합니다.',
      ],
      notes: [
        {
          title: '민감 값 주의',
          body: '운영 토큰, 개인정보, 내부 API 주소는 테스트 전에 샘플 값으로 바꾸거나 공유 전 반드시 마스킹하세요.',
        },
        {
          title: '브라우저 보안 정책',
          body: '서버가 정상이어도 CORS, 인증 쿠키, mixed content 정책 때문에 브라우저 요청이 막힐 수 있습니다. 서버 간 요청과 결과가 다를 수 있습니다.',
        },
      ],
    },
    en: {
      heading: 'Safe API request testing',
      lead: 'Build HTTP requests in the browser, inspect responses, and export cURL commands for reproducible API debugging.',
      cards: [
        {
          title: 'Reproduce requests',
          body: 'Combine method, URL, headers, and body in one screen to reproduce an issue and inspect the status code.',
        },
        {
          title: 'Share as cURL',
          body: 'Export a browser-built request as cURL so backend, QA, or operations teammates can reproduce it.',
        },
        {
          title: 'CORS still applies',
          body: 'Requests are sent from the browser, so the target API CORS policy can affect whether the request succeeds.',
        },
      ],
      steps: [
        'Enter the request method and URL.',
        'Add required headers and a JSON body when needed.',
        'Send the request and inspect status, headers, and response body.',
        'Mask tokens and personal data before copying cURL for sharing.',
      ],
      notes: [
        {
          title: 'Protect sensitive values',
          body: 'Replace production tokens, personal data, and internal API addresses with sample values before sharing.',
        },
        {
          title: 'Browser policy differs',
          body: 'A healthy server can still be blocked by CORS, auth-cookie rules, or mixed content policy. Browser results can differ from server-to-server calls.',
        },
      ],
    },
  },
};
