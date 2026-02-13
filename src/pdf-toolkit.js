import './style.css';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

const dom = {
  files: document.getElementById('pdfFiles'),
  mergeBtn: document.getElementById('pdfMergeBtn'),
  splitBtn: document.getElementById('pdfSplitBtn'),
  watermarkBtn: document.getElementById('pdfWatermarkBtn'),
  from: document.getElementById('pdfFromPage'),
  to: document.getElementById('pdfToPage'),
  watermark: document.getElementById('pdfWatermarkText'),
  output: document.getElementById('pdfOutput'),
  download: document.getElementById('pdfDownloadBtn'),
  message: document.getElementById('pdfMessage'),
};

let lastBlob = null;

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function setResult(blob, filename, detail) {
  lastBlob = { blob, filename };
  dom.output.value = detail;
  dom.download.disabled = false;
}

async function mergePdfs() {
  const files = Array.from(dom.files.files || []);
  if (files.length < 2) {
    setMessage('병합하려면 PDF 파일을 2개 이상 선택하세요.', true);
    return;
  }

  const merged = await PDFDocument.create();
  let totalPages = 0;

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
    totalPages += pages.length;
  }

  const output = await merged.save();
  const blob = new Blob([output], { type: 'application/pdf' });
  setResult(blob, 'merged.pdf', `병합 완료: ${files.length}개 파일, 총 ${totalPages}페이지`);
  setMessage('PDF 병합 완료.');
}

async function splitPdfRange() {
  const file = dom.files.files?.[0];
  if (!file) {
    setMessage('분할할 PDF 파일 1개를 먼저 선택하세요.', true);
    return;
  }

  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const total = pdf.getPageCount();
  let from = Math.max(1, Number(dom.from.value || 1));
  let to = Math.max(from, Number(dom.to.value || from));
  from = Math.min(from, total);
  to = Math.min(to, total);

  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const pages = await out.copyPages(pdf, indices);
  pages.forEach((p) => out.addPage(p));

  const output = await out.save();
  const blob = new Blob([output], { type: 'application/pdf' });
  setResult(blob, `split-${from}-${to}.pdf`, `분할 완료: ${from}~${to} / 총 ${total}페이지`);
  setMessage('PDF 페이지 범위 추출 완료.');
}

async function watermarkPdf() {
  const file = dom.files.files?.[0];
  if (!file) {
    setMessage('워터마크를 넣을 PDF 파일 1개를 선택하세요.', true);
    return;
  }
  const text = dom.watermark.value.trim();
  if (!text) {
    setMessage('워터마크 텍스트를 입력하세요.', true);
    return;
  }

  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    const size = Math.max(16, Math.floor(width / 24));
    page.drawText(text, {
      x: width * 0.1,
      y: height * 0.5,
      size,
      font,
      color: rgb(0.9, 0.1, 0.1),
      opacity: 0.18,
      rotate: degrees(-25),
    });
  }

  const output = await pdf.save();
  const blob = new Blob([output], { type: 'application/pdf' });
  setResult(blob, 'watermarked.pdf', `워터마크 적용 완료: ${pdf.getPageCount()}페이지`);
  setMessage('워터마크 적용 완료.');
}

dom.download.addEventListener('click', () => {
  if (!lastBlob) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(lastBlob.blob);
  a.download = lastBlob.filename;
  a.click();
  URL.revokeObjectURL(a.href);
});

dom.mergeBtn.addEventListener('click', () => mergePdfs().catch(() => setMessage('PDF 병합 실패.', true)));
dom.splitBtn.addEventListener('click', () => splitPdfRange().catch(() => setMessage('PDF 분할 실패.', true)));
dom.watermarkBtn.addEventListener('click', () => watermarkPdf().catch(() => setMessage('워터마크 적용 실패.', true)));
