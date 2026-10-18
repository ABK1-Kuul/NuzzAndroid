# Nuzz Mobile Prototype

A pitch prototype of a mobile app for Nuzz (nuzz.space), a social focus-timer product.
Purpose: let the Nuzz creator install it on his phone and judge the mobile look and feel.
It runs on MOCK DATA only. No real backend exists yet. Everything must be easy to swap for a real API later.

Read before any task: `docs/SPEC.md`, then every file in `.agents/rules/`.
Visual references live in `docs/screenshots/` (web app screenshots). Match them, adapted for mobile.

## Stack (do not change without asking)
- Expo (current stable SDK), React Native, TypeScript (strict), Expo Router
- Styling: plain `StyleSheet` + typed theme in `src/theme/`. No styling frameworks.
- State: Zustand (timer/session). Everything else reads from repositories.
- Libraries: react-native-svg, react-native-reanimated, expo-haptics, expo-notifications,
  expo-image, lucide-react-native, date-fns, @react-native-async-storage/async-storage
- Add a new dependency only if truly needed, and say why in your plan.

## Commands
- `npm install`
- `npx expo start` (device via Expo Go) / `npx expo start --web` (for browser screenshots)
- `npm run typecheck` (tsc --noEmit), `npm run lint`, `npm test`

## Structure
```
app/            Expo Router screens (thin: compose components, call repositories)
src/theme/      colors, spacing, radius, typography tokens
src/components/ reusable UI (Card, Button, Avatar, Pill, Ring, Heatmap...)
src/data/       types.ts, repositories/, mock/
src/store/      timer store
docs/           SPEC.md, screenshots/
```

## Always
- Make a short plan first and wait for approval on anything touching more than 3 files.
- Work one phase/task at a time. Commit after each with a clear message.
- Use theme tokens for every color, spacing, radius and font size.
- Fetch data only through `src/data/repositories/*`.
- Handle loading, empty and error states on every data screen.
- Run `/verify` before saying a task is done.
- Mock data uses FICTIONAL people only. Never copy real usernames, photos or posts from the screenshots.

## Never
- Hardcode colors, sizes or data inside screen components.
- Count timer time with `setInterval` ticks (see `.agents/rules/timer.md`).
- Use localStorage, or call any real Nuzz endpoint.
- Delete or rewrite files outside the task's scope, run destructive commands, or reinstall node_modules without asking.
- Build out-of-scope features listed in `docs/SPEC.md`.
