import { t } from './i18n.js';
import { DateTime } from 'luxon';

const dom = {
    nowSeconds: document.getElementById('nowSeconds'),
    nowIso: document.getElementById('nowIso'),
    toggleLive: document.getElementById('toggleLive'),

    tsInput: document.getElementById('tsInput'),
    tsUnit: document.getElementById('tsUnit'),
    btnSetNow: document.getElementById('btnSetNow'),

    dateOutput: document.getElementById('dateOutput'),
    isoOutput: document.getElementById('isoOutput'),
    relativeOutput: document.getElementById('relativeOutput'),

    dateInput: document.getElementById('dateInput'),
    dateToTsBtn: document.getElementById('dateToTsBtn'),
    reverseOutput: document.getElementById('reverseOutput'),
};

let liveInterval = null;
let isLive = true;

// --- Live Clock ---
function updateLive() {
    const now = DateTime.now();
    dom.nowSeconds.value = Math.floor(now.toSeconds());
    dom.nowIso.value = now.toISO();
}

function startLive() {
    updateLive();
    liveInterval = setInterval(updateLive, 1000);
    dom.toggleLive.textContent = t('timestamp.current.stop');
    isLive = true;
}

function stopLive() {
    clearInterval(liveInterval);
    dom.toggleLive.textContent = t('timestamp.current.start');
    isLive = false;
}

dom.toggleLive.addEventListener('click', () => {
    if (isLive) stopLive();
    else startLive();
});

// --- Converter: Timestamp -> Date ---
function convertTs() {
    const input = dom.tsInput.value.trim();
    if (!input) {
        dom.dateOutput.value = '';
        dom.isoOutput.value = '';
        dom.relativeOutput.value = '';
        return;
    }

    let ts = parseInt(input, 10);
    if (isNaN(ts)) return; // Or show error

    const unit = dom.tsUnit.value;
    // Auto-detect heuristic if user pastes extremely large number? 
    // For now stick to manual toggle + simple heuristic warning if year is 50000?

    // Luxon takes millis
    const millis = unit === 'sec' ? ts * 1000 : ts;
    const dt = DateTime.fromMillis(millis);

    if (!dt.isValid) {
        dom.dateOutput.value = 'Invalid Date';
        return;
    }

    dom.dateOutput.value = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS); // Local
    dom.isoOutput.value = dt.toUTC().toISO();
    dom.relativeOutput.value = dt.toRelative();
}

dom.tsInput.addEventListener('input', convertTs);
dom.tsUnit.addEventListener('change', convertTs);

dom.btnSetNow.addEventListener('click', () => {
    const now = Math.floor(Date.now() / 1000);
    dom.tsInput.value = now;
    dom.tsUnit.value = 'sec';
    // Trigger input event for persistence if any, and conversion
    dom.tsInput.dispatchEvent(new Event('input'));
    dom.tsUnit.dispatchEvent(new Event('change'));
    convertTs();
});

// --- Reverse: Date -> Timestamp ---
dom.dateToTsBtn.addEventListener('click', () => {
    const val = dom.dateInput.value;
    if (!val) return;

    // dateInput is datetime-local, so it doesn't have offset info naturally.
    // It parses as local time.
    const dt = DateTime.fromISO(val);
    if (dt.isValid) {
        dom.reverseOutput.value = Math.floor(dt.toSeconds());
    } else {
        dom.reverseOutput.value = 'Invalid Date';
    }
});

// Initial start
startLive();

// Need to handle locale change for button text updates?
// Ideally i18n logic handles static text, but dynamic text like "Stop/Start" needs care.
// For MVP, we just use the initial state.
