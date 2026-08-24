export const TOOL_SUPPORT_COPY = {
  '/date-calc': {
    ko: {
      heading: '만 나이 계산 실무 활용',
      lead: '2023년 6월부터 법령과 계약의 나이는 만 나이가 기준이 됐지만, 서류에는 여전히 세는 나이와 연 나이가 섞여 있습니다. 세 값을 한 번에 보여주는 이유가 그것입니다. 두 날짜 사이 일수, 디데이, 기준일에 기간을 더하거나 빼는 계산도 같은 화면에서 처리하므로 근무일이나 정산일을 맞출 때 함께 씁니다.',
      cards: [
        {
          title: '세 가지 나이 구분',
          body: '만 나이는 생일이 지나야 오르고, 세는 나이는 해가 바뀌면 오르며, 연 나이는 올해에서 태어난 해를 뺀 값으로 병역법과 청소년보호법에서 씁니다. 같은 사람도 시기에 따라 세 값이 최대 두 살까지 벌어집니다.',
        },
        {
          title: '당일 포함 여부',
          body: '숙박 일수, 근무일, 대회 기간처럼 시작일도 하루로 세는 경우가 많아 차이 일수와 당일 포함 일수를 같이 보여줍니다. 계약서 문구가 어느 쪽인지 먼저 확인하세요.',
        },
        {
          title: '브라우저 안 계산',
          body: '생년월일과 날짜는 현재 브라우저에서만 계산하며 서버로 보내거나 저장하지 않습니다. 개인정보가 들어가는 값이라 화면을 닫으면 남지 않습니다.',
        },
      ],
      steps: [
        '만 나이 탭에 생년월일을 넣고 만 나이·세는 나이·연 나이를 함께 확인합니다.',
        '기준일을 바꾸면 과거나 미래 시점의 나이를 볼 수 있습니다. 비워 두면 오늘이 기준입니다.',
        '날짜 차이 탭에서 두 날짜를 넣어 일수, 당일 포함 일수, 주말을 뺀 평일 수를 확인합니다.',
        '디데이 탭은 목표일까지 남은 일수를, 더하기 탭은 기준일에 기간을 더하거나 뺀 날짜를 냅니다.',
      ],
      notes: [
        {
          title: '말일은 넘기지 않습니다',
          body: '1월 31일에 1개월을 더하면 3월 3일이 아니라 2월 28일이 됩니다. 민법의 기간 계산과 같게 그 달의 말일에서 자릅니다. 날짜 차이의 개월 계산도 같은 규칙을 씁니다.',
        },
        {
          title: '영업일에 공휴일은 빠져 있습니다',
          body: '영업일 계산은 토요일과 일요일만 제외합니다. 설·추석 같은 공휴일은 해마다 달라 반영하지 않으므로 실제 근무일과 다를 수 있습니다.',
        },
        {
          title: '기준 시간대',
          body: '오늘 날짜는 접속한 기기의 시간대를 그대로 씁니다. 해외에서 접속하면 한국 날짜와 하루 차이가 날 수 있으니 기준일을 직접 지정하세요.',
        },
      
        {
          title: '공휴일은 반영되지 않습니다',
          body: '영업일 계산은 토·일만 제외합니다. 설·추석은 음력이라 해마다 날짜가 바뀌고 대체공휴일 규정도 개정되므로 자동 반영하지 않습니다. 납기나 근무일을 확정할 때는 그해 공휴일표와 대조하세요.',
        },
        {
          title: '만 나이 통일과 예외',
          body: '2023년 6월부터 법령과 계약의 나이는 만 나이가 기준입니다. 다만 병역법과 청소년보호법은 여전히 연 나이를 씁니다. 술·담배 구매 기준이 생일과 무관하게 연초에 바뀌는 이유입니다.',
        },
      
        {
          title: '주민등록번호로 나이를 세지 마세요',
          body: '앞 6자리만으로는 1900년대와 2000년대 출생을 구분할 수 없습니다. 뒷자리 첫 숫자가 세기를 나타내지만 그 값을 다루는 것 자체가 민감정보 처리입니다. 나이가 필요하면 생년월일만 받는 편이 안전하고 법적으로도 간단합니다.',
        },
      ],
    },
    en: {
      heading: 'Working with ages and date spans',
      lead: 'Korean law and contracts moved to international age in June 2023, but documents still mix counting age and year age, which is why all three appear together. Date differences, D-day countdowns and adding or subtracting periods share the same screen, so it also covers working days and settlement dates.',
      cards: [
        {
          title: 'Three age counts',
          body: 'Exact age increases on the birthday. Korean counting age increases when the calendar year changes. Year age is simply the current year minus the birth year, used in conscription and youth protection law. The same person can differ by up to two years across the three.',
        },
        {
          title: 'Inclusive or exclusive days',
          body: 'Hotel nights, working days and event spans usually count the first day too, so both the plain difference and the inclusive count are shown. Check which one the contract wording means.',
        },
        {
          title: 'Everything stays local',
          body: 'Birth dates and target dates are calculated in the current browser and never sent to a server or stored. Nothing remains once the tab is closed.',
        },
      ],
      steps: [
        'Enter a birth date on the Age tab to see exact, Korean counting and year ages side by side.',
        'Change the reference date to view an age at a past or future point. Leave it blank to use today.',
        'On the Date difference tab, enter two dates to get days, inclusive days and weekdays excluding weekends.',
        'The D-day tab counts toward a target date; the Add tab shifts a base date by years, months, weeks, days or business days.',
      ],
      notes: [
        {
          title: 'Month math clamps to the last day',
          body: 'Adding one month to January 31 gives February 28, not March 3. The same clamping rule is used for the month portion of a date difference so the two features agree.',
        },
        {
          title: 'Business days skip weekends only',
          body: 'Only Saturday and Sunday are excluded. Public holidays change every year and are not applied, so the result can differ from an actual working calendar.',
        },
        {
          title: 'Time zone',
          body: "Today's date follows the device time zone. Away from Korea it can be a day off, so set the reference date explicitly when that matters.",
        },
      
        {
          title: 'Public holidays are not applied',
          body: 'Business-day math excludes Saturday and Sunday only. Lunar holidays move every year and substitute-holiday rules change, so they are not applied automatically. Cross-check against the official calendar when fixing a deadline.',
        },
        {
          title: 'Exceptions to the age rule',
          body: 'Since June 2023 Korean law and contracts use international age. Conscription and youth-protection law still use year age, which is why some age thresholds change at the start of the year rather than on a birthday.',
        },
      
        {
          title: 'Do not derive age from national ID numbers',
          body: 'The leading digits alone cannot distinguish a 1900s from a 2000s birth year, and the digit that resolves it is part of sensitive personal data. If you need an age, collect a birth date instead — safer and legally simpler.',
        },
      ],
    },
  },
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
      
        {
          title: '일자와 요일을 같이 쓰면 OR입니다',
          body: '세 번째 칸과 다섯 번째 칸을 둘 다 지정하면 대부분의 구현이 AND가 아니라 OR로 평가합니다. 자세한 설명과 대응은 크론탭 실전 가이드에 정리해 두었습니다.',
        },
        {
          title: '*/n 은 간격이 아니라 나머지입니다',
          body: '*/15는 15분마다가 아니라 "15로 나눈 나머지가 0"인 시각입니다. 그래서 7 */3 * * *는 3시간마다가 아니라 0·3·6·9시대의 7분에 돕니다. 지금부터 세는 간격이 아닙니다.',
        },
      
        {
          title: '환경변수와 PATH가 로그인 셸과 다릅니다',
          body: 'cron은 최소한의 환경으로 실행하므로 터미널에서 되던 명령이 command not found가 납니다. 절대 경로를 쓰거나 스크립트 첫 줄에서 필요한 환경을 직접 불러오세요. 파이썬 가상환경과 노드 버전 관리자가 특히 자주 걸립니다.',
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
      
        {
          title: 'Day-of-month and day-of-week are OR',
          body: 'Setting both the third and fifth fields makes most implementations combine them with OR, not AND. The crontab guide explains this and how to work around it.',
        },
        {
          title: 'Step values are modulo, not intervals',
          body: '*/15 matches minutes divisible by 15 rather than "every 15 minutes from now". So 7 */3 * * * fires at 00:07, 03:07, 06:07 and so on, not three hours from the current time.',
        },
      
        {
          title: 'The environment differs from your shell',
          body: 'Cron runs with a minimal environment, so a command that works in your terminal reports command not found. Use absolute paths or load the environment at the top of the script. Python virtualenvs and Node version managers are frequent offenders.',
        },
      ],
    },
  },
  '/qr': {
    ko: {
      heading: 'QR 코드 생성과 스캔 기준',
      lead: 'URL이나 Wi-Fi 정보를 QR로 만들어 모바일 테스트나 오프라인 안내문에 붙일 때 씁니다. 반대로 전달받은 QR 이미지를 올려 어떤 문자열이 들어 있는지 열기 전에 확인할 수도 있습니다. QR은 암호화가 아니라 문자열을 그림으로 바꾼 것이므로 누구나 읽을 수 있다는 점을 전제로 쓰세요.',
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
      
        {
          title: '스캔 실패의 대부분은 여백',
          body: '조용한 영역(quiet zone)이라 부르는 코드 주변 흰 여백이 모듈 4칸 이상 필요합니다. 이미지를 딱 맞게 잘라내거나 배경색 위에 바로 얹으면 카메라가 코드 경계를 못 찾습니다. 인쇄물에서 실패하면 대개 이것입니다.',
        },
        {
          title: 'QR은 암호화가 아닙니다',
          body: 'QR은 문자열을 그림으로 바꾼 것뿐이라 누구나 읽을 수 있습니다. Wi-Fi QR을 사무실 벽에 붙이면 사진 한 장으로 비밀번호가 복제됩니다. 게스트 네트워크를 따로 두는 편이 안전합니다.',
        },
      
        {
          title: '오류 정정 레벨을 올리면 더 커집니다',
          body: 'QR은 일부가 가려져도 읽히도록 여분 데이터를 넣습니다. 레벨을 높이면 손상에 강해지지만 같은 크기에서 모듈이 촘촘해집니다. 인쇄물에는 중간 레벨이 무난하고, 화면 표시용은 낮게 두어도 됩니다.',
        },
      ],
    },
    en: {
      heading: 'QR generation and scanning checks',
      lead: 'Turn a URL or Wi-Fi details into a QR code for mobile testing or printed notices. In reverse, upload a QR image you were sent to see what string it contains before opening it. A QR code is not encryption — it is a string rendered as a picture, readable by anyone.',
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
      
        {
          title: 'Most scan failures are the margin',
          body: 'The quiet zone around the code needs to be at least four modules wide. Cropping the image tight or placing it directly on a coloured background stops cameras from finding the code boundary. This is usually the cause of print failures.',
        },
        {
          title: 'A QR code is not encryption',
          body: 'A QR code is just a string rendered as an image, so anyone can read it. A Wi-Fi QR on an office wall means one photo copies the password. Use a separate guest network instead.',
        },
      
        {
          title: 'Higher error correction means denser codes',
          body: 'QR codes embed redundant data so they scan even when partly obscured. Raising the level adds resilience but packs more modules into the same area. Medium suits print; a lower level is fine on screen.',
        },
      ],
    },
  },
  '/diff': {
    ko: {
      heading: '텍스트 비교기 활용 포인트',
      lead: '설정 파일이나 API 응답처럼 비슷해 보이는 두 텍스트에서 무엇이 달라졌는지 찾는 일은 눈으로 하면 반드시 놓칩니다. 줄 단위로 비교해 추가·삭제를 표시하면 배포 전 검산이나 장애 원인 추적이 빨라집니다. 다만 줄 끝 문자나 들여쓰기가 바뀌면 전체가 변경으로 잡히니 포맷 변경과 내용 변경은 분리해서 보는 편이 좋습니다.',
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
      
        {
          title: '공백 변경이 전부 diff로 잡힙니다',
          body: '들여쓰기를 탭에서 공백으로 바꾸거나 줄 끝 공백이 정리되면 실제 내용이 같아도 모든 줄이 변경으로 보입니다. 리뷰 전에 포맷터를 한 번 돌려 포맷 변경과 로직 변경을 분리하는 편이 낫습니다.',
        },
        {
          title: '줄 단위 비교의 한계',
          body: '한 줄 안에서 단어 하나만 바뀌어도 그 줄 전체가 삭제·추가로 표시됩니다. 긴 문장이나 minify된 코드에서는 어디가 달라졌는지 알기 어렵습니다. 그럴 때는 줄을 먼저 나눈 뒤 비교하는 편이 읽힙니다.',
        },
      
        {
          title: '줄 끝 문자가 다르면 전체가 다릅니다',
          body: '윈도우는 CRLF, 리눅스와 맥은 LF로 줄을 끝냅니다. 서로 다른 환경에서 만든 파일을 비교하면 내용이 같아도 모든 줄이 변경으로 잡힙니다. git의 autocrlf 설정이나 에디터의 줄 끝 표시를 먼저 확인하세요.',
        },
      ],
    },
    en: {
      heading: 'Text diff workflow notes',
      lead: 'Spotting what changed between two similar texts — config files, API responses — is something the eye always misses. A line-by-line comparison marking additions and removals speeds up pre-deploy checks and incident tracing. Note that changed line endings or indentation flag everything, so keep formatting and content changes separate.',
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
      
        {
          title: 'Whitespace changes show up as diffs',
          body: 'Switching indentation from tabs to spaces, or trimming trailing spaces, marks every line as changed even when the content is identical. Run a formatter first so formatting and logic changes stay separate.',
        },
        {
          title: 'The limits of line-based comparison',
          body: 'Changing one word marks the whole line as removed and added. In long prose or minified code that hides what actually changed. Splitting into shorter lines before comparing makes it readable.',
        },
      
        {
          title: 'Different line endings mark everything changed',
          body: 'Windows uses CRLF while Linux and macOS use LF. Comparing files from different environments flags every line even when the content matches. Check your git autocrlf setting or the editor line-ending indicator first.',
        },
      ],
    },
  },
  '/color': {
    ko: {
      heading: '색상 변환과 대비 검토',
      lead: 'UI 색상을 정할 때 HEX, RGB, HSL을 오가며 같은 색인지 확인하는 일이 잦습니다. 여기서 세 표기를 한 번에 맞춰 보고, 흰색과 검은색 배경에서의 대비까지 확인할 수 있습니다. 대비는 색상이 아니라 밝기가 결정하므로 채도만 올려서는 읽히지 않는다는 점을 같이 보게 두었습니다.',
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
      
        {
          title: '대비는 색상이 아니라 밝기입니다',
          body: '대비 계산은 상대 휘도만 봅니다. 그래서 채도가 높은 두 색을 나란히 두어도 밝기가 비슷하면 대비가 낮게 나옵니다. 색만 바꾸지 말고 밝기 차이를 벌려야 실제로 읽힙니다.',
        },
        {
          title: '알파가 섞이면 계산이 달라집니다',
          body: '반투명 배경 위의 글자는 실제로 보이는 색이 뒤 배경과 합성된 결과입니다. 선언된 색만으로 대비를 계산하면 실제와 다른 값이 나옵니다. 겹친 레이어가 있으면 합성 후 색으로 확인해야 합니다.',
        },
      
        {
          title: 'HEX와 HSL은 왕복에서 값이 변합니다',
          body: 'HEX는 채널당 256단계이고 HSL은 각도와 백분율이라 변환할 때 반올림이 생깁니다. HEX에서 HSL로 갔다 돌아오면 한두 단계 달라질 수 있습니다. 디자인 토큰의 원본은 한 형식으로 정해두고 그것만 수정하세요.',
        },
      ],
    },
    en: {
      heading: 'Color conversion and contrast review',
      lead: 'Choosing UI colours means moving between HEX, RGB and HSL and checking they describe the same colour. All three notations line up here, alongside contrast against white and black backgrounds. Because contrast is determined by luminance rather than hue, raising saturation alone will not make text readable.',
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
      
        {
          title: 'Contrast is luminance, not hue',
          body: 'Contrast ratios use relative luminance only. Two vivid colours of similar brightness score badly no matter how different the hues are. Widen the lightness gap, not just the colour.',
        },
        {
          title: 'Alpha changes the calculation',
          body: 'Text on a semi-transparent background is actually rendered against whatever is behind it. Computing contrast from the declared colour alone gives the wrong answer; check the composited colour instead.',
        },
      
        {
          title: 'HEX and HSL drift on round trips',
          body: 'HEX has 256 steps per channel while HSL uses degrees and percentages, so conversion rounds. Going HEX to HSL and back can shift a step or two. Keep design tokens in one canonical format and edit only that.',
        },
      ],
    },
  },
  '/markdown': {
    ko: {
      heading: 'Markdown 미리보기 작성 흐름',
      lead: 'README, 릴리스 노트, 이슈 템플릿을 쓸 때 가장 번거로운 건 커밋하기 전까지 결과를 못 본다는 점입니다. 여기서 렌더링 결과와 HTML 출력을 같이 확인하면 표가 깨지거나 코드 블록이 열린 채 남는 문제를 미리 잡을 수 있습니다. 변환된 HTML을 복사해 메일이나 위키에 붙여넣는 용도로도 씁니다.',
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
      
        {
          title: '미리보기와 실제 렌더링은 다릅니다',
          body: 'GitHub, Notion, 티스토리가 각각 다른 마크다운 방언을 씁니다. 표, 각주, 체크박스, 줄바꿈 처리가 특히 갈립니다. 여기 미리보기에서 맞아도 최종 게시 위치에서 한 번 더 확인해야 합니다.',
        },
        {
          title: '한 줄 개행이 무시됩니다',
          body: '표준 마크다운은 줄 하나를 바꿔도 같은 문단으로 이어 붙입니다. 의도한 줄바꿈을 남기려면 줄 끝에 공백 두 개를 넣거나 빈 줄로 문단을 나눕니다. 붙여넣은 글이 한 덩어리로 나오는 이유가 이것입니다.',
        },
      
        {
          title: '코드 블록 안에서는 마크다운이 멈춥니다',
          body: '백틱 세 개로 감싼 구역 안의 별표나 밑줄은 서식이 아니라 그대로 출력됩니다. 반대로 코드 블록을 닫는 백틱을 빼먹으면 이후 문서 전체가 코드로 렌더링되므로, 미리보기가 갑자기 한 덩어리 회색으로 변하면 백틱 짝을 먼저 확인하세요.',
        },
      ],
    },
    en: {
      heading: 'Markdown preview workflow',
      lead: 'The awkward part of writing a README, release note or issue template is not seeing the result until you commit. Checking the rendered output and the generated HTML side by side catches broken tables and unclosed code fences beforehand. The converted HTML is also handy for pasting into mail or a wiki.',
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
      
        {
          title: 'Preview and final rendering differ',
          body: 'GitHub, Notion and blog platforms each use a different Markdown dialect. Tables, footnotes, checkboxes and line-break handling vary most. Matching here does not guarantee the same result where you publish.',
        },
        {
          title: 'Single line breaks are ignored',
          body: 'Standard Markdown joins a single newline into the same paragraph. To keep a break, end the line with two spaces or separate paragraphs with a blank line. This is why pasted text collapses into one block.',
        },
      
        {
          title: 'Markdown stops inside code fences',
          body: 'Asterisks and underscores inside a triple-backtick block render literally. Conversely, a missing closing fence renders the rest of the document as code — if the preview suddenly turns into one grey block, check the fence pairing first.',
        },
      ],
    },
  },
  '/convert': {
    ko: {
      heading: '단위 변환기 사용 기준',
      lead: '단위 변환은 계산이 어려운 게 아니라 어느 기준을 쓰는지가 문제입니다. 갤런은 미국과 영국이 다르고 톤도 세 가지가 있으며, 온도는 비율이 아니라 기준점 이동입니다. 길이·무게·온도를 한 화면에서 바꾸면서 값이 이상하면 기준을 다시 확인할 수 있게 두었습니다.',
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
      
        {
          title: '평과 제곱미터는 반올림에서 갈립니다',
          body: '1평은 정확히 3.3058㎡입니다. 부동산 표기는 3.3으로 줄여 쓰는 경우가 많아 20평대에서 이미 0.1평 이상 차이가 납니다. 계약서 면적을 확인할 때는 등기부의 ㎡ 값을 기준으로 보세요.',
        },
        {
          title: '온도는 비율이 아니라 이동입니다',
          body: '섭씨와 화씨는 0점이 다르므로 곱하기만으로 바꿀 수 없습니다. "20도의 두 배는 40도"가 성립하지 않는 이유입니다. 온도 차이를 변환할 때는 기준점 이동을 빼고 비율만 적용해야 합니다.',
        },
      
        {
          title: '단위 이름이 같아도 값이 다릅니다',
          body: '갤런은 미국과 영국이 다르고(약 3.79L 대 4.55L), 톤도 미터톤·미국톤·영국톤이 갈립니다. 해외 문서의 수치를 옮길 때는 단위 이름만 보지 말고 어느 기준인지 확인해야 합니다.',
        },
      ],
    },
    en: {
      heading: 'Unit conversion checklist',
      lead: 'Unit conversion is not hard arithmetic; the difficulty is which standard applies. Gallons differ between the US and UK, tons come in three kinds, and temperature is an offset rather than a ratio. Converting length, weight and temperature in one place makes it easy to re-check the basis when a number looks wrong.',
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
      
        {
          title: 'Rounding separates similar units',
          body: 'Traditional area units often get rounded in listings, and the gap becomes visible at larger sizes. When checking a contract, work from the official square-metre figure rather than the rounded local unit.',
        },
        {
          title: 'Temperature is an offset, not a ratio',
          body: 'Celsius and Fahrenheit have different zero points, so a plain multiplication is wrong. "Twice 20 degrees" is not 40 degrees. When converting a temperature difference, apply only the ratio and drop the offset.',
        },
      
        {
          title: 'Same unit name, different value',
          body: 'A gallon differs between the US and the UK (about 3.79 L versus 4.55 L), and tons split into metric, short and long. When transferring figures from foreign documents, confirm which standard is meant.',
        },
      ],
    },
  },
  '/file-hash': {
    ko: {
      heading: '파일 해시 계산 검증 흐름',
      lead: '배포 산출물이나 전달받은 파일이 중간에 깨지지 않았는지 확인하려면 해시를 비교하는 것이 가장 확실합니다. 여기서 계산한 값을 공개된 체크섬과 대조하면 됩니다. 파일 전체를 브라우저에서 읽어 처리하므로 서버로 올라가지 않고, 그래서 사내 파일 검증에도 쓸 수 있습니다.',
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
      
        {
          title: '해시가 다르면 파일이 다릅니다, 그 역은 아닙니다',
          body: '같은 해시는 사실상 같은 파일을 뜻하지만, 다운로드가 조금 깨져도 해시는 완전히 달라집니다. 그래서 "한 글자만 다른지" 같은 판단에는 쓸 수 없습니다. 그건 비교 도구의 일입니다.',
        },
        {
          title: '큰 파일은 시간이 걸립니다',
          body: '브라우저에서 해시를 계산하므로 파일 전체를 읽어야 합니다. 수 GB 파일은 기기 성능에 따라 오래 걸리거나 메모리에 걸립니다. 대신 파일이 서버로 올라가지 않으므로 사내 파일 검증에는 이 방식이 안전합니다.',
        },
      
        {
          title: 'SHA-1은 이제 무결성 확인용으로만',
          body: 'SHA-1은 충돌을 인위적으로 만들 수 있음이 증명돼 서명이나 보안 검증에는 쓰지 않습니다. 단순히 전송 중 파일이 깨졌는지 보는 용도로는 여전히 충분합니다. 보안이 걸린 곳에는 SHA-256 이상을 씁니다.',
        },
      ],
    },
    en: {
      heading: 'File hash verification workflow',
      lead: 'Comparing hashes is the reliable way to confirm a build artefact or received file was not corrupted in transit. Check the value computed here against the published checksum. The whole file is read in the browser and never uploaded, which makes it usable for internal files too.',
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
      
        {
          title: 'Different hashes mean different files, not the reverse',
          body: 'Matching hashes effectively mean identical files, but a slightly corrupted download produces a completely different hash. So a hash cannot tell you how much changed — that is a diff tool\'s job.',
        },
        {
          title: 'Large files take time',
          body: 'The hash is computed in your browser, so the whole file must be read. Multi-gigabyte files can be slow or hit memory limits. In exchange nothing is uploaded, which is what makes it safe for internal files.',
        },
      
        {
          title: 'SHA-1 is for integrity only now',
          body: 'Collisions in SHA-1 can be constructed deliberately, so it is unsuitable for signatures or security verification. It is still fine for checking whether a transfer corrupted a file. Use SHA-256 or stronger where security matters.',
        },
      ],
    },
  },
  '/image-base64': {
    ko: {
      heading: '이미지 Base64 변환 판단 기준',
      lead: '작은 아이콘이나 테스트 이미지를 코드에 직접 박아야 할 때 data URL로 바꿉니다. 요청 한 번을 줄이는 이득이 있지만 결과가 원본보다 33% 커지고 캐시가 안 되므로 정말 작은 이미지에만 맞습니다. 반대로 전달받은 data URL이 어떤 이미지인지 확인하려면 파일로 되돌려 열어보면 됩니다.',
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
      
        {
          title: 'Data URL은 33% 커집니다',
          body: 'Base64는 3바이트를 4글자로 바꾸므로 결과가 원본보다 약 3분의 1 커집니다. 아이콘처럼 아주 작은 이미지에서는 요청 한 번을 줄이는 이득이 크지만, 큰 이미지는 파일로 두고 캐시를 쓰는 편이 빠릅니다.',
        },
        {
          title: 'CSS에 넣으면 캐시가 안 됩니다',
          body: '이미지를 CSS 안에 Data URL로 박으면 이미지가 스타일시트의 일부가 됩니다. 이미지 하나만 바뀌어도 CSS 전체가 무효화되고, 브라우저가 이미지를 따로 캐시하지 못합니다. 자주 바뀌는 이미지는 넣지 마세요.',
        },
      
        {
          title: 'Data URL은 로그와 diff를 망칩니다',
          body: '한 줄이 수만 자가 되므로 git diff에서 변경 내역을 읽을 수 없고 코드 리뷰가 사실상 불가능해집니다. 에러 로그에 들어가면 로그 파일이 부풀어 다른 정보를 덮습니다. 소스에 박아둘 이미지는 정말 작은 것만 고르세요.',
        },
      ],
    },
    en: {
      heading: 'Image Base64 conversion guidance',
      lead: 'Converting a small icon or test image to a data URL lets you inline it in code. It saves a request, but the result is about 33% larger and cannot be cached separately, so it suits only genuinely tiny images. In the other direction, decoding a data URL back to a file shows you what you were sent.',
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
      
        {
          title: 'A data URL is about 33% larger',
          body: 'Base64 turns three bytes into four characters, so the result grows by roughly a third. For tiny icons, saving a request wins; for large images, a cacheable file is faster.',
        },
        {
          title: 'Inlining into CSS defeats caching',
          body: 'A data URL inside CSS makes the image part of the stylesheet. Changing one image invalidates the whole file, and the browser cannot cache the image separately. Do not inline images that change often.',
        },
      
        {
          title: 'Data URLs ruin logs and diffs',
          body: 'A single line of tens of thousands of characters makes git diffs unreadable and code review impractical. In an error log it drowns out everything else. Inline only genuinely tiny images.',
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
      
        {
          title: '약어에서 규칙이 갈립니다',
          body: 'HTTPServer를 camelCase로 바꿀 때 httpServer와 hTTPServer 중 무엇이 맞는지 언어와 린터마다 다릅니다. API, ID, URL 같은 약어가 든 이름은 자동 변환 결과를 그대로 쓰지 말고 한 번 확인하세요.',
        },
        {
          title: '숫자 경계 처리가 다릅니다',
          body: 'user2FA를 snake_case로 바꾸면 user_2_fa, user2_fa, user_2fa가 모두 나올 수 있습니다. 데이터베이스 컬럼명처럼 한 번 정하면 바꾸기 어려운 곳에는 숫자가 든 이름을 피하는 편이 안전합니다.',
        },
      
        {
          title: 'kebab-case는 코드에서 못 쓰는 곳이 많습니다',
          body: '하이픈은 대부분의 언어에서 뺄셈 연산자라 변수명에 쓸 수 없습니다. kebab-case는 CSS 클래스, URL 경로, 파일명처럼 식별자가 아닌 자리에서만 씁니다. 자바스크립트 객체 키로 쓰려면 따옴표와 대괄호 접근이 필요합니다.',
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
      
        {
          title: 'Acronyms break the rules',
          body: 'Converting HTTPServer to camelCase yields different results per language and linter. Names containing API, ID or URL need a manual check rather than trusting automatic conversion.',
        },
        {
          title: 'Digit boundaries differ',
          body: 'Converting user2FA to snake_case can give user_2_fa, user2_fa or user_2fa. Avoid digits in names that are hard to change later, such as database columns.',
        },
      
        {
          title: 'kebab-case is unusable in many places',
          body: 'A hyphen is a subtraction operator in most languages, so it cannot appear in a variable name. Reserve kebab-case for CSS classes, URL paths and filenames. Using it as a JavaScript object key requires quotes and bracket access.',
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
      
        {
          title: 'YAML의 따옴표 없는 값은 위험합니다',
          body: 'yes, no, on, off, null이 따옴표 없이 쓰이면 문자열이 아니라 불리언이나 널로 해석됩니다. 국가 코드 NO(노르웨이)가 false가 되는 것이 유명한 예입니다. 문자열이어야 하면 따옴표를 씁니다.',
        },
        {
          title: '들여쓰기에 탭을 쓸 수 없습니다',
          body: 'YAML 규격은 들여쓰기에 공백만 허용합니다. 에디터가 탭을 넣으면 파싱 오류가 나는데 화면상으로는 정상으로 보여 찾기 어렵습니다. YAML 파일에는 탭을 공백으로 변환하는 설정을 켜두세요.',
        },
      
        {
          title: 'YAML 앵커는 JSON으로 못 옮깁니다',
          body: 'YAML의 &앵커와 *별칭은 같은 블록을 재사용하는 문법인데 JSON에는 대응하는 개념이 없습니다. 변환하면 참조가 풀려 내용이 복제되므로 파일이 커지고, 되돌릴 때 원래 구조를 복원할 수 없습니다. 왕복이 필요하면 앵커를 쓰지 마세요.',
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
      
        {
          title: 'Unquoted YAML values are risky',
          body: 'Bare yes, no, on, off and null parse as booleans or null rather than strings. The country code NO becoming false is the classic example. Quote anything that must stay a string.',
        },
        {
          title: 'Tabs are not allowed for indentation',
          body: 'The YAML spec permits only spaces for indentation. An editor inserting tabs causes a parse error that looks fine on screen. Enable tab-to-space conversion for YAML files.',
        },
      
        {
          title: 'YAML anchors do not survive JSON',
          body: 'YAML anchors and aliases reuse a block, and JSON has no equivalent. Converting expands every reference, inflating the file, and the original structure cannot be restored on the way back. Avoid anchors if you need a round trip.',
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
      
        {
          title: '공인 IP와 내부 IP는 다릅니다',
          body: '여기 보이는 값은 인터넷에서 보이는 공인 IP입니다. 공유기 안쪽 기기의 192.168 주소는 브라우저가 알 수 없습니다. 방화벽에 등록할 주소가 필요하면 이 값이 맞고, 사내 장비를 찾는 거라면 다른 방법이 필요합니다.',
        },
        {
          title: 'User-Agent는 이제 신뢰할 수 없습니다',
          body: '브라우저들이 파편화를 막으려고 UA 문자열을 고정값으로 축소하고 있습니다. 버전이나 플랫폼 판별을 UA 파싱으로 하는 코드는 점점 틀리게 됩니다. 기능 감지(feature detection)를 쓰는 편이 맞습니다.',
        },
      
        {
          title: 'VPN과 프록시 뒤에서는 다른 값이 나옵니다',
          body: '회사 VPN이나 프록시를 거치면 여기 보이는 IP는 그 출구 서버의 주소입니다. 접속 제한을 등록할 때 자기 집 IP를 넣으려 했는데 회사 IP가 들어가는 실수가 여기서 나옵니다. VPN을 끄고 다시 확인하세요.',
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
      
        {
          title: 'Public and private IPs differ',
          body: 'The value shown is your public IP as seen from the internet. A browser cannot read the 192.168 address behind your router. For a firewall allowlist this is the right value; for finding a device on the LAN it is not.',
        },
        {
          title: 'User-Agent is no longer reliable',
          body: 'Browsers are freezing and reducing the UA string to limit fingerprinting. Code that parses UA for version or platform will increasingly be wrong. Use feature detection instead.',
        },
      
        {
          title: 'VPNs and proxies show a different value',
          body: 'Behind a corporate VPN or proxy, the IP shown is that exit server\'s address. This is how people end up allowlisting the office IP when they meant their home one. Disconnect and check again.',
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
      
        {
          title: '사용 가능한 호스트는 2개 적습니다',
          body: 'IPv4 서브넷에서 첫 주소는 네트워크 주소, 마지막은 브로드캐스트 주소로 예약됩니다. /24는 256개가 아니라 254개를 쓸 수 있습니다. /31과 /32는 예외로 점대점 링크와 단일 호스트에 씁니다.',
        },
        {
          title: '사설 주소 범위를 겹치지 않게',
          body: '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16이 사설 범위입니다. VPN이나 회사망 연결에서 양쪽이 같은 대역을 쓰면 라우팅이 충돌해 접속이 안 됩니다. 새 대역을 정할 때 흔한 192.168.0.0/24는 피하는 편이 낫습니다.',
        },
      
        {
          title: '서브넷 마스크와 프리픽스는 같은 것입니다',
          body: '255.255.255.0과 /24는 표기만 다른 같은 값입니다. 장비 설정 화면은 마스크를, 클라우드 콘솔과 문서는 프리픽스를 주로 씁니다. 둘을 오가며 계산할 일이 많으니 /24=256, /25=128처럼 절반씩 줄어드는 규칙을 익혀두면 빠릅니다.',
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
      
        {
          title: 'Two addresses are not usable',
          body: 'The first address in an IPv4 subnet is the network address and the last is the broadcast address. A /24 gives 254 usable hosts, not 256. /31 and /32 are exceptions, used for point-to-point links and single hosts.',
        },
        {
          title: 'Keep private ranges from overlapping',
          body: 'The private ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. If both sides of a VPN use the same block, routing collides and the link fails. When picking a new range, avoid the very common 192.168.0.0/24.',
        },
      
        {
          title: 'A subnet mask and a prefix are the same thing',
          body: '255.255.255.0 and /24 are two notations for one value. Device UIs tend to use masks while cloud consoles and docs use prefixes. Since you move between them often, remember that each step halves: /24 is 256, /25 is 128.',
        },
      ],
    },
  },
  '/image-optimize': {
    ko: {
      heading: '이미지 최적화 작업 흐름',
      lead: '블로그나 서비스에 이미지를 올리기 전에 용량과 화질 사이에서 어디까지 줄여도 되는지 판단해야 합니다. 크기, 품질, 출력 형식을 바꿔가며 결과를 바로 비교하면 그 지점을 눈으로 찾을 수 있습니다. 파일은 서버로 올라가지 않고 브라우저에서 처리되므로 공개 전 이미지나 사내 자료도 그대로 넣을 수 있습니다.',
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
      
        {
          title: 'WebP가 항상 작지는 않습니다',
          body: '사진에서는 WebP가 JPEG보다 작지만, 색이 적은 로고나 스크린샷은 PNG가 더 작을 수 있습니다. 투명도가 필요하면 JPEG는 후보에서 빠집니다. 세 형식으로 한 번씩 내보내 크기를 비교하는 편이 확실합니다.',
        },
        {
          title: '메타데이터와 회전 정보',
          body: '휴대폰 사진은 EXIF에 촬영 위치와 방향이 들어 있습니다. 압축 과정에서 EXIF가 지워지면 세로로 찍은 사진이 눕는 경우가 있고, 반대로 남겨두면 위치 정보가 함께 공개됩니다. 공개할 이미지라면 지우는 쪽이 맞습니다.',
        },
      
        {
          title: '한 번 줄인 화질은 되돌아오지 않습니다',
          body: 'JPEG와 WebP는 손실 압축이라 저장할 때마다 정보가 사라집니다. 압축한 파일을 다시 압축하면 품질이 계단식으로 떨어집니다. 원본을 보관하고 필요할 때마다 원본에서 새로 내보내는 편이 맞습니다.',
        },
      ],
    },
    en: {
      heading: 'Image optimization workflow',
      lead: 'Before uploading an image you have to decide how far you can compress before the quality shows. Adjusting dimensions, quality and output format while comparing results lets you find that point by eye. Files are processed in the browser rather than uploaded, so unreleased or internal images are fine to drop in.',
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
      
        {
          title: 'WebP is not always smaller',
          body: 'WebP beats JPEG on photographs, but a flat-colour logo or screenshot can be smaller as PNG. If transparency is required, JPEG is out. Exporting all three and comparing sizes is the reliable check.',
        },
        {
          title: 'Metadata and orientation',
          body: 'Phone photos carry EXIF location and orientation. Stripping EXIF during compression can leave a portrait photo sideways; keeping it publishes the location. For public images, stripping is the right default.',
        },
      
        {
          title: 'Lost quality does not come back',
          body: 'JPEG and WebP are lossy, so each save discards information. Recompressing an already-compressed file degrades it in steps. Keep the original and export fresh from it each time.',
        },
      ],
    },
  },
  '/ocr': {
    ko: {
      heading: 'OCR 텍스트 추출 기준',
      lead: '스캔한 PDF나 휴대폰으로 찍은 문서에서는 텍스트 추출이 빈 결과를 내놓습니다. 페이지 전체가 이미지 한 장이라 파일 안에 글자 데이터가 없기 때문입니다. 그럴 때 이미지에서 글자를 찾아 복사 가능한 문자열로 만드는 것이 OCR입니다. 인식률은 해상도가 좌우하므로 축소한 스크린샷보다 원본을 넣는 편이 낫습니다.',
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
      
        {
          title: '인식률은 해상도가 좌우합니다',
          body: '글자 높이가 20픽셀 아래로 내려가면 인식이 급격히 떨어집니다. 화면을 축소해 찍은 스크린샷보다 원본 해상도로 다시 캡처하는 편이 훨씬 낫습니다. 기울어진 사진은 먼저 수평을 맞추세요.',
        },
        {
          title: '표와 다단 편집은 순서가 섞입니다',
          body: 'OCR은 글자를 찾는 일이고 문서 구조를 이해하지는 않습니다. 표는 셀 구분이 사라지고 2단 편집은 좌우가 번갈아 나옵니다. 결과를 그대로 쓰기보다 정리 단계를 두는 편이 빠릅니다.',
        },
      
        {
          title: '숫자와 유사 문자를 조심하세요',
          body: '0과 O, 1과 l과 I, 5와 S는 인식이 자주 뒤바뀝니다. 계좌번호, 주문번호, 시리얼처럼 한 글자가 치명적인 값은 반드시 눈으로 대조해야 합니다. 자동으로 다음 단계에 넘기는 파이프라인에는 검증을 두세요.',
        },
      ],
    },
    en: {
      heading: 'OCR text extraction guidance',
      lead: 'Text extraction returns nothing from a scanned PDF or a photographed document, because the page is a single image with no character data inside. OCR finds the characters in that image and turns them into copyable text. Accuracy depends on resolution, so use the original rather than a downscaled screenshot.',
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
      
        {
          title: 'Resolution drives accuracy',
          body: 'Recognition drops sharply once character height falls below about 20 pixels. Recapturing at native resolution beats a downscaled screenshot. Straighten skewed photos before running OCR.',
        },
        {
          title: 'Tables and columns come out interleaved',
          body: 'OCR finds characters; it does not understand document structure. Tables lose their cell boundaries and two-column layouts alternate left and right. Plan a cleanup step rather than using the raw output.',
        },
      
        {
          title: 'Watch for lookalike characters',
          body: '0 and O, 1 and l and I, 5 and S are frequently confused. Values where one character matters — account numbers, order IDs, serials — need a visual check. Put validation in any pipeline that forwards OCR output automatically.',
        },
      ],
    },
  },
  '/text-stats': {
    ko: {
      heading: '글자수 세기 활용',
      lead: '자기소개서와 리포트에는 대개 글자수 제한이 붙는데, 기업과 학교마다 공백을 세는지가 다릅니다. 공백 포함과 제외를 동시에 보여주는 이유가 그것입니다. 여기에 단어·문장·문단 수와 원고지 분량, 바이트 수를 함께 내므로 SMS 길이나 데이터베이스 컬럼 제한을 맞출 때도 그대로 씁니다. 입력하는 즉시 다시 계산되므로 줄이면서 확인할 수 있습니다.',
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
      
        {
          title: '자기소개서 글자수는 기준이 다릅니다',
          body: '기업마다 공백 포함과 제외 중 무엇을 세는지 다르고, 지원 시스템이 자동으로 세는 값이 최종입니다. 공백 포함 기준이 대개 더 엄격하니 그 숫자로 맞춰두면 양쪽 다 통과합니다.',
        },
        {
          title: '이모지와 일부 한글은 2글자로 셉니다',
          body: '자바스크립트 문자열 길이는 UTF-16 단위라서 이모지 하나가 2로 셉니다. 조합형 문자나 피부색 변형이 붙은 이모지는 더 늘어납니다. SMS나 입력 제한을 다룰 때는 이 차이가 실제로 문제가 됩니다.',
        },
      
        {
          title: '읽기 시간은 추정치입니다',
          body: '분당 200단어를 가정한 값입니다. 기술 문서나 코드가 섞인 글은 훨씬 느리게 읽히고, 훑어 읽는 경우는 더 빠릅니다. 블로그에 "5분 읽기"를 표기할 때 참고값으로 쓰되 정확한 지표로 제시하지는 마세요.',
        },
      ],
    },
    en: {
      heading: 'Text statistics workflow',
      lead: 'Application essays and reports usually come with a character limit, and organisations differ on whether spaces count — which is why both figures are shown together. Word, sentence and paragraph counts, manuscript pages and byte length are included too, so the same screen works for SMS limits and database column constraints. Everything recalculates as you type, so you can trim while watching the number.',
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
      
        {
          title: 'Application character limits vary',
          body: 'Employers differ on whether spaces count, and the value the application system computes is the one that binds. The with-spaces count is usually the stricter one, so fitting that number satisfies both.',
        },
        {
          title: 'Emoji count as two characters',
          body: 'JavaScript string length counts UTF-16 units, so a single emoji counts as two — more for combining sequences or skin-tone variants. This matters when working with SMS limits or input constraints.',
        },
      
        {
          title: 'Reading time is an estimate',
          body: 'It assumes about 200 words per minute. Technical writing and code read much slower, while skimming is faster. Use it as a rough label rather than presenting it as a precise metric.',
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
      
        {
          title: '대소문자가 다르면 다른 캠페인입니다',
          body: 'GA는 utm 값의 대소문자를 구분합니다. Google과 google이 별도 소스로 집계되어 보고서가 갈라집니다. 소문자로 통일하는 규칙을 정해두고 팀에서 지키는 것이 유일한 해법입니다.',
        },
        {
          title: '내부 링크에는 붙이지 마세요',
          body: '사이트 안에서 이동하는 링크에 utm을 붙이면 세션이 끊기고 새 유입으로 잡힙니다. 원래 유입 경로가 지워져 어디서 왔는지 알 수 없게 됩니다. utm은 외부에서 들어오는 링크에만 씁니다.',
        },
      
        {
          title: 'utm_content와 utm_term의 차이',
          body: 'utm_term은 원래 유료 검색의 키워드를 담는 자리이고, utm_content는 같은 캠페인 안에서 소재를 구분하는 자리입니다. A/B 테스트로 배너 두 개를 돌린다면 utm_content로 나눠야 보고서에서 소재별 성과가 보입니다.',
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
      
        {
          title: 'Case differences split your campaigns',
          body: 'Analytics treats UTM values as case-sensitive, so Google and google become separate sources and your reports fragment. Agreeing on lowercase and holding to it is the only real fix.',
        },
        {
          title: 'Never tag internal links',
          body: 'UTM parameters on links inside your own site break the session and register a new acquisition, erasing the original source. Tag only links arriving from outside.',
        },
      
        {
          title: 'utm_content versus utm_term',
          body: 'utm_term was designed for paid-search keywords, while utm_content distinguishes creatives within one campaign. For an A/B test of two banners, split them with utm_content so per-creative performance shows in reports.',
        },
      ],
    },
  },
  '/text-cleaner': {
    ko: {
      heading: '텍스트 정리기 작업 흐름',
      lead: '웹이나 PDF에서 복사한 글에는 눈에 안 보이는 공백과 제로 폭 문자가 섞여 들어옵니다. 그대로 코드나 데이터로 넘기면 문자열 비교가 실패하고 검색도 안 걸립니다. 중복 줄 제거, 공백 정리, 정렬, slugify를 한 화면에서 처리해 붙여넣은 텍스트를 쓸 수 있는 상태로 만듭니다.',
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
      
        {
          title: '보이지 않는 문자가 남습니다',
          body: '웹이나 PDF에서 복사한 글에는 줄바꿈 없는 공백(U+00A0), 제로 폭 공백(U+200B), 방향 표시 문자가 섞여 들어옵니다. 눈으로는 공백과 같지만 코드에서 문자열 비교가 실패하고 검색도 안 걸립니다. 공백 정리를 먼저 돌리는 이유입니다.',
        },
        {
          title: 'slugify는 언어에 따라 결과가 다릅니다',
          body: '한글을 slug로 만들면 도구마다 로마자 변환, 제거, 퍼센트 인코딩 중 하나를 고릅니다. URL에 쓸 slug라면 어떤 방식인지 정해두고 팀 안에서 통일해야 나중에 링크가 갈리지 않습니다.',
        },
      
        {
          title: '중복 제거는 순서를 바꿉니다',
          body: '중복 줄을 지우면 처음 나온 위치만 남으므로 원본의 순서 정보가 일부 사라집니다. 로그처럼 순서가 의미 있는 데이터라면 중복을 지우기 전에 원본을 따로 보관하세요. 정렬 후 중복 제거는 순서를 완전히 잃습니다.',
        },
      ],
    },
    en: {
      heading: 'Text cleaning workflow',
      lead: 'Text copied from the web or a PDF carries invisible whitespace and zero-width characters. Passed straight into code or data, they break string comparison and search. Deduplication, whitespace cleanup, sorting and slugify in one place get pasted text into a usable state.',
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
      
        {
          title: 'Invisible characters survive copying',
          body: 'Text copied from the web or a PDF carries non-breaking spaces (U+00A0), zero-width spaces (U+200B) and directional marks. They look like spaces but break string comparison and search. That is why whitespace cleanup comes first.',
        },
        {
          title: 'Slugify results depend on the language',
          body: 'Turning non-Latin text into a slug gives different output per tool: transliteration, removal, or percent-encoding. Pick one convention for URLs and keep the team consistent, or links will diverge later.',
        },
      
        {
          title: 'Deduplication changes order',
          body: 'Removing duplicate lines keeps only the first occurrence, discarding some ordering information. For data where order matters, such as logs, keep the original before deduplicating. Sorting then deduplicating loses the order entirely.',
        },
      ],
    },
  },
  '/api-tester': {
    ko: {
      heading: 'API 요청 테스트 안전 사용',
      lead: 'API 응답을 재현해 문서에 남기거나 버그를 신고할 때 요청을 그대로 옮겨 적을 수 있어야 합니다. 메서드, 헤더, 본문을 채워 보내고 응답과 cURL 형태를 같이 확인하면 그 절차가 짧아집니다. 다만 브라우저에서 보내는 요청이라 상대 서버가 CORS를 허용하지 않으면 응답을 읽을 수 없습니다.',
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
      
        {
          title: 'CORS는 서버가 정하는 것입니다',
          body: '브라우저에서 다른 도메인으로 요청하면 그 서버가 허용 헤더를 보내지 않으면 응답을 읽을 수 없습니다. 이건 도구 문제가 아니라 브라우저 보안 모델입니다. 서버가 허용하지 않는 API는 터미널의 curl이나 서버 측에서 호출해야 합니다.',
        },
        {
          title: '요청 헤더에 토큰을 넣을 때',
          body: '여기 입력한 값은 브라우저를 벗어나지 않지만, 화면에 그대로 남고 브라우저 확장도 읽을 수 있습니다. 운영 환경의 액세스 토큰보다 만료가 짧은 테스트용 토큰을 쓰는 편이 안전합니다.',
        },
      
        {
          title: 'GET과 HEAD에는 본문이 없습니다',
          body: '규격상 GET 요청에 본문을 넣을 수 있지만 대부분의 서버와 프록시가 무시하거나 거부합니다. 조건이 복잡한 조회는 쿼리 파라미터로 넣거나 POST로 바꾸는 편이 실제로 동작합니다. 응답이 비어 있으면 이것부터 확인하세요.',
        },
      ],
    },
    en: {
      heading: 'Safe API request testing',
      lead: 'Reproducing an API response for documentation or a bug report means being able to write the request down exactly. Filling in method, headers and body and seeing both the response and the cURL form shortens that. Note that requests originate in the browser, so a server that does not permit CORS will block reading the response.',
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
      
        {
          title: 'CORS is the server\'s decision',
          body: 'A cross-origin request from a browser cannot be read unless that server sends permitting headers. This is the browser security model, not a tool limitation. APIs that do not allow it must be called from a terminal or your own server.',
        },
        {
          title: 'When you paste a token in a header',
          body: 'Values entered here stay in your browser, but they remain visible on screen and extensions can read them. Prefer a short-lived test token over a production access token.',
        },
      
        {
          title: 'GET and HEAD have no body',
          body: 'The spec technically allows a body on GET, but most servers and proxies ignore or reject it. Complex queries work better as query parameters or as a POST. If a response is empty, check this first.',
        },
      ],
    },
  },
};
