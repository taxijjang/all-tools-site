import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = 4177;
const BASE = `http://${HOST}:${PORT}`;
const CHROME_PORT = 9225;
const USER_DATA_DIR = join(process.cwd(), '.tmp', `chrome-ux-audit-${Date.now()}`);
const CHROME_PATHS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const ROUTES = [
  '/',
  '/learn',
  '/ai-tools',
  '/claude-code-cheatsheet',
  '/codex-cheatsheet',
  '/uuid-v4-v7',
  '/jwt-exp-nbf',
  '/base64-vs-url-encoding',
  '/pdf-merge-split-guide',
  '/uuid',
  '/base64',
  '/json',
  '/jwt',
  '/cron',
  '/url',
  '/hash',
  '/timestamp',
  '/password',
  '/regex',
  '/qr',
  '/diff',
  '/color',
  '/markdown',
  '/convert',
  '/file-hash',
  '/image-base64',
  '/uuidv7',
  '/case-convert',
  '/json-yaml',
  '/query-builder',
  '/ip-ua',
  '/ip-cidr',
  '/text-stats',
  '/pdf-toolkit',
  '/image-optimize',
  '/ocr',
  '/seo-check',
  '/utm-builder',
  '/text-cleaner',
  '/api-tester',
];

const VIEWPORTS = [
  { width: 390, height: 844, label: 'mobile 390x844' },
  { width: 1280, height: 800, label: 'desktop 1280x800' },
];

function fail(message) {
  console.error(`UX AUDIT FAIL: ${message}`);
  process.exit(1);
}

function getChromePath() {
  const chromePath = CHROME_PATHS.find((path) => existsSync(path));
  if (!chromePath) {
    fail('Chrome executable not found. Set CHROME_PATH to run the layout audit.');
  }
  return chromePath;
}

async function waitForHttp(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.ok) return;
    } catch {
      // retry
    }
    await delay(250);
  }
  fail(`Timed out waiting for ${url}`);
}

async function startPreview() {
  const preview = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: false,
  });
  await waitForHttp(BASE);
  return preview;
}

async function startChrome() {
  await rm(USER_DATA_DIR, { recursive: true, force: true });
  await mkdir(USER_DATA_DIR, { recursive: true });
  const chrome = spawn(
    getChromePath(),
    [
      '--headless=new',
      `--remote-debugging-port=${CHROME_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-default-apps',
      'about:blank',
    ],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
      shell: false,
    },
  );
  await waitForHttp(`http://${HOST}:${CHROME_PORT}/json/version`);
  return chrome;
}

async function connectToTarget(url) {
  const res = await fetch(`http://${HOST}:${CHROME_PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const target = await res.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) {
        reject(new Error(payload.error.message));
      } else {
        resolve(payload.result);
      }
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setBypassServiceWorker', { bypass: true });

  return { socket, send, targetId: target.id };
}

async function waitForLoad(send) {
  await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
  await delay(500);
}

async function setViewport(send, viewport) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width <= 430,
  });
}

async function closeTarget(socket, targetId) {
  socket.close();
  await fetch(`http://${HOST}:${CHROME_PORT}/json/close/${targetId}`);
}

// ponytail: 오늘 브라우저를 띄워 손으로 재던 것들을 스크립트로 굳힌다.
// 손으로 재면 매번 빠뜨린다. 실제로 탭이 안 숨겨진 채 배포된 적이 있는데,
// 그때도 속성만 보고 실제 표시 여부를 안 봐서 놓쳤다.
//
// 기준 출처: ui-ux-pro-max 우선순위 1(접근성) 2(터치) 6(타이포).
//
// 문자열이 아니라 진짜 함수로 두고 toString()으로 넘긴다.
// 템플릿 리터럴 안에 코드를 넣으면 백틱과 ${} 이스케이프가 끝없이 꼬인다.
function uxChecks() {
  const visible = (el) => {
    if (el.closest('[hidden]')) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // 브라우저는 rgb(0-255)와 color(srgb 0-1) 두 형식을 모두 내놓는다.
  // 0-1 값을 255 기준으로 읽으면 전부 0에 수렴해 대비가 1.00:1로 잘못 나온다.
  // 브라우저는 rgb(0-255)와 color(srgb 0-1) 두 형식을 모두 내놓고,
  // 둘 다 알파를 가질 수 있다. 알파를 무시하면 10퍼센트 청록 배경을
  // 불투명한 밝은 청록으로 읽어 멀쩡한 대비를 실패로 판정한다.
  const parseColor = (value) => {
    if (!value) return null;
    const isSrgb = value.startsWith('color(');
    const nums = (value.match(/-?\d*\.?\d+/g) || []).map(Number);
    if (nums.length < 3) return null;
    const scale = isSrgb ? 255 : 1;
    return {
      r: nums[0] * scale,
      g: nums[1] * scale,
      b: nums[2] * scale,
      a: nums.length > 3 ? nums[3] : 1,
    };
  };

  const over = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });

  const luminance = ({ r, g, b }) => {
    const [lr, lg, lb] = [r, g, b].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
  };

  // 반투명 레이어를 아래에서 위로 합성해 실제로 눈에 보이는 색을 구한다.
  const backgroundOf = (el) => {
    const layers = [];
    let node = el;
    while (node) {
      const cs = getComputedStyle(node);
      const bg = parseColor(cs.backgroundColor);
      if (bg && bg.a > 0) {
        layers.push(bg);
        if (bg.a >= 1) break;
      }
      const image = cs.backgroundImage;
      if (image && image !== 'none') {
        const stop = image.match(/(?:rgba?|color)\([^)]*\)/);
        const gradient = stop && parseColor(stop[0]);
        if (gradient) {
          layers.push(gradient);
          if (gradient.a >= 1) break;
        }
      }
      node = node.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i -= 1) base = over(layers[i], base);
    return base;
  };

  const label = (el) => {
    // 클래스 없는 요소는 부모 클래스로 어디 있는 건지 알려준다.
    // 그냥 'a  22px'만 나오면 사이트 어디를 고쳐야 하는지 알 수 없다.
    let cls = (el.className || '').toString().split(' ')[0].slice(0, 24);
    if (!cls) {
      const owner = el.closest('[class]');
      const parentCls = owner && owner.className.toString().split(' ')[0].slice(0, 24);
      if (parentCls) cls = '\u2190' + parentCls;
    }
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24);
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '') + (text ? ' "' + text + '"' : '');
  };

  const findings = [];
  const add = (check, el, detail) => findings.push({ check, el, detail });

  // 1. 대비 4.5:1 (큰 글씨 3:1). option은 OS가 그리므로 제외한다.
  document.querySelectorAll('p,span,label,h1,h2,h3,h4,small,li,button,a,td,th,summary').forEach((el) => {
    if (el.tagName === 'OPTION' || el.children.length || !visible(el)) return;
    if (!(el.textContent || '').trim()) return;
    const cs = getComputedStyle(el);
    const bgColor = backgroundOf(el);
    const fgRaw = parseColor(cs.color);
    if (!fgRaw) return;
    // 글자색에도 알파가 있을 수 있다. 배경 위에 합성한 뒤 비교한다.
    const fg = luminance(over(fgRaw, bgColor));
    const bg = luminance(bgColor);
    const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      // 실제 합성 결과를 같이 찍는다. 비율만 보면 어느 쪽을 손대야 하는지 모른다.
      const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
      const detail = `${ratio.toFixed(2)}:1 < ${need}:1  fg=${cs.color} on bg=${hex(bgColor)}`;
      add('contrast', label(el), detail);
    }
  });

  // 2. 터치 타깃 44px. 문단 속 인라인 링크는 제외 - 키우면 줄 간격이 깨진다.
  if (window.innerWidth <= 720) {
    document.querySelectorAll('button, select, input[type=checkbox], [role=tab], a').forEach((el) => {
      if (!visible(el)) return;
      if (el.disabled) return; // 비활성 컨트롤은 누를 수 없으니 타깃이 아니다
      if (el.tagName === 'A' && el.closest('p, li, .faq-item, .info-card')) return;
      // label로 감싼 체크박스는 label을 눌러도 토글된다. 실제 타깃은 label이다.
      if (el.tagName === 'INPUT') {
        const owner = el.closest('label');
        if (owner && owner.getBoundingClientRect().height >= 44) return;
      }
      const h = el.getBoundingClientRect().height;
      if (h < 44) add('touch-target', label(el), Math.round(h) + 'px < 44px');
    });
  }

  // 3. 본문 12px 미만
  // 같은 문구가 부모/자식으로 중복 보고되지 않게 텍스트를 직접 가진 요소만 본다.
  const seenTiny = new Set();
  document.querySelectorAll('p,span,label,li,small,button,a').forEach((el) => {
    if (el.children.length || !visible(el)) return;
    const text = (el.textContent || '').trim();
    if (!text) return;
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (size >= 12) return;
    const key = label(el) + size;
    if (seenTiny.has(key)) return;
    seenTiny.add(key);
    add('tiny-text', label(el), size.toFixed(1) + 'px < 12px');
  });

  // 4. 내용이 잘리는 입력창. 자동 확장 상한에 닿기 전에 넘치면 진짜 잘린 것이다.
  document.querySelectorAll('textarea').forEach((el) => {
    if (!visible(el) || !el.value) return;
    const hidden = el.scrollHeight - el.clientHeight;
    const cap = Math.round(window.innerHeight * 0.7);
    if (hidden > 8 && el.clientHeight < cap - 8) {
      add('clipped-input', label(el), hidden + 'px clipped below cap');
    }
  });

  // 5. 첫 화면에서 도구가 시작하는 위치. 껍데기가 절반을 넘으면 도구가 묻힌다.
  const firstField = document.querySelector('main textarea, main input:not([type=hidden]), main select');
  if (firstField && window.innerWidth > 720) {
    const top = firstField.getBoundingClientRect().top + window.scrollY;
    const pct = Math.round((top / window.innerHeight) * 100);
    if (pct > 50) add('chrome-ratio', label(firstField), 'tool starts at ' + pct + '%');
  }

  // 6. 탭이 실제로 숨겨지는가. 속성만 보면 display가 이겨서 통과해버린다.
  const tabs = Array.from(document.querySelectorAll('[data-tab-target]'));
  if (tabs.length) {
    const shown = tabs
      .map((t) => document.getElementById(t.dataset.tabTarget))
      .filter((panel) => panel && (panel.offsetWidth || panel.offsetHeight));
    if (shown.length !== 1) {
      add('tab-visibility', 'tabs(' + tabs.length + ')', shown.length + ' panels visible');
    }
  }

  // 7. 접근 가능한 이름이 없는 아이콘 버튼
  document.querySelectorAll('button').forEach((el) => {
    if (!visible(el)) return;
    const text = (el.textContent || '').replace(/[^A-Za-z0-9\uAC00-\uD7A3]/g, '');
    const named = text || el.getAttribute('aria-label') || el.getAttribute('title');
    if (!named) add('unnamed-button', label(el), 'no accessible name');
  });

  return findings;
}

// 테마를 명시적으로 고정한다. 부트 스크립트가 적용되기 전에 재면 다크 토큰이
// 흰 배경에 얹힌 상태를 보게 되어 대비가 엉뚱하게 나온다.
async function auditUx(send, route, viewport, theme) {
  await setViewport(send, viewport);
  await send('Page.navigate', { url: `${BASE}${route}` });
  await waitForLoad(send);
  await send('Runtime.evaluate', {
    expression: `document.documentElement.setAttribute('data-theme', '${theme}');`,
  });
  await delay(400);
  const result = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: '(' + uxChecks.toString() + ')()',
  });
  return result.result.value || [];
}

const THEMES = ['dark', 'light'];

const ROUTES_UX = [
  '/',
  '/json',
  '/base64',
  '/uuid',
  '/jwt',
  '/cron',
  '/hash',
  '/regex',
  '/ip-cidr',
  '/convert',
  '/markdown',
  '/diff',
  '/qr',
  '/password',
  '/privacy',
];

async function main() {
  const preview = await startPreview();
  const chrome = await startChrome();
  const { socket, send, targetId } = await connectToTarget(`${BASE}/`);

  try {
    const findings = [];

    for (const theme of THEMES) {
      for (const viewport of VIEWPORTS) {
        for (const route of ROUTES_UX) {
          const items = await auditUx(send, route, viewport, theme);
          for (const item of items) {
            findings.push({ theme, viewport: viewport.label, route, ...item });
          }
        }
      }
    }

    if (findings.length) {
      // 같은 요소가 라우트마다 반복되므로 (검사, 요소, 상세, 테마)로 묶어 보고한다.
      // 690줄짜리 원본을 그대로 뱉으면 아무도 안 읽는다.
      const groups = new Map();
      for (const f of findings) {
        const el = f.el.split(' "')[0];
        const key = [f.check, el, f.detail, f.theme].join(' | ');
        const entry = groups.get(key) || { ...f, el, count: 0, routes: new Set() };
        entry.count += 1;
        entry.routes.add(f.route);
        groups.set(key, entry);
      }

      const rows = [...groups.values()]
        .map((g) => ({ ...g, routes: [...g.routes] }))
        .sort((a, b) => b.count - a.count);

      const byCheck = findings.reduce((acc, f) => {
        acc[f.check] = (acc[f.check] || 0) + 1;
        return acc;
      }, {});

      console.log(`UX AUDIT: ${findings.length} findings in ${rows.length} distinct issues`);
      console.log(JSON.stringify(byCheck, null, 2));
      for (const row of rows) {
        const where = row.routes.length > 3 ? `${row.routes.length} routes` : row.routes.join(', ');
        console.log(`  [${row.theme}] ${row.check}  ${row.el}  ${row.detail}  (${where})`);
      }
      process.exitCode = 2;
      return;
    }

    console.log(
      `UX AUDIT PASS: ${ROUTES_UX.length} routes clean across ${VIEWPORTS.length} viewports x ${THEMES.length} themes`,
    );
  } finally {
    await closeTarget(socket, targetId).catch(() => {});
    chrome.kill('SIGTERM');
    preview.kill('SIGTERM');
    await delay(150);
    await rm(USER_DATA_DIR, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
