import './style.css';
import { t } from './i18n.js';

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

let qrEncoderPromise;
let qrScannerPromise;

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

function clearPreview() {
  dom.image.hidden = true;
  dom.image.removeAttribute('src');
  dom.download.disabled = true;
}

function debounce(fn, wait = 120) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), wait);
  };
}

async function loadQrEncoder() {
  if (!qrEncoderPromise) {
    qrEncoderPromise = import('qrcode')
      .then((module) => module)
      .catch((error) => {
        qrEncoderPromise = undefined;
        throw error;
      });
  }
  return qrEncoderPromise;
}

async function loadQrScanner() {
  if (!qrScannerPromise) {
    qrScannerPromise = import('jsqr')
      .then((module) => module.default || module)
      .catch((error) => {
        qrScannerPromise = undefined;
        throw error;
      });
  }
  return qrScannerPromise;
}

function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
    image.src = url;
  });
}

async function scanQrWithJsQr(file) {
  const image = await loadImageFile(file);
  const jsQR = await loadQrScanner().catch(() => {
    throw new Error('qr-lib');
  });
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const result = jsQR(imageData.data, canvas.width, canvas.height, {
    inversionAttempts: 'attemptBoth',
  });
  return result?.data || '';
}

async function generateQr({ silentWhenEmpty = false } = {}) {
  const text = buildPayload();
  const size = Number(dom.size.value || 256);

  if (!text) {
    clearPreview();
    if (silentWhenEmpty) {
      setMessage('');
    } else {
      setMessage(t('qr.error.empty'), true);
    }
    return;
  }

  try {
    const { toDataURL } = await loadQrEncoder().catch(() => {
      throw new Error('qr-lib');
    });
    const url = await toDataURL(text, { width: size, margin: 1, errorCorrectionLevel: 'M' });
    dom.image.src = url;
    dom.image.hidden = false;
    dom.download.disabled = false;
    setMessage(t('qr.success.generated'));
  } catch (error) {
    setMessage(error?.message === 'qr-lib' ? t('qr.error.lib') : t('qr.error.generate'), true);
  }
}

async function scanQrFromFile(file) {
  try {
    if ('BarcodeDetector' in window) {
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      const bitmap = await createImageBitmap(file);
      const results = await detector.detect(bitmap);
      bitmap.close?.();

      if (results.length) {
        dom.scanOutput.value = results.map((r) => r.rawValue || '').join('\n');
        setMessage(t('qr.success.scanned'));
        return;
      }
    }

    const fallback = await scanQrWithJsQr(file);
    if (fallback) {
      dom.scanOutput.value = fallback;
      setMessage(t('qr.success.scanned'));
      return;
    }

    dom.scanOutput.value = '';
    setMessage(
      'BarcodeDetector' in window ? t('qr.error.notFound') : t('qr.error.unsupported'),
      true,
    );
  } catch (error) {
    setMessage(error?.message === 'qr-lib' ? t('qr.error.lib') : t('qr.error.scan'), true);
  }
}

const schedulePreview = debounce(() => {
  generateQr({ silentWhenEmpty: true }).catch(() => {
    setMessage(t('qr.error.generate'), true);
  });
});

dom.generate.addEventListener('click', () => {
  generateQr().catch(() => {
    setMessage(t('qr.error.generate'), true);
  });
});
dom.type.addEventListener('change', () => {
  syncTypeUi();
  schedulePreview();
});
dom.text?.addEventListener('input', schedulePreview);
dom.wifiSsid?.addEventListener('input', schedulePreview);
dom.wifiPass?.addEventListener('input', schedulePreview);
dom.wifiSec?.addEventListener('change', schedulePreview);
dom.size?.addEventListener('input', schedulePreview);
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

const queueInitialPreview = () => {
  generateQr({ silentWhenEmpty: true }).catch(() => {
    setMessage(t('qr.error.generate'), true);
  });
};

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(queueInitialPreview, { timeout: 800 });
} else {
  window.setTimeout(queueInitialPreview, 0);
}
