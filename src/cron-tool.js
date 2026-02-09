import cronstrue from 'cronstrue/i18n';
// Switch to CDN for reliable ESM support without build config headaches
import { parseExpression } from 'https://esm.sh/cron-parser@4.9.0';
import { onLocaleChange } from './i18n.js';

const dom = {
    input: document.getElementById('cronInput'),
    explanation: document.getElementById('cronExplanation'),
    nextList: document.getElementById('nextRunList'),
    snippet: document.getElementById('cronSnippet'),
    message: document.getElementById('cronMessage'),
    presets: document.querySelectorAll('[data-preset]'),
};

let currentLocale = document.documentElement.lang || 'ko';

function update() {
    const expression = dom.input.value.trim();
    if (!expression) return;

    try {
        // 1. Human Readable Description
        const desc = cronstrue.toString(expression, { locale: currentLocale });
        dom.explanation.textContent = desc;
        dom.explanation.className = 'cron-explanation'; // reset error class
        dom.input.classList.remove('error');

        // 2. Next Runs
        const interval = parseExpression(expression);
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

        // 3. Snippet
        dom.snippet.textContent = `${expression} /path/to/command`;

    } catch (err) {
        if (expression.length > 0) {
            dom.explanation.textContent = currentLocale === 'ko' ? '유효하지 않은 Cron 표현식입니다.' : 'Invalid cron expression';
            dom.explanation.className = 'cron-explanation error';
            dom.input.classList.add('error');
        }
        dom.nextList.innerHTML = '';
        dom.snippet.textContent = '# Invalid cron expression';
    }
}

// Event Listeners
dom.input.addEventListener('input', update);

dom.presets.forEach(btn => {
    btn.addEventListener('click', () => {
        dom.input.value = btn.dataset.preset;
        dom.input.dispatchEvent(new Event('input', { bubbles: true }));
    });
});

// Update on locale change
onLocaleChange((newLocale) => {
    currentLocale = newLocale;
    update();
});

// Initial run
update();
