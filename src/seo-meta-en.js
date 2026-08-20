// 영어 모드에서 쓰는 title / description.
// PAGE_META는 한국어만 담고 있어서, 영어로 바꿔도 탭 제목과 OG 태그가 한글로 남았다.
// 경로 기준으로 site.js가 런타임에 <head>를 갈아끼운다(updateHeadMeta).
// /en/ URL을 따로 만들 때 빌드 타임 소스로도 그대로 쓸 수 있게 명시적으로 적어둔다.
export const PAGE_META_EN = {
  '/': {
    title: 'Developer Tool Launcher | UUID, JSON, Base64, PDF, SEO',
    description:
      'Search and run browser-based developer tools for UUID, JSON, Base64, JWT, PDF, images, and SEO checks.',
  },
  '/learn': {
    title: 'Developer Utility Guides | UUID, JWT, Base64',
    description:
      'A hub of individual guides for the utilities developers reach for most: UUID, JWT, Base64, URL encoding, and PDF work.',
  },
  '/ai-tools': {
    title: 'AI Coding Cheat Sheets | Claude Code and Codex Commands',
    description:
      'Current commands, workflows, and official documentation links for Claude Code and Codex, collected in one cheat sheet hub.',
  },
  '/claude-code-cheatsheet': {
    title: 'Claude Code Cheat Sheet | Commands, Skills, MCP, Hooks',
    description:
      'Search Claude Code commands, skills, MCP, hooks, run/verify, code review, and routines on one page and jump to the official docs.',
  },
  '/codex-cheatsheet': {
    title: 'Codex Cheat Sheet | CLI, Slash Commands, Skills, MCP',
    description:
      'A current summary of the Codex CLI and app, slash commands, AGENTS.md, Skills, MCP, Automations, and worktree setup points.',
  },
  '/uuid-v4-v7': {
    title: 'UUID v4 vs v7 Guide | Which UUID Should You Use',
    description:
      'How UUID v4 and v7 differ in randomness and sort order, what that means for database storage, and how to choose in production.',
  },
  '/jwt-exp-nbf': {
    title: 'JWT exp and nbf Guide | Reading Expiry and Not Before',
    description:
      'How to read the JWT exp, nbf, and iat claims, how clock skew affects verification, and the mistakes that show up in production.',
  },
  '/base64-vs-url-encoding': {
    title: 'Base64 vs URL Encoding Guide | Which One and When',
    description:
      'What separates Base64 from percent encoding, when URL-safe Base64 is required, and how to debug values that break inside a URL.',
  },
  '/pdf-merge-split-guide': {
    title: 'PDF Merge and Split Guide | When to Combine or Separate',
    description:
      'When to merge, split, extract ranges, watermark, or pull text from a PDF, and where browser-side processing runs out.',
  },
  '/about': {
    title: 'About This Site | Stateless Tools Principles',
    description:
      'Why Stateless Tools exists, who it is for, the browser-first processing principle, and how to reach the maintainer.',
  },
  '/privacy': {
    title: 'Privacy and Data Handling | Cookies, Analytics, Ads',
    description:
      'How Stateless Tools handles data in the browser, what is kept in local storage, and how Google Analytics, AdSense, and cookies are used.',
  },
  '/contact': {
    title: 'Contact and Feedback | Bug Reports and Feature Requests',
    description:
      'How to send bug reports, feature requests, and usage feedback through GitHub Issues and other public channels.',
  },

  '/uuid': {
    title: 'UUID Converter | UUID v4 Generator, ULID, Hex Conversion',
    description:
      'Generate UUID v4 and ULID values, and convert a UUID to hex(binary16) or back, entirely in the browser.',
  },
  '/base64': {
    title: 'Base64 Encoder and Decoder | URL-safe, File Encoding',
    description:
      'Encode or decode strings and files as Base64, with URL-safe output and whitespace cleanup options.',
  },
  '/json': {
    title: 'JSON Formatter and Validator | Format, Minify, Tree View',
    description:
      'Validate, format, minify, search, and inspect JSON with a tree view, all in browser memory.',
  },
  '/json-yaml': {
    title: 'JSON to YAML Converter | YAML to JSON, CSV Output',
    description:
      'Convert structured data between JSON and YAML, and flatten it to CSV when you need a table.',
  },
  '/jwt': {
    title: 'JWT Decoder and Inspector | Claims, Expiry, JWKS',
    description:
      'Decode a JWT header and payload, inspect claims, check exp and nbf, and verify the signature against a JWKS endpoint.',
  },
  '/url': {
    title: 'URL Encoder and Decoder | Percent Encoding, Query Parser',
    description:
      'Encode or decode URLs, parse query strings, and check which characters are safe to place in a URL.',
  },
  '/hash': {
    title: 'SHA Hash Calculator | SHA-256, SHA-1, SHA-384, SHA-512',
    description:
      'Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes and copy the digest as HEX or Base64.',
  },
  '/file-hash': {
    title: 'File Hash Calculator | SHA-256 and SHA-512 Checksums',
    description:
      'Compute the SHA checksum of a local file to verify a download against the published digest.',
  },
  '/cron': {
    title: 'Cron Expression Parser | Explain Cron, Next Run Times',
    description:
      'Translate a cron expression into plain language and calculate the next scheduled run times.',
  },
  '/timestamp': {
    title: 'Unix Timestamp Converter | Epoch to Date, Date to Epoch',
    description:
      'Convert a Unix timestamp to a readable date and turn a date back into epoch seconds or milliseconds.',
  },
  '/convert': {
    title: 'Unit Converter | Length, Weight, Temperature',
    description:
      'Convert common length, weight, and temperature units to avoid unit mistakes in docs and code.',
  },
  '/ip-cidr': {
    title: 'CIDR Calculator | IPv4 Subnet, Broadcast, Host Range',
    description:
      'Calculate the network address, broadcast address, netmask, and usable host range for an IPv4 CIDR block.',
  },
  '/ip-ua': {
    title: 'IP and User-Agent Checker | Browser Environment Info',
    description:
      'Check your IP address, User-Agent, language, and timezone as the browser reports them.',
  },
  '/password': {
    title: 'Password Generator | Random Passwords with Strength Check',
    description:
      'Generate random passwords with length and character-set options, and see the resulting strength.',
  },
  '/regex': {
    title: 'Regex Tester | Patterns, Flags, Replace Preview',
    description:
      'Test a regular expression against sample text, try flags, and preview the replacement result.',
  },
  '/diff': {
    title: 'Text Diff | Compare Two Texts Line by Line',
    description:
      'Compare two blocks of text line by line to see exactly what was added, removed, or changed.',
  },
  '/cron-guide': {
    title: 'Crontab in Practice | The OR Trap, Time Zones, Overlapping Runs',
    description:
      'Cron syntax takes five minutes. This covers why a correct expression still misfires: day-of-month and day-of-week evaluating as OR, container UTC time zones, overlapping runs and silent failures.',
  },
  '/date-calc': {
    title: 'Age Calculator | Date Difference, D-day, Date Math',
    description:
      'Calculate an exact age from a birth date, count days between two dates, track a D-day and add or subtract days, weeks, months and business days.',
  },
  '/case-convert': {
    title: 'Case Converter | camelCase, snake_case, kebab-case',
    description:
      'Convert an identifier between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.',
  },
  '/text-cleaner': {
    title: 'Text Cleaner | Dedupe, Trim Whitespace, Sort, Slugify',
    description:
      'Remove duplicate lines, clean up whitespace, sort, and turn a title into a URL slug.',
  },
  '/text-stats': {
    title: 'Character Counter | Count Characters, Words, Sentences',
    description:
      'Count characters with and without spaces, plus words, sentences, paragraphs, lines and bytes. Updates as you type.',
  },
  '/markdown': {
    title: 'Markdown Preview | Render Markdown and Export HTML',
    description:
      'Render Markdown as you write it and check the generated HTML output.',
  },
  '/color': {
    title: 'Color Converter and Contrast Checker | HEX, RGB, HSL',
    description:
      'Convert between HEX, RGB, and HSL, and check the contrast ratio against WCAG AA and AAA thresholds.',
  },
  '/qr': {
    title: 'QR Code Generator and Scanner | Text, URL, Wi-Fi',
    description:
      'Generate a QR code from text or a URL, and scan a QR code out of an image in the browser.',
  },
  '/image-base64': {
    title: 'Image to Base64 Converter | Data URL Encoding',
    description:
      'Convert an image file to a data URL for CSS or HTML, and decode a data URL back to an image.',
  },
  '/image-optimize': {
    title: 'Image Optimizer | Compress, Resize, WebP Conversion',
    description:
      'Compress and resize images and convert between WebP, JPEG, and PNG without uploading them.',
  },
  '/pdf-toolkit': {
    title: 'PDF Merge and Split Tool | Extract Pages, Watermark',
    description:
      'Merge, split, extract page ranges, watermark, and pull text from PDF files in the browser.',
  },
  '/ocr': {
    title: 'OCR Text Extractor | Pull Text Out of an Image',
    description:
      'Extract text from a screenshot or scan so you can search and paste it instead of retyping.',
  },
  '/seo-check': {
    title: 'SEO Meta Tag Checker | Title, Description, OG Tags',
    description:
      'Check the title, description, H1, canonical, and Open Graph tags of a page or a pasted HTML source.',
  },
  '/utm-builder': {
    title: 'UTM Builder | Campaign Tracking URLs',
    description:
      'Build campaign URLs with UTM parameters that stay consistent across your reports.',
  },
  '/api-tester': {
    title: 'API Request Tester | Send HTTP Requests, Export cURL',
    description:
      'Send an HTTP request from the browser, inspect the response, and export the call as a cURL command.',
  },
};
