import './style.css';

const dom = {
  text: document.getElementById('qrText'),
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

function generateQr() {
  const text = dom.text.value.trim();
  const size = Number(dom.size.value || 256);

  if (!text) {
    setMessage('텍스트를 입력하세요.', true);
    return;
  }

  if (!window.QRCode || !window.QRCode.toDataURL) {
    setMessage('QR 라이브러리를 불러오지 못했습니다.', true);
    return;
  }

  window.QRCode.toDataURL(
    text,
    { width: size, margin: 1, errorCorrectionLevel: 'M' },
    (err, url) => {
      if (err) {
        setMessage('QR 생성에 실패했습니다.', true);
        return;
      }
      dom.image.src = url;
      dom.image.hidden = false;
      dom.download.disabled = false;
      setMessage('QR 코드를 생성했습니다.');
    },
  );
}

async function scanQrFromFile(file) {
  if (!('BarcodeDetector' in window)) {
    setMessage('이 브라우저는 QR 스캔을 지원하지 않습니다.', true);
    return;
  }

  try {
    const detector = new BarcodeDetector({ formats: ['qr_code'] });
    const bitmap = await createImageBitmap(file);
    const results = await detector.detect(bitmap);

    if (!results.length) {
      dom.scanOutput.value = '';
      setMessage('QR 코드를 찾지 못했습니다.', true);
      return;
    }

    dom.scanOutput.value = results.map((r) => r.rawValue || '').join('\n');
    setMessage('QR 스캔 완료.');
  } catch {
    setMessage('QR 스캔 처리 중 오류가 발생했습니다.', true);
  }
}

dom.generate.addEventListener('click', generateQr);
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

generateQr();
