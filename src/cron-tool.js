import cronstrue from 'cronstrue/i18n';
import CronExpressionParser from 'cron-parser';
import { onLocaleChange, t } from './i18n.js';

const dom = {
    input: document.getElementById('cronInput'),
    explanation: document.getElementById('cronExplanation'),
    nextList: document.getElementById('nextRunList'),
    message: document.getElementById('cronMessage'),
    presets: document.querySelectorAll('[data-preset]'),
};

let currentLocale = document.documentElement.lang || 'ko';
const LOCALE_MAP = {
    ko: 'ko',
    en: 'en',
};

const CRON_NICKNAMES = {
    '@yearly': '0 0 1 1 *',
    '@annually': '0 0 1 1 *',
    '@monthly': '0 0 1 * *',
    '@weekly': '0 0 * * 0',
    '@daily': '0 0 * * *',
    '@hourly': '0 * * * *',
};

function getCronstrueLocale() {
    return LOCALE_MAP[currentLocale] || 'en';
}

function normalizeExpression(value) {
    const lower = value.toLowerCase();
    return CRON_NICKNAMES[lower] || value;
}

function renderEmpty() {
    dom.explanation.textContent = t('cron.empty');
    dom.explanation.className = 'cron-explanation';
    dom.nextList.innerHTML = '';
    dom.message.textContent = '';
    dom.input.classList.remove('error');
}

function renderInvalid(message) {
    dom.explanation.textContent = t('cron.error.invalid');
    dom.explanation.className = 'cron-explanation error';
    dom.input.classList.add('error');
    dom.nextList.innerHTML = '';
    dom.message.textContent = t('cron.error.details', { message });
    dom.message.classList.add('message--error');
}

function update() {
    const expression = dom.input.value.trim();
    if (!expression) {
        renderEmpty();
        return;
    }

    try {
        const normalized = normalizeExpression(expression);
        // 1. Human Readable Description
        const desc = cronstrue.toString(normalized, { locale: getCronstrueLocale() });
        dom.explanation.textContent = desc;
        dom.explanation.className = 'cron-explanation'; // reset error class
        dom.input.classList.remove('error');
        dom.message.textContent = '';
        dom.message.classList.remove('message--error');

        // 2. Next Runs
        const interval = CronExpressionParser.parse(normalized);
        dom.nextList.innerHTML = '';

        // Generate next 5 dates
        for (let i = 0; i < 5; i++) {
            const next = interval.next();
            const li = document.createElement('li');
            const date = next.toDate();

            li.textContent = date.toLocaleString(currentLocale === 'ko' ? 'ko-KR' : 'en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                weekday: 'long'
            });
            dom.nextList.appendChild(li);
        }

    } catch (err) {
        renderInvalid(err?.message || 'Invalid cron expression');
    }
}

// Event Listeners
dom.input.addEventListener('input', update);

dom.presets.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        dom.input.value = btn.dataset.preset;
        update();
    });
});

// Update on locale change
onLocaleChange((newLocale) => {
    currentLocale = newLocale;
    update();
});

// Initial run
update();
