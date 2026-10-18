# AGENTS.md — Nuzz Android Agent Instructions

## 1. Project Overview & Architecture
Nuzz is a social focus and study timer Android application designed to help users do deep work, track productivity, and share progress with friends through live study rooms, challenges, and feeds.

### Stack
- **Platform**: Android
- **Language / Framework**: TypeScript / React Native 0.88 with Expo SDK 58 & Expo Router
- **Animation**: `react-native-reanimated`
- **State & Data**: Layered Repository pattern with reactive state stores (Zustand / Context)
- **Styling**: Token-driven Design System (Themed stylesheets and styled primitives)
- **Persistence**: Async storage / MMKV for instant timer state hydration and offline capabilities
- **Background Tasks**: Android Native Alarm / Notification triggers for reliable timer completion
- **Verification**: TypeScript compiler (`npx tsc --noEmit`), Expo linter, and Android Debug Bridge (`adb`)

---

## 2. Directory Structure
```
├── AGENTS.md                      # Stack, conventions, rules of engagement, "never do" list
├── .agents/
│   ├── rules/
│   │   ├── theme.md               # Design tokens, zero hardcoded colors
│   │   ├── data-layer.md          # Screens call repository functions only; zero mock imports in UI
│   │   └── timer.md               # Timestamp-based timer rules (Section 6)
│   └── workflows/
│       ├── new-screen.md          # /new-screen workflow from docs/SPEC.md
│       └── verify.md              # /verify workflow (typecheck, lint, run, screenshot)
├── docs/
│   ├── SPEC.md                    # Screen definitions, data shapes, acceptance criteria
│   └── screenshots/               # Visual verification captures named by screen
├── app/                           # Expo Router navigation
│   ├── (tabs)/
│   │   ├── index.tsx              # Home (Feed & Social Activity)
│   │   ├── focus.tsx              # Focus Timer setup
│   │   ├── rooms.tsx              # Live study rooms & battles
│   │   ├── stats.tsx              # Productivity statistics & heatmap
│   │   └── ranks.tsx              # Leaderboard rankings
│   └── session/
│       └── running.tsx            # Fullscreen active timer session
├── src/
│   ├── theme/                     # colors, spacing, radius, typography tokens
│   ├── components/                # Reusable UI primitives (Card, Button, Avatar, StreakBadge, Ring, Heatmap...)
│   ├── data/
│   │   ├── types.ts               # Domain types (User, Subject, Session, Post, LeaderboardEntry)
│   │   ├── repositories/          # getFeed(), getStats(), getLeaderboard(), startSession()
│   │   └── mock/                  # JSON fixtures
│   └── store/
│       └── timer.ts               # Timestamp-based timer state & persistence
```

---

## 3. Core Development Conventions

1. **The Key Architectural Rule**:
   - **Screens call repository functions ONLY.**
   - When real APIs are integrated, **only `src/data/repositories/` is rewritten — never the screens.**
   - Screens must remain completely agnostic to whether data comes from local mock fixtures or a live remote server.
2. **Spec-Driven Implementation**:
   - Always read and consult [`docs/SPEC.md`](file:///c:/NuzzAndroid/docs/SPEC.md) before implementing any feature or screen.
   - Every screen must satisfy its acceptance criteria defined in the spec.
3. **Strict Component Hierarchy**:
   - **Presentational Components**: Pure, deterministic, style-token-only, zero business logic.
   - **Container / Screen Components**: Connect to hooks/repositories, manage screen-level state, delegate actions.
   - **Never import mock data directly into UI components** (see [`.agents/rules/data-layer.md`](file:///c:/NuzzAndroid/.agents/rules/data-layer.md)).
4. **Design System Adherence**:
   - Every color, margin, padding, border radius, and font size must reference a design token from [`.agents/rules/theme.md`](file:///c:/NuzzAndroid/.agents/rules/theme.md).
5. **Time & Timer Precision**:
   - Never implement countdowns using `setInterval(tick, 1000)` with `remainingSeconds--`.
   - All timer calculations must follow the timestamp-based rules defined in [`.agents/rules/timer.md`](file:///c:/NuzzAndroid/.agents/rules/timer.md).
6. **Verification Pipeline**:
   - Before completing any task, execute the verification workflow in [`.agents/workflows/verify.md`](file:///c:/NuzzAndroid/.agents/workflows/verify.md).

---

## 4. The "Never Do" List

| Category | Forbidden Action | Reason / Correct Approach |
| :--- | :--- | :--- |
| **Architecture** | **NEVER** call `fetch`, Axios, or databases directly inside screens or components. | **The Key Rule**: Screens call repository functions only. Keep screens isolated from networking/mocking details. |
| **Data Layer** | **NEVER** import mock data directly into components (`import { mockSessions } from '../mock'`). | Breaks separation of concerns and testability. Route all data through `src/data/repositories/`. |
| **Styling** | **NEVER** use hardcoded color strings (e.g., `#FF5722`, `rgba(0,0,0,0.5)`, `"red"`). | Breaks theme consistency and dark mode. Use `theme.colors.*` tokens from [`.agents/rules/theme.md`](file:///c:/NuzzAndroid/.agents/rules/theme.md). |
| **Styling** | **NEVER** use arbitrary magic numbers for padding, margin, or radius. | Breaks visual rhythm. Use `theme.spacing.*` and `theme.radii.*`. |
| **Timer Engine** | **NEVER** decrement a countdown state variable by 1 every second. | Clocks drift, Android OS suspends background threads, and state corrupts. Use timestamp-based delta calculations (see [`.agents/rules/timer.md`](file:///c:/NuzzAndroid/.agents/rules/timer.md)). |
| **State Management** | **NEVER** store derived state that can be computed deterministically from timestamps. | Causes desynchronization bugs across re-renders and app resume. Calculate derived values dynamically. |
| **Code Quality** | **NEVER** ignore or suppress TypeScript errors (`@ts-ignore`) or linter errors. | Fix the root cause and ensure `tsc --noEmit` exits with 0 before submitting code. |
| **Workflow** | **NEVER** declare a screen completed without visual verification via screenshot. | Always run the verification workflow in [`.agents/workflows/verify.md`](file:///c:/NuzzAndroid/.agents/workflows/verify.md). |
