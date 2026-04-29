import './style.css';
import { onLocaleChange, t } from './i18n.js';

const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const jsonMeta = document.getElementById('jsonMeta');
const messageEl = document.getElementById('jsonMessage');
const jsonHighlight = document.getElementById('jsonHighlight');
const jsonTree = document.getElementById('jsonTree');
const jsonSearch = document.getElementById('jsonSearch');
const collapseTreeBtn = document.getElementById('collapseTreeBtn');
const jsonStats = document.getElementById('jsonStats');
let lastParsedValue = null;
let lastFormattedValue = '';

const statsCopy = {
  ko: {
    type: '타입',
    topKeys: '상위 키',
    depth: '깊이',
    nodes: '노드',
    size: '크기',
    array: '배열',
    object: '객체',
    primitive: '값',
  },
  en: {
    type: 'Type',
    topKeys: 'Top keys',
    depth: 'Depth',
    nodes: 'Nodes',
    size: 'Size',
    array: 'Array',
    object: 'Object',
    primitive: 'Value',
  },
};

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('message--error', isError);
}

function copyValue(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const value = el.value || el.textContent || '';
  navigator.clipboard
    .writeText(value)
    .then(() => showMessage(t('common.copySuccess')))
    .catch(() => showMessage(t('common.copyFail'), true));
}

function summarizeJson(value) {
  if (Array.isArray(value)) {
    return t('json.meta.array', { count: value.length });
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    const sample = keys.slice(0, 5).join(', ');
    const suffix = keys.length > 5 ? ', …' : '';
    const examples = keys.length ? `${sample}${suffix}` : '—';
    return t('json.meta.object', { count: keys.length, examples });
  }
  return t('json.meta.primitive', { type: typeof value });
}

function getStatsCopy(locale = document.documentElement.getAttribute('lang') || 'ko') {
  return statsCopy[locale] || statsCopy.en;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(bytes >= 10240 ? 0 : 1)} KB`;
}

function collectJsonStats(value, depth = 1) {
  if (Array.isArray(value)) {
    return value.reduce(
      (stats, child) => {
        const childStats = collectJsonStats(child, depth + 1);
        return {
          depth: Math.max(stats.depth, childStats.depth),
          objects: stats.objects + childStats.objects,
          arrays: stats.arrays + childStats.arrays,
          primitives: stats.primitives + childStats.primitives,
        };
      },
      { depth, objects: 0, arrays: 1, primitives: 0 },
    );
  }

  if (value && typeof value === 'object') {
    return Object.values(value).reduce(
      (stats, child) => {
        const childStats = collectJsonStats(child, depth + 1);
        return {
          depth: Math.max(stats.depth, childStats.depth),
          objects: stats.objects + childStats.objects,
          arrays: stats.arrays + childStats.arrays,
          primitives: stats.primitives + childStats.primitives,
        };
      },
      { depth, objects: 1, arrays: 0, primitives: 0 },
    );
  }

  return { depth, objects: 0, arrays: 0, primitives: 1 };
}

function renderStats(value = lastParsedValue, formatted = lastFormattedValue) {
  if (!jsonStats) return;
  if (value == null && !formatted) {
    jsonStats.innerHTML = '';
    return;
  }

  const copy = getStatsCopy();
  const topKeys = value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value) : [];
  const stats = collectJsonStats(value);
  const type = Array.isArray(value) ? copy.array : value && typeof value === 'object' ? copy.object : copy.primitive;
  const entries = [
    [copy.type, type],
    [copy.topKeys, topKeys.length ? topKeys.slice(0, 3).join(', ') : '—'],
    [copy.depth, String(stats.depth)],
    [copy.nodes, `${stats.objects + stats.arrays + stats.primitives}`],
    [copy.size, formatBytes(new TextEncoder().encode(formatted || '').length)],
  ];

  jsonStats.innerHTML = entries
    .map(
      ([label, value]) => `
        <div class="tool-inspector__item">
          <span class="tool-inspector__label">${escapeHtml(label)}</span>
          <span class="tool-inspector__value">${escapeHtml(value)}</span>
        </div>
      `,
    )
    .join('');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return ch;
    }
  });
}

function highlightJson(jsonString) {
  const escaped = escapeHtml(jsonString);
  return escaped
    .replace(/(&quot;(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*&quot;)(?=\s*:)/g, '<span class="token token-key">$1</span>')
    .replace(/(:\s*)(&quot;(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*&quot;)/g, '$1<span class="token token-string">$2</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="token token-boolean">$1</span>')
    .replace(/(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, '<span class="token token-number">$1</span>');
}

function describe(value) {
  if (Array.isArray(value)) {
    return `${t('json.treeNode.array')} · ${value.length}`;
  }
  if (value && typeof value === 'object') {
    return `${t('json.treeNode.object')} · ${Object.keys(value).length}`;
  }
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

function buildTreeNode(label, value, path = []) {
  const filterValue = `${label ?? ''} ${typeof value} ${JSON.stringify(value ?? '').toLowerCase()}`;
  if (value && (typeof value === 'object')) {
    const details = document.createElement('details');
    details.className = 'json-node';
    details.open = path.length <= 1;
    details.dataset.filterValue = filterValue;

    const summary = document.createElement('summary');
    summary.textContent = `${label ?? '(root)'} • ${describe(value)}`;
    details.appendChild(summary);

    Object.entries(value).forEach(([key, child]) => {
      details.appendChild(buildTreeNode(key, child, [...path, key]));
    });
    return details;
  }
  const leaf = document.createElement('div');
  leaf.className = 'json-leaf';
  leaf.dataset.filterValue = filterValue;
  const labelSpan = document.createElement('span');
  labelSpan.className = 'json-leaf__key';
  labelSpan.textContent = label ?? 'value';
  const valueSpan = document.createElement('span');
  valueSpan.className = 'json-leaf__value';
  valueSpan.textContent = describe(value);
  leaf.append(labelSpan, valueSpan);
  return leaf;
}

function renderTree(value) {
  jsonTree.innerHTML = '';
  jsonTree.appendChild(buildTreeNode(null, value));
}

function applySearchFilter(term) {
  const query = term.trim().toLowerCase();
  const nodes = jsonTree.querySelectorAll('[data-filter-value]');
  nodes.forEach((node) => {
    if (!query) {
      node.classList.remove('is-dim');
      node.classList.remove('is-match');
      return;
    }
    const matches = node.dataset.filterValue?.toLowerCase().includes(query);
    node.classList.toggle('is-match', Boolean(matches));
    node.classList.toggle('is-dim', !matches);
  });
}

function collapseTree() {
  jsonTree.querySelectorAll('details.json-node').forEach((details) => {
    details.open = false;
  });
}

function formatJson({ pretty = true } = {}) {
  try {
    const trimmed = jsonInput.value.trim();
    if (!trimmed) {
      jsonOutput.value = '';
      jsonHighlight.innerHTML = '';
      jsonTree.innerHTML = '';
      jsonMeta.textContent = t('json.meta.empty');
      lastParsedValue = null;
      lastFormattedValue = '';
      renderStats();
      showMessage(t('messages.json.empty'));
      return;
    }

    const parsed = JSON.parse(trimmed);
    const formatted = pretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
    lastParsedValue = parsed;
    lastFormattedValue = formatted;
    jsonOutput.value = formatted;
    jsonHighlight.innerHTML = highlightJson(JSON.stringify(parsed, null, 2));
    renderTree(parsed);
    jsonMeta.textContent = summarizeJson(parsed);
    renderStats(parsed, formatted);
    showMessage(pretty ? t('messages.json.pretty') : t('messages.json.compact'));
    applySearchFilter(jsonSearch.value);
  } catch (err) {
    showMessage(t('messages.json.error', { message: err.message }), true);
  }
}

document.getElementById('formatBtn').addEventListener('click', () => formatJson({ pretty: true }));
document.getElementById('minifyBtn').addEventListener('click', () => formatJson({ pretty: false }));
document.getElementById('copyJsonBtn').addEventListener('click', () => copyValue('jsonOutput'));

document.getElementById('clearBtn').addEventListener('click', () => {
  jsonInput.value = '';
  jsonOutput.value = '';
  jsonHighlight.innerHTML = '';
  jsonTree.innerHTML = '';
  jsonMeta.textContent = t('json.meta.empty');
  lastParsedValue = null;
  lastFormattedValue = '';
  renderStats();
  showMessage(t('messages.json.cleared'));
});

document.getElementById('sampleBtn').addEventListener('click', () => {
  const sample = {
    service: 'stateless-tools',
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    features: ['uuid', 'base64', 'json-viewer'],
    flags: {
      beta: true,
      privacySafe: true,
    },
  };
  jsonInput.value = JSON.stringify(sample, null, 2);
  showMessage(t('messages.json.sample'));
  formatJson({ pretty: true });
});

if (jsonSearch) {
  jsonSearch.addEventListener('input', (event) => {
    applySearchFilter(event.target.value);
  });
}

if (collapseTreeBtn) {
  collapseTreeBtn.addEventListener('click', () => {
    collapseTree();
  });
}

onLocaleChange(() => {
  renderStats();
});
