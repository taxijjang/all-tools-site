import './style.css';
import { toDataURL } from 'qrcode';

const dom = {
  type: document.getElementById('qraType'),
  text: document.getElementById('qraText'),
  wifiSsid: document.getElementById('qraWifiSsid'),
  wifiPass: document.getElementById('qraWifiPass'),
  wifiSec: document.getElementById('qraWifiSec'),
  run: document.getElementById('qraGenerateBtn'),
  img: document.getElementById('qraImage'),
  message: document.getElementById('qraMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function payload() {
  if (dom.type.value === 'wifi') {
    const ssid = dom.wifiSsid.value.trim();
    const pass = dom.wifiPass.value.trim();
    const sec = dom.wifiSec.value;
    return `WIFI:T:${sec};S:${ssid};P:${pass};;`;
  }
  return dom.text.value.trim();
}

async function run() {
  const value = payload();
  if (!value) {
    setMessage('QR 데이터 입력이 필요합니다.', true);
    return;
  }
  const url = await toDataURL(value, { width: 320, margin: 1, errorCorrectionLevel: 'M' });
  dom.img.src = url;
  dom.img.hidden = false;
  setMessage('QR 생성 완료.');
}

dom.run.addEventListener('click', () => run().catch(() => setMessage('QR 생성 실패.', true)));
