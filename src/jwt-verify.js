import './style.css';
import { importJWK, jwtVerify } from 'jose';

const dom = {
  token: document.getElementById('jwkvToken'),
  jwks: document.getElementById('jwkvJwksUrl'),
  run: document.getElementById('jwkvVerifyBtn'),
  output: document.getElementById('jwkvOutput'),
  message: document.getElementById('jwkvMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function decodeHeader(token) {
  const part = token.split('.')[0];
  return JSON.parse(atob(part.replaceAll('-', '+').replaceAll('_', '/')));
}

async function verify() {
  const token = dom.token.value.trim();
  const jwksUrl = dom.jwks.value.trim();
  if (!token || !jwksUrl) {
    setMessage('JWT와 JWKS URL을 모두 입력하세요.', true);
    return;
  }

  const header = decodeHeader(token);
  const res = await fetch(jwksUrl);
  const jwks = await res.json();
  const key = (jwks.keys || []).find((k) => !header.kid || k.kid === header.kid);
  if (!key) {
    setMessage('JWKS에서 일치하는 키(kid)를 찾지 못했습니다.', true);
    return;
  }

  const cryptoKey = await importJWK(key, key.alg || header.alg || 'RS256');
  const verified = await jwtVerify(token, cryptoKey, {});
  dom.output.value = JSON.stringify({ header, payload: verified.payload }, null, 2);
  setMessage('서명 검증 성공.');
}

dom.run.addEventListener('click', () => verify().catch((e) => setMessage(`검증 실패: ${e.message}`, true)));
