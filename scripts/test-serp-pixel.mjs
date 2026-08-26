// 캔버스 없이 검증한다. 라틴 10px, 한글 20px, 말줄임표 10px로 가정한 가짜 측정기.
import { truncateByWidth, cjkRatio } from '../src/serp-pixel.js';
import assert from 'node:assert/strict';

const CJK = /[ᄀ-ᇿ㄰-㆏가-힯぀-ヿ一-鿿]/;
const fake = (t) => [...t].reduce((w, ch) => w + (CJK.test(ch) ? 20 : 10), 0);

let n = 0;
const check = (label, fn) => { fn(); n += 1; };

check('제한 이내는 그대로', () => {
  const r = truncateByWidth('abcde', 100, fake); // 50px
  assert.equal(r.truncated, false);
  assert.equal(r.text, 'abcde');
  assert.equal(r.width, 50);
});

check('정확히 제한이면 자르지 않는다', () => {
  const r = truncateByWidth('abcde', 50, fake);
  assert.equal(r.truncated, false);
});

check('넘치면 말줄임표를 붙이고 예산 안에 든다', () => {
  const r = truncateByWidth('abcdefghij', 50, fake); // 100px > 50
  assert.equal(r.truncated, true);
  assert.ok(r.text.endsWith('…'));
  assert.ok(fake(r.text) <= 50, `자른 결과 ${fake(r.text)}px가 50px를 넘었다`);
  assert.equal(r.width, 100, '보고되는 width는 원본 전체 폭이어야 한다');
});

check('한글은 같은 글자 수에서 절반만 남는다', () => {
  const latin = truncateByWidth('aaaaaaaaaa', 210, fake); // 100px, 안 잘림
  const han = truncateByWidth('가나다라마바사아자차', 210, fake); // 200px, 안 잘림
  assert.equal(latin.truncated, false);
  assert.equal(han.truncated, false);
  // 제한을 110px로 낮추면 한글은 잘리고 라틴은 안 잘린다 — 글자 수 기준으로는 구분 불가
  assert.equal(truncateByWidth('aaaaaaaaaa', 110, fake).truncated, false);
  assert.equal(truncateByWidth('가나다라마바사아자차', 110, fake).truncated, true);
});

check('자른 뒤 꼬리 공백은 지운다', () => {
  const r = truncateByWidth('ab cdefgh', 50, fake);
  assert.ok(!/ …$/.test(r.text), `공백이 남았다: ${JSON.stringify(r.text)}`);
});

check('예산이 말줄임표보다 작으면 말줄임표만', () => {
  const r = truncateByWidth('abcdef', 5, fake);
  assert.equal(r.text, '…');
  assert.equal(r.truncated, true);
});

check('이모지를 쪼개지 않는다', () => {
  const r = truncateByWidth('ab😀cdefghijkl', 60, fake);
  assert.ok(!r.text.includes('\uD83D') || r.text.includes('😀'), '서로게이트 페어가 깨졌다');
});

check('빈 문자열', () => {
  const r = truncateByWidth('', 100, fake);
  assert.equal(r.truncated, false);
  assert.equal(r.text, '');
});

check('cjkRatio', () => {
  assert.equal(cjkRatio(''), 0);
  assert.equal(cjkRatio('abc'), 0);
  assert.equal(cjkRatio('가나다'), 1);
  assert.equal(cjkRatio('가나ab'), 0.5);
});

console.log(`SERP PIXEL PASS: ${n} checks`);
