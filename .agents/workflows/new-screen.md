# Workflow: /new-screen — Build a Screen from Spec

Use this workflow whenever implementing a new screen or major view component for Nuzz Android.

---

## Prerequisites
Before beginning implementation:
1. Locate the screen specification in [`docs/SPEC.md`](file:///c:/NuzzAndroid/docs/SPEC.md).
2. Check [`docs/screenshots/`](file:///c:/NuzzAndroid/docs/screenshots/) for any visual references or mockups named after this screen.
3. Review relevant architectural rules:
   - Theme & Colors: [`.agents/rules/theme.md`](file:///c:/NuzzAndroid/.agents/rules/theme.md)
   - Data Layer: [`.agents/rules/data-layer.md`](file:///c:/NuzzAndroid/.agents/rules/data-layer.md)
   - Timer (if applicable): [`.agents/rules/timer.md`](file:///c:/NuzzAndroid/.agents/rules/timer.md)

---

## Step-by-Step Execution Plan

### Step 1: Spec & Requirement Audit
- [ ] Read the target section in `docs/SPEC.md`.
- [ ] List all required UI elements, user interactions, and visual states (e.g. idle, loading, error, empty, active).
- [ ] Identify all data models and action handlers needed.

### Step 2: Define Data Contracts & Repositories
- [ ] Define or verify TypeScript interfaces in `src/data/types.ts`.
- [ ] Create or update repository functions in `src/data/repositories/` (e.g., `getFeed()`, `getStats()`, `getLeaderboard()`, `startSession()`).
- [ ] Provide realistic fixture data in `src/data/mock/*.json`.
- [ ] **The Key Rule**: Ensure screens will call repository functions ONLY — no direct mock imports, no direct network calls.

### Step 3: Component Scaffolding
- [ ] Create reusable design system primitives in `src/components/` (e.g., `Card`, `Button`, `Avatar`, `StreakBadge`, `Ring`, `Heatmap`).
- [ ] Use exclusively theme tokens from `src/theme/` (colors, spacing, typography, radius).
- [ ] Ensure components are pure, style-token-only, and accept data via props.

### Step 4: Screen Implementation in Expo Router
- [ ] Create or update the route in `app/` (e.g., `app/(tabs)/index.tsx`, `focus.tsx`, `rooms.tsx`, `stats.tsx`, `ranks.tsx`, or `app/session/running.tsx`).
- [ ] Connect the screen to repository functions (`src/data/repositories/`) or timer store (`src/store/timer.ts`).
- [ ] Handle loading, error, empty, and active states gracefully.

### Step 6: Verification & Quality Gate
- [ ] Execute the verification workflow in [`.agents/workflows/verify.md`](file:///c:/NuzzAndroid/.agents/workflows/verify.md).
  - Run typecheck (`npm run typecheck` or `npx tsc --noEmit`).
  - Run linter (`npm run lint`).
  - Launch or verify in Android emulator.
  - Take screenshot and save into `docs/screenshots/<screen_name>-<state>.png`.
- [ ] Check off completed items in `docs/SPEC.md`.
