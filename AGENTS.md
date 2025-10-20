# Repository Guidelines

## Project Structure & Module Organization
All user-facing assets live in `public/`. Use `public/index.html` as the landing hub and create dedicated tool pages under `public/tools/` (e.g., `public/tools/base64.html`). Shared styling belongs in `public/assets/css/`, while client-side scripts live in `public/assets/js/`. Keep documentation, playbooks, and marketing copy within `docs/` as the site grows. When introducing new utilities, copy an existing page as a template to preserve layout and navigation.

## Build, Test, and Development Commands
This project has zero build tooling—serve the folder statically. For local checks, run `python -m http.server --directory public 3000` or `npx serve public`. Add lightweight smoke tests with Playwright or Cypress by pointing them at the served directory if automation is required. Bundle analyzers or npm build scripts are unnecessary unless we migrate to a framework.

## Coding Style & Naming Conventions
Favor semantic HTML with accessible labels and `aria` attributes. Stick to two-space indentation inside HTML, CSS, and JavaScript files. Name new tool pages with lowercase kebab-case filenames (`jwt-decoder.html`) and mirror that slug in CSS class hooks. Extend the existing CSS tokens before adding new colors or shadows, and keep script helpers modular inside `main.js` (add pure functions and guard by DOM availability).

## Testing Guidelines
Manually verify each tool page in the latest Chrome, Firefox, and Safari (desktop) plus one mobile viewport. When adding automation, place tests under `tests/` with the `<tool>.spec.js` naming convention and document how to execute them in `docs/testing.md`. Validate clipboard interactions, keyboard shortcuts (`Ctrl+B`, `Ctrl+J`, `Ctrl+K`, `Ctrl+H`), and error messaging on every release. Aim to keep lighthouse performance scores above 90.

## Commit & Pull Request Guidelines
Use Conventional Commits (`feat(base64): add decode preview`, `fix(json): handle invalid token`) and include a short summary of manual verification in the PR description. Attach screenshots or GIFs for UI updates, especially new tool launches. Reference issue IDs with `Closes #123` when applicable, and wait for static checks or lint scripts introduced in the future to pass before merging. Request at least one reviewer when touching shared assets or navigation.

## Security & Configuration Tips
Never commit `.env*` files; document required keys in `docs/configuration.md` and load them via the hosting platform if server work appears later. Run `npm audit --production` quarterly if runtime dependencies are introduced. Sanitize and validate any text rendered back to users to guard against XSS, especially if you later support URL query presets or shareable links.
