# Dev Utility Hub

Multi-page utility site featuring a Base64 encoder/decoder, JSON formatter, and color picker. Everything runs client-side with zero build tooling.

## Quick Start

1. Serve the `public/` directory (`python -m http.server --directory public 3000`, `npx serve public`, etc.).
2. Visit `http://localhost:3000/index.html` and open the tool you need from the landing page.

## Project Layout

- `public/index.html` – landing hub linking to each tool page.
- `public/tools/*.html` – individual tool screens (`base64`, `json`, `color`).
- `public/assets/css/styles.css` – shared styling, theming, and responsive layout rules.
- `public/assets/js/main.js` – vanilla JavaScript wiring for each tool plus keyboard shortcuts.

## Development Tips

- Extend a tool by editing its HTML page and adding handlers in `public/assets/js/main.js`.
- Reuse existing CSS utility classes; introduce new ones within `styles.css` to keep styling centralized.
- When adding a new tool, copy one of the existing pages as a template and update navigation links plus `data-page` attributes for keyboard shortcuts.

## Future Enhancements

- Persist last-used inputs via `localStorage` or `IndexedDB`.
- Add additional developer utilities (UUID generator, JWT inspector, text diff).
- Introduce analytics/ad slots and toggle switches to preview how placements affect layout.
