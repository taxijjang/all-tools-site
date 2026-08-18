// 도구별 실제 입력/결과 예시와 자주 만나는 오류.
// TOOL_SUPPORT_COPY와 경로 기준으로 병합된다(vite.config.js getToolSupportCopy).
// 별도 파일인 이유: tool-support-copy.js가 이미 1,400줄이라 항목마다 끼워 넣으면 diff를 읽기 어렵다.
export const TOOL_SUPPORT_EXTRA = {
  '/cron': {
    ko: {
      examples: [
        {
          title: '평일 아침 배치',
          input: '0 9 * * 1-5',
          output: '매주 월요일부터 금요일까지 09:00에 실행',
          note: '요일은 0이 일요일입니다. 1-5는 월요일부터 금요일까지를 뜻합니다.',
        },
        {
          title: '15분 간격 헬스체크',
          input: '*/15 * * * *',
          output: '매시 00, 15, 30, 45분에 실행',
        },
        {
          title: '매월 1일 자정',
          input: '0 0 1 * *',
          output: '매월 1일 00:00에 실행',
        },
      ],
      troubles: [
        {
          title: '일요일이 0인지 7인지 헷갈릴 때',
          body: '표준 cron에서 0과 7은 모두 일요일입니다. 다만 구현체마다 7을 거부하는 경우가 있어 0을 쓰는 편이 안전합니다.',
        },
        {
          title: '필드가 5개인지 6개인지',
          body: '유닉스 cron은 분·시·일·월·요일 5개 필드입니다. Spring이나 Quartz는 맨 앞에 초 필드가 붙어 6개입니다. 5개짜리를 Quartz에 넣으면 의미가 한 칸씩 밀립니다.',
        },
        {
          title: '다음 실행 시간이 예상과 다를 때',
          body: '일(日)과 요일을 동시에 지정하면 대부분의 구현이 둘 중 하나만 맞아도 실행합니다. AND가 아니라 OR입니다. 서버 타임존과 서머타임도 함께 확인하세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Weekday morning batch',
          input: '0 9 * * 1-5',
          output: 'Runs at 09:00, Monday through Friday',
          note: 'Day-of-week starts at 0 for Sunday, so 1-5 means Monday to Friday.',
        },
        {
          title: 'Health check every 15 minutes',
          input: '*/15 * * * *',
          output: 'Runs at minute 00, 15, 30, and 45 of every hour',
        },
        {
          title: 'Midnight on the first of the month',
          input: '0 0 1 * *',
          output: 'Runs at 00:00 on day 1 of every month',
        },
      ],
      troubles: [
        {
          title: 'Is Sunday 0 or 7?',
          body: 'Standard cron accepts both, but some implementations reject 7. Using 0 is the safer choice.',
        },
        {
          title: 'Five fields or six?',
          body: 'Unix cron uses five fields: minute, hour, day, month, weekday. Spring and Quartz prepend a seconds field for six. A five-field expression pasted into Quartz shifts every value by one position.',
        },
        {
          title: 'The next run time looks wrong',
          body: 'When both day-of-month and day-of-week are set, most implementations run if either matches — an OR, not an AND. Check the server timezone and daylight saving as well.',
        },
      ],
    },
  },

  '/json-yaml': {
    ko: {
      examples: [
        {
          title: 'JSON을 YAML로',
          input: '{"name":"api","port":8080,"debug":false}',
          output: 'name: api\nport: 8080\ndebug: false',
        },
        {
          title: '중첩 구조',
          input: '{"db":{"host":"localhost","ports":[5432,5433]}}',
          output: 'db:\n  host: localhost\n  ports:\n    - 5432\n    - 5433',
        },
      ],
      troubles: [
        {
          title: '따옴표 없는 no가 false로 바뀔 때',
          body: 'YAML 1.1은 no, yes, on, off를 불리언으로 해석합니다. 노르웨이 국가코드 NO가 false가 되는 이 문제는 흔히 Norway problem이라 부릅니다. 문자열로 남기려면 따옴표로 감싸세요.',
        },
        {
          title: '들여쓰기가 깨질 때',
          body: 'YAML은 탭을 들여쓰기로 인정하지 않습니다. 반드시 공백을 쓰고, 한 파일 안에서 폭을 통일하세요.',
        },
        {
          title: '앞자리 0이 사라질 때',
          body: '010-1234-5678 같은 값이나 08 같은 숫자는 8진수 또는 숫자로 해석될 수 있습니다. 전화번호, 우편번호, 버전 문자열은 따옴표로 감싸는 것이 안전합니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'JSON to YAML',
          input: '{"name":"api","port":8080,"debug":false}',
          output: 'name: api\nport: 8080\ndebug: false',
        },
        {
          title: 'Nested structures',
          input: '{"db":{"host":"localhost","ports":[5432,5433]}}',
          output: 'db:\n  host: localhost\n  ports:\n    - 5432\n    - 5433',
        },
      ],
      troubles: [
        {
          title: 'Unquoted "no" turns into false',
          body: 'YAML 1.1 reads no, yes, on, and off as booleans. The country code NO becoming false is known as the Norway problem. Quote the value to keep it a string.',
        },
        {
          title: 'Indentation breaks',
          body: 'YAML does not accept tabs for indentation. Use spaces and keep the width consistent across the file.',
        },
        {
          title: 'Leading zeros disappear',
          body: 'Values like 08 or a phone number can be parsed as octal or numeric. Quote phone numbers, postal codes, and version strings.',
        },
      ],
    },
  },

  '/ip-cidr': {
    ko: {
      examples: [
        {
          title: '일반적인 사설 서브넷',
          input: '192.168.0.0/24',
          output: '네트워크 192.168.0.0\n브로드캐스트 192.168.0.255\n호스트 범위 192.168.0.1 ~ 192.168.0.254\n사용 가능 호스트 254개',
        },
        {
          title: '더 작게 쪼갠 블록',
          input: '10.0.8.0/22',
          output: '네트워크 10.0.8.0\n브로드캐스트 10.0.11.255\n호스트 범위 10.0.8.1 ~ 10.0.11.254\n사용 가능 호스트 1,022개',
        },
      ],
      troubles: [
        {
          title: '호스트 수가 2개 모자랄 때',
          body: '주소 총량에서 네트워크 주소와 브로드캐스트 주소를 뺀 값이 실제 사용 가능 호스트입니다. /24는 256개가 아니라 254개입니다.',
        },
        {
          title: '/31과 /32는 계산이 다릅니다',
          body: '/32는 호스트 하나를 가리키고, /31은 라우터 간 point-to-point 링크용으로 브로드캐스트 없이 주소 2개를 모두 씁니다(RFC 3021).',
        },
        {
          title: 'prefix가 클수록 네트워크는 작습니다',
          body: '/24보다 /26이 더 작은 네트워크입니다. 숫자가 커질수록 호스트 수는 줄어듭니다. 보안 그룹이나 방화벽 규칙을 쓸 때 자주 뒤집혀 나가는 부분입니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A common private subnet',
          input: '192.168.0.0/24',
          output: 'Network 192.168.0.0\nBroadcast 192.168.0.255\nHost range 192.168.0.1 - 192.168.0.254\nUsable hosts 254',
        },
        {
          title: 'A larger block',
          input: '10.0.8.0/22',
          output: 'Network 10.0.8.0\nBroadcast 10.0.11.255\nHost range 10.0.8.1 - 10.0.11.254\nUsable hosts 1,022',
        },
      ],
      troubles: [
        {
          title: 'The host count is two short',
          body: 'Usable hosts exclude the network address and the broadcast address. A /24 gives 254 usable hosts, not 256.',
        },
        {
          title: '/31 and /32 behave differently',
          body: 'A /32 identifies a single host. A /31 is used for point-to-point router links and uses both addresses with no broadcast (RFC 3021).',
        },
        {
          title: 'A bigger prefix means a smaller network',
          body: 'A /26 is smaller than a /24. As the number grows the host count shrinks — a common inversion when writing firewall or security group rules.',
        },
      ],
    },
  },

  '/case-convert': {
    ko: {
      examples: [
        {
          title: '한 입력에서 모든 표기로',
          input: 'user profile image',
          output: 'camelCase   userProfileImage\nPascalCase  UserProfileImage\nsnake_case  user_profile_image\nkebab-case  user-profile-image\nCONSTANT    USER_PROFILE_IMAGE',
        },
        {
          title: '기존 코드 식별자 변환',
          input: 'getHTTPResponseCode',
          output: 'snake_case  get_http_response_code\nkebab-case  get-http-response-code',
          note: '연속된 대문자 약어는 구현마다 끊는 위치가 달라 결과가 갈리는 대표적인 입력입니다.',
        },
      ],
      troubles: [
        {
          title: '약어가 이상하게 쪼개질 때',
          body: 'HTTP, ID, URL 같은 연속 대문자는 경계를 판단하기 어렵습니다. getHTTPResponse가 get_h_t_t_p_response로 갈라지는 도구도 있습니다. 변환 후 약어 부분은 눈으로 확인하세요.',
        },
        {
          title: '숫자 경계 처리',
          body: 'user2Name 같은 입력에서 숫자 앞뒤를 단어 경계로 볼지가 도구마다 다릅니다. DB 컬럼명처럼 되돌릴 수 없는 곳에 쓰기 전에 결과를 확인하세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'One input, every convention',
          input: 'user profile image',
          output: 'camelCase   userProfileImage\nPascalCase  UserProfileImage\nsnake_case  user_profile_image\nkebab-case  user-profile-image\nCONSTANT    USER_PROFILE_IMAGE',
        },
        {
          title: 'Converting an existing identifier',
          input: 'getHTTPResponseCode',
          output: 'snake_case  get_http_response_code\nkebab-case  get-http-response-code',
          note: 'Consecutive uppercase acronyms are where implementations disagree most.',
        },
      ],
      troubles: [
        {
          title: 'Acronyms split in odd places',
          body: 'Runs of capitals like HTTP, ID, or URL are hard to segment. Some tools turn getHTTPResponse into get_h_t_t_p_response. Check acronyms by eye after converting.',
        },
        {
          title: 'Digit boundaries',
          body: 'Tools disagree on whether the digits in user2Name form a word boundary. Verify before using the result somewhere irreversible, like a database column name.',
        },
      ],
    },
  },

  '/color': {
    ko: {
      examples: [
        {
          title: '같은 색의 세 가지 표기',
          input: '#2DD4BF',
          output: 'HEX  #2DD4BF\nRGB  rgb(45, 212, 191)\nHSL  hsl(173, 66%, 50%)',
        },
        {
          title: '본문 텍스트 대비 검사',
          input: '전경 #64748B / 배경 #FFFFFF',
          output: '대비비 4.76:1\n본문 AA 통과 · AAA 미달',
          note: 'WCAG 기준은 본문 AA 4.5:1, AAA 7:1이고 큰 텍스트는 AA 3:1입니다.',
        },
      ],
      troubles: [
        {
          title: '디자인은 예쁜데 접근성 검사에서 걸릴 때',
          body: '밝은 배경의 연회색 텍스트가 가장 흔한 탈락 사례입니다. 4.5:1을 못 넘기면 명도를 낮추거나 글자 크기를 키워 큰 텍스트 기준(3:1)으로 맞추세요.',
        },
        {
          title: '투명도가 계산에 안 들어갈 때',
          body: '대비비는 최종적으로 눈에 보이는 색으로 계산해야 합니다. 반투명 색은 배경과 합성된 뒤의 실제 색을 넣어야 정확합니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'One color in three notations',
          input: '#2DD4BF',
          output: 'HEX  #2DD4BF\nRGB  rgb(45, 212, 191)\nHSL  hsl(173, 66%, 50%)',
        },
        {
          title: 'Body text contrast check',
          input: 'Foreground #64748B on background #FFFFFF',
          output: 'Contrast ratio 4.76:1\nPasses AA for body text, fails AAA',
          note: 'WCAG asks for 4.5:1 (AA) and 7:1 (AAA) on body text, and 3:1 for large text.',
        },
      ],
      troubles: [
        {
          title: 'It looks fine but fails the audit',
          body: 'Light grey text on a light background is the most common failure. If you cannot reach 4.5:1, darken the text or increase the size to qualify for the 3:1 large-text threshold.',
        },
        {
          title: 'Transparency is not accounted for',
          body: 'Contrast must be computed on the color the eye actually sees. For semi-transparent colors, enter the composited result rather than the source value.',
        },
      ],
    },
  },

  '/text-cleaner': {
    ko: {
      examples: [
        {
          title: '중복 제거와 정렬',
          input: 'banana\napple\nbanana\ncherry\napple',
          output: 'apple\nbanana\ncherry',
        },
        {
          title: 'slug 만들기',
          input: '  Hello   World – 2026 Edition!  ',
          output: 'hello-world-2026-edition',
        },
      ],
      troubles: [
        {
          title: '눈에 안 보이는 공백이 남을 때',
          body: '웹에서 복사한 텍스트에는 일반 공백이 아닌 non-breaking space(U+00A0)나 제로폭 문자가 섞여 있는 경우가 많습니다. 눈으로는 같아 보여도 비교나 정렬에서 다르게 취급됩니다.',
        },
        {
          title: '한글 slug가 사라질 때',
          body: 'slug는 보통 ASCII만 남기므로 한글 제목은 통째로 지워질 수 있습니다. 한글 URL을 쓸 계획이면 slug 대신 인코딩된 원문을 쓰는 편이 낫습니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Dedupe and sort',
          input: 'banana\napple\nbanana\ncherry\napple',
          output: 'apple\nbanana\ncherry',
        },
        {
          title: 'Building a slug',
          input: '  Hello   World – 2026 Edition!  ',
          output: 'hello-world-2026-edition',
        },
      ],
      troubles: [
        {
          title: 'Invisible whitespace survives',
          body: 'Text copied from the web often carries non-breaking spaces (U+00A0) or zero-width characters. They look identical but compare and sort differently.',
        },
        {
          title: 'Non-ASCII titles vanish in a slug',
          body: 'Slugs usually keep ASCII only, so a Korean or Japanese title can be stripped entirely. If you plan to use non-ASCII URLs, keep the encoded original instead.',
        },
      ],
    },
  },

  '/diff': {
    ko: {
      examples: [
        {
          title: '설정 값 변경 확인',
          input: '왼쪽\ntimeout: 30\nretries: 3\n\n오른쪽\ntimeout: 60\nretries: 3',
          output: '- timeout: 30\n+ timeout: 60\n  retries: 3',
        },
      ],
      troubles: [
        {
          title: '아무것도 안 바꿨는데 전체가 다르게 나올 때',
          body: '줄바꿈 문자가 다른 경우입니다. 윈도우는 CRLF, macOS와 리눅스는 LF를 씁니다. 편집기나 git 설정이 다르면 모든 줄이 변경으로 잡힙니다.',
        },
        {
          title: '한 글자만 바꿨는데 줄 전체가 표시될 때',
          body: '줄 단위 비교라 그렇습니다. 긴 줄에서 어느 글자가 바뀌었는지 봐야 한다면 줄을 나눠서 비교하는 편이 빠릅니다.',
        },
        {
          title: '탭과 공백이 섞였을 때',
          body: '화면에서는 같은 폭으로 보여도 다른 문자입니다. 들여쓰기만 다른 차이가 잔뜩 잡히면 먼저 공백 정규화를 하고 비교하세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Spotting a config change',
          input: 'Left\ntimeout: 30\nretries: 3\n\nRight\ntimeout: 60\nretries: 3',
          output: '- timeout: 30\n+ timeout: 60\n  retries: 3',
        },
      ],
      troubles: [
        {
          title: 'Everything differs but you changed nothing',
          body: 'The line endings differ. Windows uses CRLF while macOS and Linux use LF. Mismatched editor or git settings mark every line as changed.',
        },
        {
          title: 'One character changed but the whole line is flagged',
          body: 'Comparison is line based. To find the exact character on a long line, split it into shorter lines before comparing.',
        },
        {
          title: 'Tabs mixed with spaces',
          body: 'They render at the same width but are different characters. If you see a wall of indentation-only differences, normalize whitespace first.',
        },
      ],
    },
  },

  '/image-base64': {
    ko: {
      examples: [
        {
          title: '작은 아이콘을 data URL로',
          input: 'icon.png (1.2 KB)',
          output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
          note: 'CSS나 HTML에 그대로 붙여 넣으면 추가 요청 없이 표시됩니다.',
        },
      ],
      troubles: [
        {
          title: '용량이 오히려 늘어날 때',
          body: 'Base64는 원본보다 약 33% 커집니다. 수십 KB가 넘는 이미지를 data URL로 넣으면 HTML/CSS 파일이 무거워져 첫 렌더링이 느려집니다. 작은 아이콘에만 쓰세요.',
        },
        {
          title: '브라우저 캐시가 안 먹을 때',
          body: 'data URL은 문서에 포함되므로 이미지 단위 캐싱이 되지 않습니다. 여러 페이지에서 재사용하는 이미지는 일반 파일로 두는 편이 낫습니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A small icon as a data URL',
          input: 'icon.png (1.2 KB)',
          output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
          note: 'Paste it straight into CSS or HTML and the image renders with no extra request.',
        },
      ],
      troubles: [
        {
          title: 'The file gets bigger',
          body: 'Base64 adds roughly 33% to the original size. Embedding images larger than a few dozen KB bloats the HTML or CSS and slows first render. Reserve it for small icons.',
        },
        {
          title: 'Browser caching stops working',
          body: 'A data URL lives inside the document, so it cannot be cached as a separate image. Keep images reused across pages as normal files.',
        },
      ],
    },
  },

  '/file-hash': {
    ko: {
      examples: [
        {
          title: '다운로드 파일 무결성 확인',
          input: 'ubuntu-24.04.iso',
          output: 'SHA-256\n9b2e1f...c47a3d',
          note: '배포처가 공개한 체크섬과 한 글자라도 다르면 파일이 손상됐거나 변조된 것입니다.',
        },
      ],
      troubles: [
        {
          title: '대소문자가 달라 다르게 보일 때',
          body: '16진수 표기는 대소문자 구분이 없습니다. 9B2E와 9b2e는 같은 값이므로 비교 전에 한쪽으로 통일하세요.',
        },
        {
          title: '큰 파일에서 브라우저가 멈출 때',
          body: '파일을 메모리에 올려 계산하므로 기가바이트 단위 파일은 탭이 버거울 수 있습니다. 큰 파일은 OS 명령(shasum, certutil)을 쓰는 편이 빠릅니다.',
        },
        {
          title: 'SHA-1 결과를 신뢰해도 되는지',
          body: 'SHA-1은 충돌 공격이 실증되어 보안 검증 용도로는 부적합합니다. 무결성 확인에는 SHA-256 이상을 쓰세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Verifying a download',
          input: 'ubuntu-24.04.iso',
          output: 'SHA-256\n9b2e1f...c47a3d',
          note: 'If a single character differs from the published checksum, the file is corrupted or tampered with.',
        },
      ],
      troubles: [
        {
          title: 'Case differences look like a mismatch',
          body: 'Hex digests are case insensitive. 9B2E and 9b2e are the same value — normalize the case before comparing.',
        },
        {
          title: 'The browser stalls on large files',
          body: 'Hashing happens in memory, so multi-gigabyte files can overwhelm the tab. Use an OS command such as shasum or certutil for those.',
        },
        {
          title: 'Can you trust a SHA-1 result?',
          body: 'SHA-1 has demonstrated collision attacks and is unsuitable for security verification. Use SHA-256 or stronger.',
        },
      ],
    },
  },

  '/utm-builder': {
    ko: {
      examples: [
        {
          title: '뉴스레터 캠페인 링크',
          input: 'url       https://example.com/pricing\nsource    newsletter\nmedium    email\ncampaign  2026_summer',
          output: 'https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=2026_summer',
        },
      ],
      troubles: [
        {
          title: '리포트에서 같은 캠페인이 둘로 나뉠 때',
          body: 'UTM 값은 대소문자를 구분합니다. Email과 email이 별도 항목으로 집계됩니다. 팀 전체가 소문자만 쓰기로 정해두면 이 문제가 사라집니다.',
        },
        {
          title: 'source와 medium 구분이 헷갈릴 때',
          body: 'source는 어디에서 왔는지(naver, newsletter), medium은 어떤 방식인지(cpc, email, social)입니다. 둘을 섞어 쓰면 나중에 채널별 집계가 불가능해집니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A newsletter campaign link',
          input: 'url       https://example.com/pricing\nsource    newsletter\nmedium    email\ncampaign  2026_summer',
          output: 'https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=2026_summer',
        },
      ],
      troubles: [
        {
          title: 'One campaign splits into two rows',
          body: 'UTM values are case sensitive, so Email and email are counted separately. Agreeing on lowercase across the team removes the problem.',
        },
        {
          title: 'source versus medium',
          body: 'source is where the traffic came from (naver, newsletter); medium is how it arrived (cpc, email, social). Mixing them makes channel reporting impossible later.',
        },
      ],
    },
  },

  '/text-stats': {
    ko: {
      examples: [
        {
          title: '짧은 문단 분석',
          input: '개발자 도구는 반복 작업을 줄여줍니다.\n브라우저에서 바로 실행됩니다.',
          output: '글자 수(공백 포함) 38\n글자 수(공백 제외) 34\n단어 수 8\n줄 수 2\n읽기 시간 약 1분 미만',
        },
      ],
      troubles: [
        {
          title: '다른 도구와 글자 수가 다를 때',
          body: '공백과 줄바꿈을 세는지가 도구마다 다릅니다. 자기소개서나 지원서처럼 제한이 있는 글은 제출처가 어느 기준을 쓰는지 먼저 확인하세요.',
        },
        {
          title: '한글 단어 수가 이상할 때',
          body: '단어 수는 보통 공백을 기준으로 셉니다. 조사가 붙는 한국어는 영어와 계산 방식이 달라 영문 기준 단어 수와 직접 비교하기 어렵습니다.',
        },
        {
          title: '이모지가 2글자로 세어질 때',
          body: '일부 이모지는 내부적으로 두 개 이상의 코드 단위로 저장됩니다. 표시상 한 글자여도 길이 계산에서는 더 크게 잡힐 수 있습니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A short paragraph',
          input: 'Developer tools cut down repetitive work.\nThey run right in the browser.',
          output: 'Characters (with spaces) 70\nCharacters (no spaces) 60\nWords 11\nLines 2\nReading time under 1 minute',
        },
      ],
      troubles: [
        {
          title: 'Another tool reports a different count',
          body: 'Tools differ on whether spaces and line breaks count. For anything with a hard limit, check which rule the destination uses first.',
        },
        {
          title: 'Word counts across languages',
          body: 'Word counting is usually space based. Languages that attach particles or do not separate words with spaces will not line up with English word counts.',
        },
        {
          title: 'Emoji count as two characters',
          body: 'Some emoji are stored as more than one code unit. A single visible glyph can add more than one to the length.',
        },
      ],
    },
  },

  '/markdown': {
    ko: {
      examples: [
        {
          title: '표와 코드 블록',
          input: '| 이름 | 값 |\n| --- | --- |\n| port | 8080 |\n\n```js\nconst a = 1;\n```',
          output: '표로 렌더링되고 코드 블록에는 문법 강조가 적용됩니다.',
        },
      ],
      troubles: [
        {
          title: '줄바꿈이 무시될 때',
          body: '표준 Markdown은 한 번의 엔터를 줄바꿈으로 보지 않습니다. 줄 끝에 공백 두 칸을 넣거나 빈 줄로 문단을 나누세요.',
        },
        {
          title: '표나 체크박스가 안 그려질 때',
          body: '표, 취소선, 할 일 목록은 GitHub Flavored Markdown 확장입니다. CommonMark만 지원하는 렌더러에서는 원문 그대로 보입니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Tables and code blocks',
          input: '| name | value |\n| --- | --- |\n| port | 8080 |\n\n```js\nconst a = 1;\n```',
          output: 'The table renders as a grid and the code block gets syntax highlighting.',
        },
      ],
      troubles: [
        {
          title: 'Single line breaks disappear',
          body: 'Standard Markdown ignores a single newline. End the line with two spaces or separate paragraphs with a blank line.',
        },
        {
          title: 'Tables or checkboxes do not render',
          body: 'Tables, strikethrough, and task lists are GitHub Flavored Markdown extensions. A CommonMark-only renderer shows the raw text.',
        },
      ],
    },
  },

  '/qr': {
    ko: {
      examples: [
        {
          title: '링크 QR',
          input: 'https://taxijjang.com/json',
          output: '스캔하면 해당 주소로 바로 이동하는 QR 코드',
        },
        {
          title: 'Wi-Fi 접속 QR',
          input: 'WIFI:T:WPA;S:CafeGuest;P:hello2026;;',
          output: '스캔하면 비밀번호 입력 없이 해당 네트워크에 연결',
          note: 'T는 보안 방식, S는 네트워크 이름, P는 비밀번호입니다. 끝의 세미콜론 두 개까지 있어야 인식됩니다.',
        },
      ],
      troubles: [
        {
          title: '인쇄하면 인식이 안 될 때',
          body: '내용이 길수록 격자가 조밀해집니다. 명함처럼 작게 인쇄할 거라면 긴 URL은 단축한 뒤 만드세요. 주변 여백(quiet zone)도 최소 4모듈은 남겨야 합니다.',
        },
        {
          title: '가운데 로고를 넣었더니 안 읽힐 때',
          body: 'QR은 오류 정정 기능이 있어 일부 가림을 견디지만 한계가 있습니다. 로고를 넣을 계획이면 오류 정정 레벨을 H로 올리고 가림 면적을 30% 이하로 두세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A link QR code',
          input: 'https://taxijjang.com/json',
          output: 'Scanning opens that address directly',
        },
        {
          title: 'A Wi-Fi QR code',
          input: 'WIFI:T:WPA;S:CafeGuest;P:hello2026;;',
          output: 'Scanning joins the network without typing the password',
          note: 'T is the security type, S the network name, P the password. The two trailing semicolons are required.',
        },
      ],
      troubles: [
        {
          title: 'It scans on screen but not in print',
          body: 'Longer content packs the grid more densely. Shorten long URLs before generating for small print, and keep a quiet zone of at least four modules around the code.',
        },
        {
          title: 'Adding a center logo breaks it',
          body: 'Error correction tolerates some obstruction, but not unlimited. If you plan to overlay a logo, raise the error correction level to H and cover less than 30% of the area.',
        },
      ],
    },
  },

  '/image-optimize': {
    ko: {
      examples: [
        {
          title: '사진을 WebP로',
          input: 'photo.jpg 2.4 MB / 4032×3024',
          output: 'photo.webp 310 KB / 1600×1200\n약 87% 감소',
        },
      ],
      troubles: [
        {
          title: '투명 배경이 검게 변할 때',
          body: 'JPEG는 투명도를 지원하지 않습니다. 투명 PNG를 JPEG로 바꾸면 투명 부분이 검정이나 흰색으로 채워집니다. 투명이 필요하면 WebP나 PNG로 유지하세요.',
        },
        {
          title: '다시 압축할수록 흐려질 때',
          body: 'JPEG와 WebP는 손실 압축입니다. 이미 압축된 파일을 다시 압축하면 화질 저하가 누적됩니다. 항상 원본에서 시작하세요.',
        },
        {
          title: '용량이 거의 안 줄 때',
          body: '이미 최적화된 파일이거나 해상도가 그대로인 경우입니다. 대개 품질 수치보다 가로 크기를 실제 표시 크기로 줄이는 쪽이 효과가 큽니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A photo converted to WebP',
          input: 'photo.jpg 2.4 MB / 4032×3024',
          output: 'photo.webp 310 KB / 1600×1200\nabout 87% smaller',
        },
      ],
      troubles: [
        {
          title: 'Transparent areas turn black',
          body: 'JPEG has no alpha channel. Converting a transparent PNG to JPEG fills those pixels with black or white. Keep WebP or PNG when transparency matters.',
        },
        {
          title: 'Quality degrades with each pass',
          body: 'JPEG and WebP are lossy. Recompressing an already compressed file stacks the loss. Always start from the original.',
        },
        {
          title: 'The size barely drops',
          body: 'The file is probably already optimized, or the dimensions are unchanged. Reducing the pixel width to the actual display size usually beats lowering the quality value.',
        },
      ],
    },
  },

  '/ocr': {
    ko: {
      examples: [
        {
          title: '스크린샷에서 문구 추출',
          input: '오류 메시지가 담긴 스크린샷 (PNG)',
          output: 'Connection refused: could not connect to server at 127.0.0.1:5432',
          note: '오류 메시지를 다시 타이핑하지 않고 바로 검색하거나 붙여 넣을 수 있습니다.',
        },
      ],
      troubles: [
        {
          title: '글자가 뭉개져 나올 때',
          body: '해상도가 가장 큰 변수입니다. 확대해서 다시 캡처하거나, 스캔이라면 300 DPI 이상으로 받으세요. 기울어진 사진은 수평을 맞추면 정확도가 확 올라갑니다.',
        },
        {
          title: '한글과 영어가 섞이면 정확도가 떨어질 때',
          body: '인식 언어를 지정하면 결과가 나아집니다. 다만 한 이미지에 두 언어가 섞이면 어느 쪽이든 오인식이 늘어나므로 결과는 반드시 검수하세요.',
        },
        {
          title: '손글씨가 안 읽힐 때',
          body: '이 도구는 인쇄체를 전제로 합니다. 손글씨 인식은 별도 모델이 필요해 기대만큼 나오지 않습니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Pulling text out of a screenshot',
          input: 'A PNG screenshot of an error dialog',
          output: 'Connection refused: could not connect to server at 127.0.0.1:5432',
          note: 'Search or paste the message without retyping it.',
        },
      ],
      troubles: [
        {
          title: 'Characters come out garbled',
          body: 'Resolution matters most. Recapture zoomed in, or scan at 300 DPI or higher. Straightening a skewed photo also lifts accuracy sharply.',
        },
        {
          title: 'Mixed languages reduce accuracy',
          body: 'Selecting the recognition language helps, but a single image containing two scripts raises the error rate either way. Always proofread the output.',
        },
        {
          title: 'Handwriting is not recognized',
          body: 'This tool assumes printed text. Handwriting needs a different class of model and will not perform well here.',
        },
      ],
    },
  },

  '/ip-ua': {
    ko: {
      examples: [
        {
          title: 'User-Agent 해석',
          input: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          output: '브라우저 Chrome 131\nOS macOS\n엔진 WebKit/Blink',
        },
      ],
      troubles: [
        {
          title: '표시된 IP가 실제 위치와 다를 때',
          body: 'VPN, 회사 프록시, 모바일 캐리어 NAT를 거치면 출구 서버의 IP가 보입니다. IP 기반 위치는 참고용이며 정확한 위치 판단에 쓰기 어렵습니다.',
        },
        {
          title: 'OS 버전이 10_15_7로 고정돼 보일 때',
          body: '크롬은 개인정보 보호를 위해 User-Agent에 담기는 정보를 줄이고 있습니다(User-Agent Reduction). 최신 macOS에서도 10_15_7로 고정 표기되므로 실제 버전이 필요하면 Client Hints를 써야 합니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Reading a User-Agent string',
          input: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          output: 'Browser Chrome 131\nOS macOS\nEngine WebKit/Blink',
        },
      ],
      troubles: [
        {
          title: 'The IP does not match your location',
          body: 'A VPN, corporate proxy, or mobile carrier NAT shows the exit server address. IP-based geolocation is indicative only.',
        },
        {
          title: 'The OS version is frozen at 10_15_7',
          body: 'Chrome reduces the detail it reports in the User-Agent for privacy. Newer macOS versions still report 10_15_7, so use Client Hints when you need the real version.',
        },
      ],
    },
  },

  '/convert': {
    ko: {
      examples: [
        {
          title: '길이 변환',
          input: '100 km',
          output: '62.1371 mile\n328,084 ft\n100,000 m',
        },
        {
          title: '온도 변환',
          input: '25 °C',
          output: '77 °F\n298.15 K',
        },
      ],
      troubles: [
        {
          title: '온도만 계산이 다른 이유',
          body: '길이나 무게는 배율만 곱하면 되지만 온도는 기준점이 달라 오프셋이 들어갑니다. 0°C는 0°F가 아니라 32°F입니다. 온도 차이를 변환할 때와 온도 값을 변환할 때 결과가 다르다는 점도 주의하세요.',
        },
        {
          title: '문서에 넣을 때 자릿수가 지저분할 때',
          body: '결과는 계산값을 그대로 보여줍니다. 보고서나 UI에 넣을 때는 필요한 자릿수로 반올림하고 단위 표기를 함께 정리하세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Length',
          input: '100 km',
          output: '62.1371 mile\n328,084 ft\n100,000 m',
        },
        {
          title: 'Temperature',
          input: '25 °C',
          output: '77 °F\n298.15 K',
        },
      ],
      troubles: [
        {
          title: 'Why temperature behaves differently',
          body: 'Length and weight are pure scaling, but temperature scales have different zero points and need an offset. 0°C is 32°F, not 0°F. Converting a temperature difference is also not the same as converting a temperature.',
        },
        {
          title: 'Too many decimal places for a document',
          body: 'The result shows the raw computed value. Round to the precision you need and settle the unit notation before publishing.',
        },
      ],
    },
  },

  '/api-tester': {
    ko: {
      examples: [
        {
          title: '요청을 cURL로 변환',
          input: 'GET https://api.example.com/users?limit=10\nAuthorization: Bearer <token>',
          output: "curl 'https://api.example.com/users?limit=10' \\\n  -H 'Authorization: Bearer <token>'",
          note: '팀에 재현 방법을 공유할 때 cURL 한 줄이 가장 확실합니다.',
        },
      ],
      troubles: [
        {
          title: 'CORS 오류가 날 때',
          body: '브라우저에서 보내는 요청이라 대상 서버가 CORS를 허용하지 않으면 응답을 읽을 수 없습니다. 서버 문제가 아니라 브라우저 보안 정책이며, 같은 요청도 터미널의 cURL에서는 성공합니다.',
        },
        {
          title: '민감한 값을 넣기 전에',
          body: '이 도구는 입력한 주소로 실제 요청을 보냅니다. 운영 토큰이나 개인정보는 테스트용 값으로 바꾸고, 결과를 공유할 때는 헤더를 가리세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Turning a request into cURL',
          input: 'GET https://api.example.com/users?limit=10\nAuthorization: Bearer <token>',
          output: "curl 'https://api.example.com/users?limit=10' \\\n  -H 'Authorization: Bearer <token>'",
          note: 'A single cURL line is the most reliable way to hand a repro to a teammate.',
        },
      ],
      troubles: [
        {
          title: 'CORS errors',
          body: 'The request goes out from the browser, so you cannot read the response unless the target server allows CORS. It is a browser policy rather than a server fault — the same request succeeds from cURL in a terminal.',
        },
        {
          title: 'Before you paste anything sensitive',
          body: 'This tool sends a real request to the address you enter. Swap production tokens and personal data for test values, and mask headers before sharing results.',
        },
      ],
    },
  },

  '/url': {
    ko: {
      examples: [
        {
          title: '한글이 든 쿼리',
          input: 'https://example.com/search?q=개발자 도구',
          output: 'https://example.com/search?q=%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EB%8F%84%EA%B5%AC',
        },
        {
          title: '전체 URL과 파라미터 값의 차이',
          input: 'https://a.com/b?next=https://c.com/d',
          output: 'encodeURI          https://a.com/b?next=https://c.com/d\nencodeURIComponent https%3A%2F%2Fa.com%2Fb%3Fnext%3D...',
          note: 'encodeURI는 :와 /를 남겨 URL 전체를 인코딩할 때 쓰고, 파라미터 값 하나를 넣을 때는 encodeURIComponent를 써야 합니다.',
        },
      ],
      troubles: [
        {
          title: '%2520처럼 %25가 끼어 있을 때',
          body: '이중 인코딩입니다. 이미 인코딩된 문자열을 한 번 더 인코딩하면 %가 %25로 바뀝니다. 디코딩을 두 번 해야 원문이 나오고, 원인은 대개 코드에서 인코딩을 두 곳에서 하고 있는 것입니다.',
        },
        {
          title: '+가 공백으로 안 바뀔 때',
          body: '+를 공백으로 해석하는 것은 form 전송(application/x-www-form-urlencoded) 규칙입니다. 일반 URL 디코딩에서는 +가 플러스 그대로 남습니다.',
        },
        {
          title: '슬래시를 인코딩해야 할지',
          body: '경로 구분자로 쓰이는 /는 그대로 두고, 파라미터 값 안에 들어가는 /는 %2F로 인코딩해야 합니다. 리다이렉트 URL을 파라미터로 넘길 때 자주 문제가 됩니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'A query with non-ASCII characters',
          input: 'https://example.com/search?q=developer tools',
          output: 'https://example.com/search?q=developer%20tools',
        },
        {
          title: 'Whole URL versus a single parameter value',
          input: 'https://a.com/b?next=https://c.com/d',
          output: 'encodeURI          https://a.com/b?next=https://c.com/d\nencodeURIComponent https%3A%2F%2Fa.com%2Fb%3Fnext%3D...',
          note: 'encodeURI keeps : and / for encoding a full URL. Use encodeURIComponent when the string goes inside one parameter value.',
        },
      ],
      troubles: [
        {
          title: 'You see %2520 or a stray %25',
          body: 'That is double encoding. Encoding an already-encoded string turns % into %25. You need two decode passes, and the cause is usually code that encodes in two places.',
        },
        {
          title: 'A + does not decode to a space',
          body: 'Treating + as a space is a form-encoding rule (application/x-www-form-urlencoded). Plain URL decoding leaves + as a literal plus.',
        },
        {
          title: 'Should slashes be encoded?',
          body: 'Leave / alone when it separates path segments, but encode it as %2F inside a parameter value. This bites most often when passing a redirect URL as a parameter.',
        },
      ],
    },
  },

  '/timestamp': {
    ko: {
      examples: [
        {
          title: '초 단위 epoch 변환',
          input: '1767225600',
          output: '2026-01-01 00:00:00 UTC\n2026-01-01 09:00:00 KST',
        },
        {
          title: '밀리초 단위 값',
          input: '1767225600000',
          output: '2026-01-01 00:00:00 UTC',
          note: '자릿수가 10개면 초, 13개면 밀리초입니다. 이 기준으로 먼저 구분하세요.',
        },
      ],
      troubles: [
        {
          title: '날짜가 1970년으로 나올 때',
          body: '밀리초 값을 초로 해석했거나 그 반대입니다. 1000배 차이라 밀리초를 초로 읽으면 5만 년 후가, 초를 밀리초로 읽으면 1970년 초가 나옵니다.',
        },
        {
          title: '9시간이 어긋날 때',
          body: 'epoch는 항상 UTC 기준입니다. 표시할 때 로컬 타임존이 적용되어 한국은 +9시간입니다. 로그를 비교할 때는 양쪽이 어느 기준으로 찍혔는지 먼저 확인하세요.',
        },
        {
          title: '2038년 문제',
          body: '32비트 부호 있는 정수로 초를 저장하면 2038년 1월 19일에 넘칩니다. 오래된 시스템이나 DB 컬럼 타입을 다룰 때는 64비트인지 확인해두는 편이 좋습니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Seconds since epoch',
          input: '1767225600',
          output: '2026-01-01 00:00:00 UTC',
        },
        {
          title: 'A millisecond value',
          input: '1767225600000',
          output: '2026-01-01 00:00:00 UTC',
          note: 'Ten digits means seconds, thirteen means milliseconds. Check the digit count first.',
        },
      ],
      troubles: [
        {
          title: 'The date comes out as 1970',
          body: 'A millisecond value was read as seconds, or the reverse. The factor of 1000 puts milliseconds-as-seconds tens of thousands of years out, and seconds-as-milliseconds back in early 1970.',
        },
        {
          title: 'The result is off by a fixed number of hours',
          body: 'Epoch values are always UTC. Display applies your local timezone. When comparing logs, confirm which basis each side recorded.',
        },
        {
          title: 'The year 2038 problem',
          body: 'Storing seconds in a signed 32-bit integer overflows on 19 January 2038. When touching legacy systems or database column types, confirm the field is 64-bit.',
        },
      ],
    },
  },

  '/hash': {
    ko: {
      examples: [
        {
          title: '문자열 SHA-256',
          input: 'hello',
          output: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        },
        {
          title: 'HEX와 Base64 출력 비교',
          input: 'hello (SHA-256)',
          output: 'HEX     2cf24dba5fb0a3...938b9824\nBase64  LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=',
          note: '같은 해시를 다르게 표기한 것입니다. 검증 대상이 어느 표기를 쓰는지 맞춰야 합니다.',
        },
      ],
      troubles: [
        {
          title: '해시를 되돌리려 할 때',
          body: '해시는 암호화가 아니라 단방향 함수입니다. 복호화할 수 없습니다. 원문을 알아내는 유일한 방법은 후보를 대입해 같은 해시가 나오는지 확인하는 것뿐입니다.',
        },
        {
          title: '비밀번호를 SHA-256으로 저장하려 할 때',
          body: 'SHA 계열은 의도적으로 빠르게 설계되어 무차별 대입에 취약합니다. 비밀번호 저장에는 salt와 반복 비용이 포함된 bcrypt, scrypt, Argon2를 쓰세요.',
        },
        {
          title: '같은 값인데 해시가 다를 때',
          body: '입력 끝에 개행이 붙었는지 확인하세요. 파일이나 에디터에서 복사하면 마지막 줄바꿈이 함께 들어와 전혀 다른 해시가 나옵니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'SHA-256 of a string',
          input: 'hello',
          output: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        },
        {
          title: 'HEX versus Base64 output',
          input: 'hello (SHA-256)',
          output: 'HEX     2cf24dba5fb0a3...938b9824\nBase64  LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=',
          note: 'Same digest, different notation. Match whatever the verifying side expects.',
        },
      ],
      troubles: [
        {
          title: 'Trying to reverse a hash',
          body: 'Hashing is a one-way function, not encryption. There is no decryption. The only way back is guessing candidates and comparing digests.',
        },
        {
          title: 'Storing passwords with SHA-256',
          body: 'SHA functions are deliberately fast, which makes brute force cheap. Use bcrypt, scrypt, or Argon2, which add salting and a tunable work factor.',
        },
        {
          title: 'Same text, different digest',
          body: 'Check for a trailing newline. Copying from a file or editor often carries the final line break, producing a completely different hash.',
        },
      ],
    },
  },

  '/regex': {
    ko: {
      examples: [
        {
          title: '그룹으로 날짜 형식 바꾸기',
          input: '패턴  (\\d{4})-(\\d{2})-(\\d{2})\n치환  $3/$2/$1\n대상  2026-08-11',
          output: '11/08/2026',
        },
        {
          title: '탐욕적 수량자와 게으른 수량자',
          input: '대상  <b>one</b><b>two</b>\n패턴A <b>.*</b>\n패턴B <b>.*?</b>',
          output: 'A  <b>one</b><b>two</b>  (전체를 한 번에)\nB  <b>one</b>            (가장 짧게)',
          note: '.*는 최대한 길게, .*?는 최대한 짧게 잡습니다. 태그나 인용부호를 다룰 때 결과가 갈리는 지점입니다.',
        },
      ],
      troubles: [
        {
          title: '점(.)이 모든 걸 잡아버릴 때',
          body: '.는 줄바꿈을 제외한 모든 문자입니다. 여기에 *가 붙으면 의도한 종료 지점을 지나쳐 끝까지 삼킵니다. .*? 로 바꾸거나 [^<]* 처럼 문자 집합을 좁히세요.',
        },
        {
          title: '특수문자를 그대로 찾고 싶을 때',
          body: '. + * ? ( ) [ ] { } | ^ $ \\ 는 정규식 문법 문자입니다. 문자 그대로 찾으려면 앞에 백슬래시를 붙이세요. 예를 들어 소수점은 \\. 입니다.',
        },
        {
          title: '같은 정규식이 두 번째 호출에서 실패할 때',
          body: 'JavaScript에서 g 플래그가 붙은 정규식 객체는 lastIndex를 기억합니다. test나 exec를 반복 호출하면 이전 위치부터 검색합니다. 매번 새로 만들거나 lastIndex를 0으로 되돌리세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Reordering a date with capture groups',
          input: 'Pattern  (\\d{4})-(\\d{2})-(\\d{2})\nReplace  $3/$2/$1\nSubject  2026-08-11',
          output: '11/08/2026',
        },
        {
          title: 'Greedy versus lazy quantifiers',
          input: 'Subject  <b>one</b><b>two</b>\nA        <b>.*</b>\nB        <b>.*?</b>',
          output: 'A  <b>one</b><b>two</b>  (matches everything)\nB  <b>one</b>            (shortest match)',
          note: '.* takes as much as possible, .*? as little as possible. This is where tag and quote matching diverges.',
        },
      ],
      troubles: [
        {
          title: 'A dot swallows everything',
          body: '. matches any character except a newline. Combined with * it runs past your intended stop. Switch to .*? or narrow the class, for example [^<]*.',
        },
        {
          title: 'Matching a literal special character',
          body: '. + * ? ( ) [ ] { } | ^ $ \\ are syntax characters. Prefix a backslash to match them literally — a literal period is \\.',
        },
        {
          title: 'The same regex fails on the second call',
          body: 'In JavaScript a regex object with the g flag remembers lastIndex, so repeated test or exec calls resume from the previous position. Recreate the regex each time or reset lastIndex to 0.',
        },
      ],
    },
  },

  '/password': {
    ko: {
      examples: [
        {
          title: '길이 20, 모든 문자셋',
          input: '길이 20 · 대문자·소문자·숫자·기호 포함',
          output: 'K7#mQ2vL!xR9pT4wZ&nB',
        },
        {
          title: '기호를 못 받는 사이트용',
          input: '길이 24 · 영문과 숫자만',
          output: 'h4Kq9mZt2RvL7xPw3BnY6sDc',
          note: '기호를 뺀 만큼 길이를 늘리면 같은 수준의 강도를 유지할 수 있습니다.',
        },
      ],
      troubles: [
        {
          title: '문자 종류보다 길이가 중요합니다',
          body: '기호를 섞은 8자리보다 소문자만 쓴 16자리가 훨씬 강합니다. 사이트가 허용하는 최대 길이를 먼저 채우고, 그다음 문자 종류를 늘리세요.',
        },
        {
          title: '외우려 하지 마세요',
          body: '무작위 비밀번호는 기억하기 어려운 것이 정상입니다. 비밀번호 관리자에 저장하고 사이트마다 다른 값을 쓰는 편이, 외우기 쉬운 비밀번호를 재사용하는 것보다 안전합니다.',
        },
        {
          title: '생성된 값이 서버에 전송되는지',
          body: '생성은 브라우저의 암호학적 난수 생성기(crypto.getRandomValues)로 이루어지며 값이 전송되지 않습니다. 다만 공용 PC에서는 사용 후 탭을 닫고 클립보드를 비우세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Length 20, all character sets',
          input: 'Length 20 with upper, lower, digits, and symbols',
          output: 'K7#mQ2vL!xR9pT4wZ&nB',
        },
        {
          title: 'For sites that reject symbols',
          input: 'Length 24, letters and digits only',
          output: 'h4Kq9mZt2RvL7xPw3BnY6sDc',
          note: 'Adding length compensates for the missing symbol set at the same strength.',
        },
      ],
      troubles: [
        {
          title: 'Length beats character variety',
          body: 'Sixteen lowercase characters are far stronger than eight mixed with symbols. Fill the maximum length the site allows first, then widen the character set.',
        },
        {
          title: 'Do not try to memorize it',
          body: 'Random passwords are supposed to be unmemorable. Storing a unique one per site in a password manager is safer than reusing something you can recall.',
        },
        {
          title: 'Is the generated value sent anywhere?',
          body: 'Generation uses the browser cryptographic random source (crypto.getRandomValues) and the value is not transmitted. On a shared machine, still close the tab and clear the clipboard when done.',
        },
      ],
    },
  },

  '/uuid-v4-v7': {
    ko: {
      examples: [
        {
          title: 'v4와 v7을 나란히 놓고 보기',
          input: '같은 순간에 각각 3개 생성',
          output:
            'v4  f47ac10b-58cc-4372-a567-0e02b2c3d479\nv4  1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed\nv4  7c9e6679-7425-40de-944b-e07fc1f90ae7\n\nv7  01923f8a-1c4d-7000-8a3b-9f2e1d4c5b6a\nv7  01923f8a-1c51-7000-8a3b-2c7d9e4f1a3b\nv7  01923f8a-1c55-7000-8a3b-6b1a8c2d7e9f',
          note: 'v7은 앞부분이 거의 같습니다. 밀리초 타임스탬프가 들어 있어서 문자열 정렬만으로 생성 순서가 유지됩니다. v4는 앞부분부터 무작위입니다.',
        },
        {
          title: '버전 자리 확인법',
          input: '01923f8a-1c4d-7000-8a3b-9f2e1d4c5b6a',
          output: '세 번째 그룹의 첫 글자가 버전\n7000 -> v7\n4372 -> v4',
        },
      ],
      troubles: [
        {
          title: 'v4를 기본키로 쓰다 인덱스가 커졌을 때',
          body: 'v4는 완전 난수라 B-tree 인덱스 곳곳에 삽입되어 페이지 분할이 잦고 캐시 적중률이 떨어집니다. 행이 수백만 건으로 늘어난 뒤에 체감되는 문제라 초기 설계에서 놓치기 쉽습니다. v7은 끝에 순차적으로 붙어 이 비용을 줄입니다.',
        },
        {
          title: '공개 URL에 v7을 쓰면 시각이 노출됩니다',
          body: 'v7에는 생성 밀리초가 그대로 들어 있어 가입 시점이나 주문 시각을 역산할 수 있습니다. 경쟁사가 가입자 증가 속도를 추정할 수도 있습니다. 외부에 노출되는 식별자는 v4가 맞습니다.',
        },
        {
          title: '두 버전을 한 컬럼에 섞어도 되는지',
          body: '형식이 같아 저장은 문제없지만 정렬 보장이 깨집니다. v7끼리는 시간순이어도 섞인 v4는 무작위 위치에 들어갑니다. 마이그레이션할 때는 정렬에 의존하는 쿼리가 있는지 먼저 확인하세요.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'v4 and v7 side by side',
          input: 'Three of each, generated at the same moment',
          output:
            'v4  f47ac10b-58cc-4372-a567-0e02b2c3d479\nv4  1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed\nv4  7c9e6679-7425-40de-944b-e07fc1f90ae7\n\nv7  01923f8a-1c4d-7000-8a3b-9f2e1d4c5b6a\nv7  01923f8a-1c51-7000-8a3b-2c7d9e4f1a3b\nv7  01923f8a-1c55-7000-8a3b-6b1a8c2d7e9f',
          note: 'The v7 values share a prefix because it encodes a millisecond timestamp, so string sorting preserves creation order. v4 is random from the first digit.',
        },
        {
          title: 'Reading the version digit',
          input: '01923f8a-1c4d-7000-8a3b-9f2e1d4c5b6a',
          output: 'The first digit of the third group is the version\n7000 -> v7\n4372 -> v4',
        },
      ],
      troubles: [
        {
          title: 'Index bloat after using v4 as a primary key',
          body: 'Because v4 is fully random, rows land all over a B-tree index, splitting pages often and hurting cache hit rate. The cost only becomes visible at millions of rows, which is why it slips past early design reviews. v7 appends sequentially and avoids most of it.',
        },
        {
          title: 'v7 in a public URL leaks timing',
          body: 'A v7 value embeds its creation millisecond, so signup or order times can be derived — and a competitor could estimate your growth rate. Use v4 for identifiers exposed outside your system.',
        },
        {
          title: 'Can both versions share a column?',
          body: 'Storage is fine since the format is identical, but the sort guarantee breaks. v7 values stay time-ordered while interleaved v4 values land randomly. Before migrating, check for queries that rely on ordering.',
        },
      ],
    },
  },

  '/jwt-exp-nbf': {
    ko: {
      examples: [
        {
          title: '만료 판정에 쓰이는 클레임',
          input: '{\n  "sub": "user-123",\n  "iat": 1767225600,\n  "nbf": 1767225600,\n  "exp": 1767229200\n}',
          output:
            'iat 발급 시각  2026-01-01 00:00:00 UTC\nnbf 유효 시작  2026-01-01 00:00:00 UTC\nexp 만료      2026-01-01 01:00:00 UTC\n유효 기간 1시간',
          note: '세 값 모두 초 단위 epoch입니다. 밀리초를 넣으면 수만 년 후로 해석되어 만료 검사가 무력화됩니다.',
        },
        {
          title: 'nbf가 미래인 토큰',
          input: '현재 1767225600 · nbf 1767229200',
          output: '아직 사용할 수 없음 (1시간 뒤부터 유효)',
        },
      ],
      troubles: [
        {
          title: '유효한 토큰인데 만료로 거부될 때',
          body: '서버 시계가 어긋난 경우가 가장 흔합니다. 발급 서버가 조금 빠르면 받는 쪽 기준으로 nbf가 아직 미래입니다. 대부분의 라이브러리가 clock skew 허용값(보통 30~60초)을 제공하니 그것을 먼저 확인하세요.',
        },
        {
          title: 'exp를 밀리초로 넣었을 때',
          body: 'JWT 표준(RFC 7519)의 시간 클레임은 초 단위입니다. Date.now()를 그대로 넣으면 1000배가 되어 사실상 만료되지 않는 토큰이 발급됩니다. 보안 사고로 이어지는 실수라 발급 코드를 먼저 확인하세요.',
        },
        {
          title: '디코딩됐다고 검증된 것은 아닙니다',
          body: 'JWT의 헤더와 페이로드는 Base64URL 인코딩일 뿐 암호화가 아닙니다. 누구나 읽을 수 있고 내용을 바꿔 다시 인코딩할 수도 있습니다. 서명 검증을 통과해야 신뢰할 수 있으며, 페이로드에 비밀 값을 담아서는 안 됩니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'The claims that decide expiry',
          input: '{\n  "sub": "user-123",\n  "iat": 1767225600,\n  "nbf": 1767225600,\n  "exp": 1767229200\n}',
          output:
            'iat issued at   2026-01-01 00:00:00 UTC\nnbf valid from  2026-01-01 00:00:00 UTC\nexp expires     2026-01-01 01:00:00 UTC\nLifetime 1 hour',
          note: 'All three are epoch seconds. Passing milliseconds pushes the value tens of thousands of years out and effectively disables expiry checks.',
        },
        {
          title: 'A token whose nbf is in the future',
          input: 'now 1767225600, nbf 1767229200',
          output: 'Not yet usable — valid one hour from now',
        },
      ],
      troubles: [
        {
          title: 'A valid token is rejected as expired',
          body: 'Clock drift between servers is the usual cause. If the issuer runs slightly ahead, nbf is still in the future for the receiver. Most libraries expose a clock skew tolerance, commonly 30 to 60 seconds — check that first.',
        },
        {
          title: 'exp set in milliseconds',
          body: 'RFC 7519 time claims are in seconds. Passing Date.now() directly inflates the value by 1000 and issues a token that never expires. This is a security incident waiting to happen, so audit the issuing code.',
        },
        {
          title: 'Decoding is not verifying',
          body: 'A JWT header and payload are Base64URL encoded, not encrypted. Anyone can read them and re-encode modified content. Only a passing signature check makes a token trustworthy, and secrets must never go in the payload.',
        },
      ],
    },
  },

  '/base64-vs-url-encoding': {
    ko: {
      examples: [
        {
          title: '같은 문자열을 두 방식으로',
          input: 'hello world?',
          output:
            'Base64            aGVsbG8gd29ybGQ/\nPercent encoding  hello%20world%3F',
          note: 'Base64는 바이트를 다른 문자 집합으로 옮겨 담는 것이고, percent encoding은 URL에서 특별한 뜻을 가진 문자만 바꿉니다. 목적이 다릅니다.',
        },
        {
          title: 'Base64를 URL에 넣을 때',
          input: 'a+b/c=  (표준 Base64)',
          output: 'a-b_c   (URL-safe Base64)\n+ -> -,  / -> _,  = 패딩 제거',
          note: '표준 Base64의 +와 /는 URL에서 다른 의미로 읽힙니다. JWT가 URL-safe 변형을 쓰는 이유입니다.',
        },
      ],
      troubles: [
        {
          title: '어느 쪽을 써야 할지 헷갈릴 때',
          body: '텍스트가 아닌 데이터(이미지, 인증서, 바이너리)를 텍스트만 다니는 통로에 실어야 하면 Base64입니다. URL의 경로나 쿼리에 특수문자를 안전히 넣어야 하면 percent encoding입니다. 둘은 대체재가 아닙니다.',
        },
        {
          title: 'Base64 문자열이 URL에서 깨질 때',
          body: '표준 Base64의 +가 공백으로, /가 경로 구분자로 해석됩니다. URL-safe Base64로 바꾸거나, Base64 결과를 percent encoding으로 한 번 더 감싸세요. 후자를 쓸 때는 디코딩 순서를 반대로 해야 합니다.',
        },
        {
          title: 'Base64가 암호화라고 오해할 때',
          body: 'Base64는 누구나 되돌릴 수 있는 인코딩입니다. 비밀을 감추는 기능이 전혀 없습니다. Basic 인증 헤더가 Base64인 것도 보안이 아니라 전송 호환성 때문입니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'One string, two encodings',
          input: 'hello world?',
          output:
            'Base64            aGVsbG8gd29ybGQ/\nPercent encoding  hello%20world%3F',
          note: 'Base64 moves bytes into a different character set; percent encoding only escapes characters that carry special meaning in a URL. They solve different problems.',
        },
        {
          title: 'Putting Base64 into a URL',
          input: 'a+b/c=  (standard Base64)',
          output: 'a-b_c   (URL-safe Base64)\n+ becomes -, / becomes _, padding dropped',
          note: 'The + and / of standard Base64 mean something else in a URL. That is why JWT uses the URL-safe variant.',
        },
      ],
      troubles: [
        {
          title: 'Which one should you use?',
          body: 'Use Base64 when non-text data (an image, a certificate, any binary) has to travel through a text-only channel. Use percent encoding when special characters must sit safely in a URL path or query. They are not interchangeable.',
        },
        {
          title: 'A Base64 string breaks inside a URL',
          body: 'Standard Base64 uses + which decodes as a space, and / which reads as a path separator. Switch to URL-safe Base64, or percent-encode the Base64 output — in which case remember to decode in the reverse order.',
        },
        {
          title: 'Mistaking Base64 for encryption',
          body: 'Base64 is reversible by anyone and hides nothing. Basic authentication headers use it for transport compatibility, not for security.',
        },
      ],
    },
  },

  '/pdf-merge-split-guide': {
    ko: {
      examples: [
        {
          title: '페이지 범위 표기',
          input: '1-3, 7, 10-12',
          output: '1, 2, 3, 7, 10, 11, 12 페이지를 순서대로 추출',
          note: '페이지 번호는 1부터 셉니다. 0을 넣으면 무시되거나 오류가 납니다.',
        },
        {
          title: '두 문서 병합 결과',
          input: 'A.pdf (5쪽) + B.pdf (3쪽)',
          output: '합본 8쪽 · A의 1-5쪽 다음에 B의 1-3쪽',
          note: '병합 순서는 파일을 추가한 순서를 따릅니다. 목차나 표지가 있으면 순서를 먼저 정리하세요.',
        },
      ],
      troubles: [
        {
          title: '열리지 않거나 처리에 실패할 때',
          body: '암호가 걸린 PDF는 먼저 암호를 풀어야 편집할 수 있습니다. 열람 암호가 아니라 권한 암호만 걸린 경우도 라이브러리가 거부할 수 있습니다.',
        },
        {
          title: '병합 후 글자가 검색되지 않을 때',
          body: '스캔한 PDF는 페이지가 이미지입니다. 병합해도 텍스트 레이어가 생기지 않으므로 검색이나 복사가 안 됩니다. 텍스트가 필요하면 OCR을 먼저 거쳐야 합니다.',
        },
        {
          title: '파일 용량이 예상보다 클 때',
          body: '병합은 각 문서의 리소스를 함께 담기 때문에 원본 합계보다 커질 수 있습니다. 같은 글꼴이 여러 번 포함되는 경우가 대표적입니다.',
        },
      ],
    },
    en: {
      examples: [
        {
          title: 'Page range syntax',
          input: '1-3, 7, 10-12',
          output: 'Extracts pages 1, 2, 3, 7, 10, 11, 12 in that order',
          note: 'Page numbers start at 1. A 0 is ignored or raises an error.',
        },
        {
          title: 'Merging two documents',
          input: 'A.pdf (5 pages) + B.pdf (3 pages)',
          output: '8 pages total — A pages 1-5 followed by B pages 1-3',
          note: 'Merge order follows the order you added the files. Sort covers and tables of contents first.',
        },
      ],
      troubles: [
        {
          title: 'The file will not open or process',
          body: 'A password-protected PDF must be unlocked before editing. Even permission-only passwords, with no open password, can be refused by the library.',
        },
        {
          title: 'Text is not searchable after merging',
          body: 'Scanned PDFs are images per page. Merging does not create a text layer, so search and copy still fail. Run OCR first if you need the text.',
        },
        {
          title: 'The output is larger than expected',
          body: 'Merging carries each document resources along, so the result can exceed the sum of the inputs — most often because the same fonts get embedded more than once.',
        },
      ],
    },
  },
};
