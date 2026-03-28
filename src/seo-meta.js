export const SITE_ORIGIN = 'https://all-tools-site.pages.dev';
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
    title: 'Developer Tools for UUID, Base64, JSON, JWT and More | Stateless Tools',
    description:
      'Free browser-based developer tools for UUID generation, Base64 encode/decode, JSON formatting, JWT inspection, URL utilities, hashing, and more.',
  },
  learn: {
    path: '/learn',
    kind: 'content',
    allowAds: true,
    title: 'Practical Utility Guides | UUID, JWT, Base64 and More',
    description:
      'Read practical guides for UUIDs, JWT debugging, Base64, URL encoding, and safe browser-based utility workflows.',
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
    title: 'UUID Generator and Converter | UUID v4, ULID, Hex(binary16)',
    description:
      'Generate UUID v4 or ULID values and convert UUIDs to and from hex(binary16) in your browser.',
    applicationCategory: 'DeveloperApplication',
  },
  base64: {
    path: '/base64',
    kind: 'tool',
    title: 'Base64 Encode Decode Tool | URL-Safe and File Conversion',
    description:
      'Encode and decode Base64 strings, handle URL-safe variants, strip whitespace, and convert files in the browser.',
    applicationCategory: 'UtilitiesApplication',
  },
  json: {
    path: '/json',
    kind: 'tool',
    title: 'JSON Formatter and Validator | Pretty Print, Minify, Tree View',
    description:
      'Validate JSON, pretty-print or minify it, search keys and values, and inspect the result in a tree view.',
    applicationCategory: 'DeveloperApplication',
  },
  jwt: {
    path: '/jwt',
    kind: 'tool',
    title: 'JWT Decoder and Inspector | Claims, Expiry, and JWKS Check',
    description:
      'Decode JWT headers and payloads, inspect exp and nbf claims, and review tokens in your browser.',
    applicationCategory: 'DeveloperApplication',
  },
  url: {
    path: '/url',
    kind: 'tool',
    title: 'URL Encoder Decoder | Query String Parser',
    description:
      'Encode or decode URLs, inspect query parameters, and verify URL-safe strings directly in the browser.',
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
    title: 'PDF Toolkit | Merge, Split, Extract Pages, Watermark',
    description:
      'Merge, split, extract, and watermark PDFs locally in the browser without sending files to a server.',
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
    title: 'SEO Meta Tag Checker | Title, Description, OG, Canonical',
    description:
      'Review page titles, descriptions, Open Graph tags, and canonical URLs to catch common SEO issues.',
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
