# Repository Guidelines

This project is a static résumé site served from the repository root. Use the steps below to keep changes predictable and easy to review.

## Project Structure & Module Organization

- `index.html` is the single entry point; keep new sections semantic and lean.
- `index.css` defines layout and theme tokens (CSS custom properties); extend existing variables when adding styles. `print.css` holds print-only overrides.
- `index.js` manages theme switching, font loading, and print handling; reuse the existing debounce and error-guard patterns for new interactions.
- `images/` stores profile and decorative assets; optimize images before committing.
- `bs-config.json` contains lite-server defaults; avoid manual edits unless you need to change local dev behavior.

## Build, Test, and Development Commands

Run `npm install` once before development.

- `npm run dev` — start `live-server` on `127.0.0.1:3000` with live reload.
- `npm run lite` — alternate local server via `lite-server` (useful if `live-server` conflicts).
- `npm run serve` — production-style static preview using `serve -s .`.
- `npm run format` — apply Prettier to all tracked files; run before opening a PR.

## Coding Style & Naming Conventions

- Prettier defaults (2-space indent, semicolons, single quotes in JS) are the source of truth; avoid hand-formatting.
- Prefer `const`/`let`, arrow functions for callbacks, and early returns for guard clauses.
- Keep class names kebab-case and descriptive; align with existing `theme-*` and `font-*` patterns for new variants.
- Handle DOM access defensively (null checks, `try/catch` around optional features) to match current resilience.

## Testing Guidelines

- No automated tests today; rely on manual verification.
- Before pushing, exercise: theme selector toggling, system dark-mode switch reaction, print button behavior, and responsive layout at mobile/desktop widths.
- Confirm print layout via browser print preview; avoid regressions in `print.css`.

## Commit & Pull Request Guidelines

- Follow Conventional Commits as used here (e.g., `feat:`, `fix:`, `chore:`). Keep scope small and messages in imperative mood.
- PRs should include: summary of changes, screenshots or screen recordings for UI tweaks (desktop + print where applicable), and clear test notes.
- Link related issues or tasks when available, and call out any known limitations or follow-ups.

## Security & Configuration Tips

- Do not commit secrets or tokens; all external assets load from public CDNs.
- Keep `CNAME` unchanged unless explicitly updating the deployed domain.
- If adding third-party scripts, document their purpose and ensure they run in the strictest possible scope.
