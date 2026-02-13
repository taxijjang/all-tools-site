import './style.css';

const dom = {
  picker: document.getElementById('colorPicker'),
  hex: document.getElementById('colorHex'),
  rgb: document.getElementById('colorRgb'),
  hsl: document.getElementById('colorHsl'),
  contrast: document.getElementById('colorContrast'),
  swatch: document.getElementById('colorSwatch'),
  message: document.getElementById('colorMessage'),
};

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function luminance(r, g, b) {
  const arr = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
}

function contrastRatio(c1, c2) {
  const l1 = luminance(c1.r, c1.g, c1.b);
  const l2 = luminance(c2.r, c2.g, c2.b);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return ((a + 0.05) / (b + 0.05)).toFixed(2);
}

function update() {
  try {
    const hex = dom.picker.value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    dom.hex.value = hex.toUpperCase();
    dom.rgb.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    dom.hsl.value = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;

    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    const cw = contrastRatio(rgb, white);
    const cb = contrastRatio(rgb, black);
    dom.contrast.value = `vs White: ${cw} / vs Black: ${cb}`;

    dom.swatch.style.background = hex;
    setMessage('색상 값 변환 완료.');
  } catch {
    setMessage('색상 파싱 오류', true);
  }
}

dom.picker.addEventListener('input', update);

document.querySelectorAll('button[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    if (!target) return;
    await navigator.clipboard.writeText(target.value || '');
    setMessage('복사했습니다.');
  });
});

update();
