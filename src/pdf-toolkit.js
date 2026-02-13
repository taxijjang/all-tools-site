import './style.css';
import { t } from './i18n.js';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

const dom = {
  mergeFiles: document.getElementById('pdfMergeFiles'),
  singleFile: document.getElementById('pdfSingleFile'),
  mergeDropzone: document.getElementById('pdfMergeDropzone'),
  singleDropzone: document.getElementById('pdfSingleDropzone'),
  mergeStatus: document.getElementById('pdfMergeFilesStatus'),
  singleStatus: document.getElementById('pdfSingleFileStatus'),
  mergeClearBtn: document.getElementById('pdfMergeClearBtn'),
  singleClearBtn: document.getElementById('pdfSingleClearBtn'),
  mergeBtn: document.getElementById('pdfMergeBtn'),
  splitBtn: document.getElementById('pdfSplitBtn'),
  watermarkBtn: document.getElementById('pdfWatermarkBtn'),
  metadataBtn: document.getElementById('pdfMetadataBtn'),
  extractBtn: document.getElementById('pdfExtractTextBtn'),
  from: document.getElementById('pdfFromPage'),
  to: document.getElementById('pdfToPage'),
  watermark: document.getElementById('pdfWatermarkText'),
  output: document.getElementById('pdfOutput'),
  download: document.getElementById('pdfDownloadBtn'),
  message: document.getElementById('pdfMessage'),
};

let lastBlob = null;
let pdfjsModule;
const MAX_STATUS_FILES = 3;

function setMessage(text, error = false) {
  dom.message.textContent = text;
  dom.message.classList.toggle('message--error', error);
}

function setTextResult(content, message) {
  lastBlob = null;
  dom.output.value = content || '';
  dom.download.disabled = true;
  if (message) {
    setMessage(message);
  }
}

function setPdfResult(blob, filename, detail, message) {
  lastBlob = { blob, filename };
  dom.output.value = detail;
  dom.download.disabled = false;
  if (message) {
    setMessage(message);
  }
}

function setFilesToInput(input, files) {
  const dt = new DataTransfer();
  Array.from(files).forEach((file) => dt.items.add(file));
  input.files = dt.files;
}

function filterPdfFiles(fileList) {
  const allFiles = Array.from(fileList);
  const pdfFiles = allFiles.filter((file) => file.type === 'application/pdf' || /\.pdf$/i.test(file.name));
  const invalidCount = allFiles.length - pdfFiles.length;
  return { files: pdfFiles, invalidCount };
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return t('pdf.meta.valueUnknown');
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let idx = 0;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx += 1;
  }
  return `${value.toFixed(idx === 0 ? 0 : 1)} ${units[idx]}`;
}

function formatFileSummaryLabel(files) {
  if (!files.length) {
    return t('pdf.fileNone');
  }
  return t('pdf.fileSummaryHeader', { count: files.length });
}

function updateDropStatus() {
  const mergeFiles = Array.from(dom.mergeFiles.files || []);
  const singleFiles = Array.from(dom.singleFile.files || []);

  if (dom.mergeStatus) {
    dom.mergeStatus.innerHTML = '';
    dom.mergeStatus.append(createFileStatusNode(mergeFiles, t('pdf.fileSizeLabel', { size: calculateTotalSize(mergeFiles) })));
  }
  if (dom.singleStatus) {
    dom.singleStatus.innerHTML = '';
    dom.singleStatus.append(createFileStatusNode(singleFiles, t('pdf.fileSizeLabel', { size: calculateTotalSize(singleFiles) })));
  }

  if (dom.mergeClearBtn) {
    dom.mergeClearBtn.disabled = mergeFiles.length === 0;
  }
  if (dom.singleClearBtn) {
    dom.singleClearBtn.disabled = singleFiles.length === 0;
  }
}

function calculateTotalSize(files) {
  const total = files.reduce((sum, file) => sum + (Number(file.size) || 0), 0);
  return formatBytes(total);
}

function createFileStatusNode(files, totalLabel) {
  const container = document.createDocumentFragment();
  const summary = document.createElement('p');
  if (!files.length) {
    summary.textContent = t('pdf.fileNone');
    container.appendChild(summary);
    return container;
  }

  summary.textContent = `${formatFileSummaryLabel(files)} · ${totalLabel}`;
  container.appendChild(summary);

  const list = document.createElement('ul');
  list.className = 'file-drop-zone__list';
  files.slice(0, MAX_STATUS_FILES).forEach((file) => {
    const li = document.createElement('li');
    li.className = 'file-drop-zone__list-item';
    const fileLabel = t('pdf.fileMeta', { name: file.name, size: formatBytes(file.size) });
    li.textContent = fileLabel;
    list.appendChild(li);
  });
  if (files.length > MAX_STATUS_FILES) {
    const rest = document.createElement('li');
    rest.className = 'file-drop-zone__list-item';
    rest.textContent = t('pdf.moreFiles', { count: files.length - MAX_STATUS_FILES });
    list.appendChild(rest);
  }
  container.appendChild(list);
  return container;
}

function clearInput(input) {
  setFilesToInput(input, []);
  updateDropStatus();
}

function bindFileDropzone(input, dropzone, options) {
  if (!input || !dropzone) return;
  const { allowMulti = true } = options;
  const onInputChange = () => {
    const { files, invalidCount } = filterPdfFiles(input.files || []);
    if (invalidCount > 0) {
      setMessage(t('messages.pdf.invalidFileType'), true);
    }
    if (!allowMulti && files.length > 1) {
      setMessage(t('messages.pdf.singleFileOnly'), true);
      setFilesToInput(input, files.slice(0, 1));
      updateDropStatus();
      return;
    }
    setFilesToInput(input, files);
    updateDropStatus();
  };

  input.addEventListener('change', onInputChange);

  const prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const removeActive = () => dropzone.classList.remove('file-drop-zone--active');

  dropzone.addEventListener('dragenter', (e) => {
    prevent(e);
    dropzone.classList.add('file-drop-zone--active');
  });
  dropzone.addEventListener('dragover', (e) => {
    prevent(e);
    e.dataTransfer.dropEffect = 'copy';
    dropzone.classList.add('file-drop-zone--active');
  });
  dropzone.addEventListener('dragleave', (e) => {
    prevent(e);
    if (!dropzone.contains(e.relatedTarget)) {
      removeActive();
    }
  });
  dropzone.addEventListener('drop', (e) => {
    prevent(e);
    removeActive();
    const { files, invalidCount } = filterPdfFiles(e.dataTransfer?.files || []);
    if (invalidCount > 0) {
      setMessage(t('messages.pdf.invalidFileType'), true);
    }
    if (!allowMulti && files.length > 1) {
      setMessage(t('messages.pdf.singleFileOnly'), true);
      setFilesToInput(input, files.slice(0, 1));
      updateDropStatus();
      return;
    }
    setFilesToInput(input, files);
    updateDropStatus();
  });
}

function getFileList() {
  return Array.from(dom.mergeFiles.files || []);
}

function getSingleFile() {
  return dom.singleFile.files?.[0];
}

function getPageRange(totalPages) {
  const fromInput = Number(dom.from.value || 1);
  const toInput = Number(dom.to.value || fromInput);
  const from = Math.min(Math.max(1, fromInput), totalPages);
  const to = Math.min(Math.max(from, toInput), totalPages);
  return { from, to };
}

function normalizeBytes(bytes) {
  if (!Number.isFinite(bytes)) return t('pdf.meta.valueUnknown');
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function formatDateValue(date) {
  if (!date) return t('pdf.meta.valueUnknown');
  return new Intl.DateTimeFormat(document.documentElement.lang || 'en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

async function getPdfDoc(file) {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return { pdf, bytes };
}

async function loadPdfJs() {
  if (pdfjsModule) return pdfjsModule;
  const module = await import('pdfjs-dist');
  module.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
  pdfjsModule = module;
  return module;
}

async function mergePdfs() {
  const files = getFileList();
  if (files.length < 2) {
    setMessage(t('messages.pdf.needTwoFiles'), true);
    return;
  }

  const merged = await PDFDocument.create();
  let totalPages = 0;

  for (const file of files) {
    const { pdf } = await getPdfDoc(file);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
    totalPages += pages.length;
  }

  const output = await merged.save();
  const blob = new Blob([output], { type: 'application/pdf' });
  setPdfResult(
    blob,
    `merged-${Date.now()}.pdf`,
    t('messages.pdf.mergeSummary', { count: files.length, pages: totalPages }),
    t('messages.pdf.mergeDone')
  );
}

async function splitPdfRange() {
  const file = getSingleFile();
  if (!file) {
    setMessage(t('messages.pdf.requireOneFile'), true);
    return;
  }

  const { pdf } = await getPdfDoc(file);
  const total = pdf.getPageCount();
  const { from, to } = getPageRange(total);
  if (from > to) {
    setMessage(t('messages.pdf.invalidRange'), true);
    return;
  }

  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, idx) => from - 1 + idx);
  const pages = await out.copyPages(pdf, indices);
  pages.forEach((page) => out.addPage(page));

  const output = await out.save();
  const blob = new Blob([output], { type: 'application/pdf' });
  setPdfResult(
    blob,
    `split-${from}-${to}-${Date.now()}.pdf`,
    t('messages.pdf.splitSummary', { from, to, total }),
    t('messages.pdf.splitDone')
  );
}

async function watermarkPdf() {
  const file = getSingleFile();
  if (!file) {
    setMessage(t('messages.pdf.requireOneFile'), true);
    return;
  }
  const text = dom.watermark.value.trim();
  if (!text) {
    setMessage(t('messages.pdf.emptyWatermark'), true);
    return;
  }

  const { pdf } = await getPdfDoc(file);
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
  setPdfResult(
    blob,
    `watermark-${Date.now()}.pdf`,
    t('messages.pdf.watermarkSummary', { pages: pdf.getPageCount() }),
    t('messages.pdf.watermarkDone')
  );
}

async function readMetadata() {
  const file = getSingleFile();
  if (!file) {
    setMessage(t('messages.pdf.requireOneFile'), true);
    return;
  }

  const { pdf, bytes } = await getPdfDoc(file);
  const lines = [
    `${t('pdf.meta.filename')}: ${file.name}`,
    `${t('pdf.meta.size')}: ${normalizeBytes(bytes.byteLength)}`,
    `${t('pdf.meta.pages')}: ${pdf.getPageCount()}`,
    `${t('pdf.meta.encrypted')}: ${pdf.isEncrypted ? t('common.yes') : t('common.no')}`,
    `${t('pdf.meta.title')}: ${pdf.getTitle() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.author')}: ${pdf.getAuthor() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.subject')}: ${pdf.getSubject() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.keywords')}: ${pdf.getKeywords() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.creator')}: ${pdf.getCreator() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.producer')}: ${pdf.getProducer() || t('pdf.meta.valueNone')}`,
    `${t('pdf.meta.created')}: ${formatDateValue(pdf.getCreationDate())}`,
    `${t('pdf.meta.modified')}: ${formatDateValue(pdf.getModificationDate())}`,
  ];
  setTextResult(lines.join('\n'), t('messages.pdf.metadataDone'));
}

async function extractText() {
  const file = getSingleFile();
  if (!file) {
    setMessage(t('messages.pdf.requireOneFile'), true);
    return;
  }

  const [bytes, { pdf: loadedPdf }] = await Promise.all([
    file.arrayBuffer(),
    getPdfDoc(file),
  ]);
  const totalPages = loadedPdf.getPageCount();
  const { from, to } = getPageRange(totalPages);

  const pdfjs = await loadPdfJs();
  const loaded = pdfjs.getDocument({ data: bytes });
  const pdf = await loaded.promise;

  try {
    const chunks = [];
    for (let pageIndex = from; pageIndex <= to; pageIndex += 1) {
      const page = await pdf.getPage(pageIndex);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item?.str || '')
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      chunks.push(`【${t('pdf.page')} ${pageIndex}】\n${pageText || t('pdf.emptyText')}`);
    }
    const text = chunks.join('\n\n');
    setTextResult(text, t('messages.pdf.extractDone', { from, to }));
  } finally {
    await pdf.destroy().catch(() => undefined);
  }
}

dom.download.addEventListener('click', () => {
  if (!lastBlob) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(lastBlob.blob);
  a.download = lastBlob.filename;
  a.click();
  URL.revokeObjectURL(a.href);
});

bindFileDropzone(dom.mergeFiles, dom.mergeDropzone, { allowMulti: true });
bindFileDropzone(dom.singleFile, dom.singleDropzone, { allowMulti: false });
updateDropStatus();
dom.mergeClearBtn?.addEventListener('click', () => clearInput(dom.mergeFiles));
dom.singleClearBtn?.addEventListener('click', () => clearInput(dom.singleFile));

dom.mergeBtn.addEventListener('click', () => mergePdfs().catch(() => setMessage(t('messages.pdf.mergeError'), true)));
dom.splitBtn.addEventListener('click', () => splitPdfRange().catch(() => setMessage(t('messages.pdf.splitError'), true)));
dom.watermarkBtn.addEventListener('click', () => watermarkPdf().catch(() => setMessage(t('messages.pdf.watermarkError'), true)));
dom.metadataBtn.addEventListener('click', () => readMetadata().catch(() => setMessage(t('messages.pdf.metadataError'), true)));
dom.extractBtn.addEventListener('click', () => extractText().catch(() => setMessage(t('messages.pdf.extractError'), true)));
