import './style.css';
import { onLocaleChange, t } from './i18n.js';
import { importJWK, jwtVerify } from 'jose';

const jwtInput = document.getElementById('jwtInput');
const headerEl = document.getElementById('jwtHeader');
const payloadEl = document.getElementById('jwtPayload');
const messageEl = document.getElementById('jwtMessage');
const metaEl = document.getElementById('jwtMeta');
const jwksUrlEl = document.getElementById('jwtJwksUrl');
const verifyBtn = document.getElementById('jwtVerifyBtn');
const verifyOutputEl = document.getElementById('jwtVerifyOutput');
const verifySectionEl = jwksUrlEl?.closest('section');
const inspectorEl = document.getElementById('jwtInspector');
let lastDecoded = null;

const verifyCopy = {
  ko: {
    title: 'JWKS 서명 검증',
    button: '서명 검증',
    output: '검증 결과',
  },
  en: {
    title: 'JWKS signature verification',
    button: 'Verify signature',
    output: 'Verification result',
  },
};

const inspectorCopy = {
  ko: {
    alg: '알고리즘',
    typ: '타입',
    issuer: '발급자',
    subject: '주체',
    audience: '대상',
    expiry: '만료',
    notBefore: 'nbf',
    signature: '서명',
    missing: '없음',
    unsigned: '검증 전',
    expired: '만료됨',
    valid: '유효',
    pending: '대기',
    active: '활성',
  },
  en: {
    alg: 'Algorithm',
    typ: 'Type',
    issuer: 'Issuer',
    subject: 'Subject',
    audience: 'Audience',
    expiry: 'Expiry',
    notBefore: 'nbf',
    signature: 'Signature',
    missing: 'Missing',
    unsigned: 'Not verified',
    expired: 'Expired',
    valid: 'Valid',
    pending: 'Pending',
    active: 'Active',
  },
};

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('message--error', isError);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function getInspectorCopy(locale = document.documentElement.getAttribute('lang') || 'ko') {
  return inspectorCopy[locale] || inspectorCopy.en;
}

function formatClaimTime(value, labels) {
  if (typeof value !== 'number') {
    return { value: labels.missing, state: 'warn' };
  }

  const now = Math.floor(Date.now() / 1000);
  const date = new Date(value * 1000).toISOString().slice(0, 19).replace('T', ' ');
  if (value < now) {
    return { value: `${labels.expired} · ${date}`, state: 'error' };
  }

  return { value: `${labels.valid} · ${date}`, state: 'ok' };
}

function formatNbf(value, labels) {
  if (typeof value !== 'number') {
    return { value: labels.missing, state: '' };
  }

  const now = Math.floor(Date.now() / 1000);
  const date = new Date(value * 1000).toISOString().slice(0, 19).replace('T', ' ');
  return value > now
    ? { value: `${labels.pending} · ${date}`, state: 'warn' }
    : { value: `${labels.active} · ${date}`, state: 'ok' };
}

function renderInspector(decoded = lastDecoded) {
  if (!inspectorEl) return;
  if (!decoded) {
    inspectorEl.innerHTML = '';
    return;
  }

  const copy = getInspectorCopy();
  const { header, payload, signatureVerified = false } = decoded;
  const expiry = formatClaimTime(payload.exp, copy);
  const nbf = formatNbf(payload.nbf, copy);
  const audience = Array.isArray(payload.aud) ? payload.aud.join(', ') : payload.aud;
  const entries = [
    [copy.alg, header.alg || copy.missing, header.alg ? '' : 'warn'],
    [copy.typ, header.typ || copy.missing],
    [copy.issuer, payload.iss || copy.missing],
    [copy.subject, payload.sub || copy.missing],
    [copy.audience, audience || copy.missing],
    [copy.expiry, expiry.value, expiry.state],
    [copy.notBefore, nbf.value, nbf.state],
    [copy.signature, signatureVerified ? copy.valid : copy.unsigned, signatureVerified ? 'ok' : 'warn'],
  ];

  inspectorEl.innerHTML = entries
    .map(
      ([label, value, state = '']) => `
        <div class="tool-inspector__item${state ? ` tool-inspector__item--${state}` : ''}">
          <span class="tool-inspector__label">${escapeHtml(label)}</span>
          <span class="tool-inspector__value">${escapeHtml(value)}</span>
        </div>
      `,
    )
    .join('');
}

function applyVerifyCopy(locale = document.documentElement.getAttribute('lang') || 'ko') {
  const copy = verifyCopy[locale] || verifyCopy.en;
  if (!verifySectionEl) return;

  const titleEl = verifySectionEl.querySelector('h2');
  const labels = verifySectionEl.querySelectorAll('label');
  const outputLabelEl = Array.from(labels).find((label) => label.getAttribute('for') === 'jwtVerifyOutput');

  if (titleEl) titleEl.textContent = copy.title;
  if (verifyBtn) verifyBtn.textContent = copy.button;
  if (outputLabelEl) outputLabelEl.textContent = copy.output;
}

function base64UrlDecode(segment) {
  const replaced = segment.replace(/-/g, '+').replace(/_/g, '/');
  const paddingNeeded = (4 - (replaced.length % 4)) % 4;
  const padded = replaced + '='.repeat(paddingNeeded);
  const binary = atob(padded);
  let result = '';
  for (let i = 0; i < binary.length; i += 1) {
    result += `%${(`00${binary.charCodeAt(i).toString(16)}`).slice(-2)}`;
  }
  return decodeURIComponent(result);
}

function prettyPrint(json) {
  return JSON.stringify(json, null, 2);
}

function describeClaims(payload) {
  if (!payload) {
    metaEl.textContent = '';
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = payload.exp;
  const nbf = payload.nbf;
  const parts = [];

  if (typeof exp === 'number') {
    const expired = exp < now;
    const date = new Date(exp * 1000).toISOString();
    parts.push(expired ? t('jwt.meta.expired', { date }) : t('jwt.meta.expires', { date }));
  }

  if (typeof nbf === 'number') {
    const active = nbf <= now;
    const date = new Date(nbf * 1000).toISOString();
    parts.push(active ? t('jwt.meta.nbfActive', { date }) : t('jwt.meta.nbfPending', { date }));
  }

  metaEl.textContent = parts.join(' | ');
}

function decodeJwt() {
  try {
    const token = jwtInput.value.trim();
    if (!token) {
      showMessage(t('jwt.error.empty'), true);
      return;
    }

    const parts = token.split('.');
    if (parts.length < 2) {
      showMessage(t('jwt.error.format'), true);
      return;
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    lastDecoded = { header, payload, signatureVerified: false };
    headerEl.textContent = prettyPrint(header);
    payloadEl.textContent = prettyPrint(payload);
    describeClaims(payload);
    renderInspector();
    showMessage(t('jwt.success'));
  } catch {
    showMessage(t('jwt.error.decode'), true);
  }
}

function decodeHeader(token) {
  const parts = token.split('.');
  if (parts.length < 2) throw new Error(t('jwt.error.format'));
  return JSON.parse(base64UrlDecode(parts[0]));
}

async function verifyJwtSignature() {
  const token = jwtInput.value.trim();
  const jwksUrl = jwksUrlEl.value.trim();
  if (!token) {
    showMessage(t('jwt.error.empty'), true);
    return;
  }
  if (!jwksUrl) {
    showMessage(t('jwt.verify.enterJwks'), true);
    return;
  }

  try {
    const header = decodeHeader(token);
    const res = await fetch(jwksUrl);
    const jwks = await res.json();
    const key = (jwks.keys || []).find((candidate) => !header.kid || candidate.kid === header.kid);
    if (!key) {
      throw new Error(t('jwt.verify.noKey'));
    }

    const cryptoKey = await importJWK(key, key.alg || header.alg || 'RS256');
    const verified = await jwtVerify(token, cryptoKey, {});
    lastDecoded = {
      header,
      payload: verified.payload,
      signatureVerified: true,
    };
    verifyOutputEl.value = JSON.stringify(
      {
        verified: true,
        alg: header.alg,
        kid: header.kid || null,
        payload: verified.payload,
      },
      null,
      2,
    );
    renderInspector();
    showMessage(t('jwt.verify.success'));
  } catch (error) {
    verifyOutputEl.value = '';
    showMessage(t('jwt.verify.failed', { message: error.message }), true);
  }
}

document.getElementById('decodeJwtBtn').addEventListener('click', decodeJwt);

document.getElementById('jwtClearBtn').addEventListener('click', () => {
  jwtInput.value = '';
  headerEl.textContent = '';
  payloadEl.textContent = '';
  metaEl.textContent = '';
  verifyOutputEl.value = '';
  lastDecoded = null;
  renderInspector();
  showMessage('');
});

applyVerifyCopy();
onLocaleChange((locale) => {
  applyVerifyCopy(locale);
  renderInspector();
});

document.getElementById('jwtSampleBtn').addEventListener('click', () => {
  const sample =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUxNjIzOTAyMn0.' +
    'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
  jwtInput.value = sample;
  decodeJwt();
});

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    const value = el.value || el.textContent || '';
    navigator.clipboard
      .writeText(value)
      .then(() => showMessage(t('common.copySuccess')))
      .catch(() => showMessage(t('common.copyFail'), true));
  });
});

verifyBtn?.addEventListener('click', () => {
  verifyJwtSignature();
});
