import './style.css';
import { t } from './i18n.js';
import { toDataURL } from 'qrcode';

const dom = {
  type: document.getElementById('qrType'),
  textFields: document.getElementById('qrTextFields'),
  text: document.getElementById('qrText'),
  wifiFields: document.getElementById('qrWifiFields'),
  wifiSsid: document.getElementById('qrWifiSsid'),
  wifiPass: document.getElementById('qrWifiPass'),
  wifiSec: document.getElementById('qrWifiSec'),
  size: document.getElementById('qrSize'),
  generate: document.getElementById('qrGenerateBtn'),
  image: document.getElementById('qrImage'),
  download: document.getElementById('qrDownloadBtn'),
  scanFile: document.getElementById('qrScanFile'),
  scanOutput: document.getElementById('qrScanOutput'),
  message: document.getElementById('qrMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function buildPayload() {
  if (dom.type.value === 'wifi') {
    const ssid = dom.wifiSsid.value.trim();
    const pass = dom.wifiPass.value.trim();
    if (!ssid) return '';
    return `WIFI:T:${dom.wifiSec.value};S:${ssid};P:${pass};;`;
  }
  return dom.text.value.trim();
}

function syncTypeUi() {
  const wifiMode = dom.type.value === 'wifi';
  dom.wifiFields.hidden = !wifiMode;
  dom.textFields.hidden = wifiMode;
}

async function generateQr() {
  const text = buildPayload();
  const size = Number(dom.size.value || 256);

  if (!text) {
    setMessage(t('qr.error.empty'), true);
    return;
  }

  try {
    const url = await toDataURL(text, { width: size, margin: 1, errorCorrectionLevel: 'M' });
    dom.image.src = url;
    dom.image.hidden = false;
    dom.download.disabled = false;
    setMessage(t('qr.success.generated'));
  } catch {
    setMessage(t('qr.error.generate'), true);
  }
}

async function scanQrFromFile(file) {
  if (!('BarcodeDetector' in window)) {
    setMessage(t('qr.error.unsupported'), true);
    return;
  }

  try {
    const detector = new BarcodeDetector({ formats: ['qr_code'] });
    const bitmap = await createImageBitmap(file);
    const results = await detector.detect(bitmap);

    if (!results.length) {
      dom.scanOutput.value = '';
      setMessage(t('qr.error.notFound'), true);
      return;
    }

    dom.scanOutput.value = results.map((r) => r.rawValue || '').join('\n');
    setMessage(t('qr.success.scanned'));
  } catch {
    setMessage(t('qr.error.scan'), true);
  }
}

dom.generate.addEventListener('click', generateQr);
dom.type.addEventListener('change', () => {
  syncTypeUi();
  generateQr();
});
dom.download.addEventListener('click', () => {
  if (!dom.image.src) return;
  const a = document.createElement('a');
  a.href = dom.image.src;
  a.download = 'qr-code.png';
  a.click();
});
dom.scanFile.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  await scanQrFromFile(file);
});

syncTypeUi();
generateQr();
