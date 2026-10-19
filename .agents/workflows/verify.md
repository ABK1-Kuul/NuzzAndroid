---
description: Typecheck, lint, test, run and visually check the app
---
1. Run `npm run typecheck`. Fix all errors.
2. Run `npm run lint`. Fix all errors.
3. Run `npm test`. Fix failures; do not delete tests to make them pass.
4. Start `npx expo start --web`, open the affected screen in the browser at a phone-sized viewport (390x844) and take a screenshot.
5. Compare against the reference screenshot in `docs/screenshots-mobile/` (or `docs/screenshots/` if no mobile one exists) and the acceptance criteria in `docs/SPEC.md`. List every visible difference.
6. Check: no hardcoded colors or sizes added, no direct imports from `src/data/mock/` in screens, safe areas respected.
7. Summarize results as pass/fail per check. Do not claim success if any check failed.
