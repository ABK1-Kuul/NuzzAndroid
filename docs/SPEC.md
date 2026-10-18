# Nuzz Android — Product Specification (SPEC.md)

## 1. Product Overview
**Nuzz** is a social focus and study timer Android app built with Expo Router and React Native. It combines timestamp-accurate focus sessions with peer motivation, live study rooms, leaderboards, productivity heatmaps, and shared feeds.

---

## 2. Core Architectural Pillars
1. **The Key Rule**: **Screens call repository functions ONLY.** When connecting to the real backend, only `src/data/repositories/` is modified; screens remain untouched.
2. **Zero Hardcoded Colors**: All colors, typography, spacing, and border radii strictly reference tokens from `src/theme/`.
3. **Timestamp-Based Timer Engine**: All active session times derive from wall-clock timestamps (`targetEndTimestamp - now()`) stored in `src/store/timer.ts`, adhering to Section 6 of [`.agents/rules/timer.md`](file:///c:/NuzzAndroid/.agents/rules/timer.md).

---

## 3. Data Shapes & Contracts (`src/data/types.ts`)

```typescript
export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  streakDays: number;
  totalHours: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  colorToken: string;
}

export interface Session {
  id: string;
  userId: string;
  subjectId: string;
  durationMinutes: number;
  startTimestamp: number;
  endTimestamp: number;
  status: 'completed' | 'abandoned';
}

export interface Post {
  id: string;
  user: User;
  subject: Subject;
  durationMinutes: number;
  completedAt: number;
  reflection?: string;
  cheersCount: number;
  hasCheered: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  focusMinutes: number;
  change: number; // e.g., +2, 0, -1
}

export interface StatsData {
  todayMinutes: number;
  weekMinutes: number;
  currentStreak: number;
  bestStreak: number;
  dailyHeatmap: { date: string; minutes: number }[];
  subjectBreakdown: { subject: Subject; minutes: number }[];
}
```

---

## 4. Repository Function Contracts (`src/data/repositories/`)

- **Feed Repository (`src/data/repositories/feed.ts`)**:
  - `getFeed(page?: number): Promise<Post[]>`
  - `cheerPost(postId: string): Promise<Post>`
- **Stats Repository (`src/data/repositories/stats.ts`)**:
  - `getStats(): Promise<StatsData>`
- **Leaderboard Repository (`src/data/repositories/leaderboard.ts`)**:
  - `getLeaderboard(period: 'daily' | 'weekly' | 'allTime'): Promise<LeaderboardEntry[]>`
- **Session Repository (`src/data/repositories/session.ts`)**:
  - `startSession(subjectId: string, durationMinutes: number): Promise<Session>`
  - `completeSession(sessionId: string, reflection?: string): Promise<Session>`
  - `abandonSession(sessionId: string): Promise<void>`

---

## 5. Screen Specifications & Acceptance Criteria

### Tab 1: Home (`app/(tabs)/index.tsx`)
Friend focus feed and active streak highlights.
- [ ] Calls `getFeed()` from repository on mount and pull-to-refresh.
- [ ] Displays friend session cards with `Avatar`, `StreakBadge`, and `Card` components.
- [ ] Optimistically updates cheer count when user taps cheer button.
- [ ] No direct mock data imports.

### Tab 2: Focus (`app/(tabs)/focus.tsx`)
Timer setup and session launcher.
- [ ] Displays duration selector (Pomodoro 25m, Deep Work 50m, Custom).
- [ ] Displays subject selector pills (e.g. Coding, Math, Reading) loaded from repository.
- [ ] Start button calls `startSession()` and navigates to `session/running.tsx`.
- [ ] Renders circular progress preview using `Ring` component.

### Tab 3: Rooms (`app/(tabs)/rooms.tsx`)
Live study rooms and friend focus battles.
- [ ] Lists active public and friend rooms.
- [ ] Shows participant avatars and live progress rings.
- [ ] Allows joining or creating a study room.

### Tab 4: Stats (`app/(tabs)/stats.tsx`)
Productivity statistics and consistency visualization.
- [ ] Calls `getStats()` from repository.
- [ ] Displays GitHub-style contribution `Heatmap` showing daily focus minutes.
- [ ] Displays total hours, current streak, and subject breakdown bar chart.

### Tab 5: Ranks (`app/(tabs)/ranks.tsx`)
Competitive study leaderboards.
- [ ] Calls `getLeaderboard(period)` with Daily / Weekly / All-Time tabs.
- [ ] Renders top 3 podium followed by ranked list of users.
- [ ] Highlights current user's position and rank change indicator.

### Session Screen: Running Session (`app/session/running.tsx`)
Fullscreen active focus countdown and ambient workspace.
- [ ] Connected to `src/store/timer.ts` (timestamp-based countdown).
- [ ] Hero countdown display with monospace digits (`MM:SS`).
- [ ] Fullscreen animated `Ring` progress dial.
- [ ] Pause / Resume / Abandon controls.
- [ ] AppState listener triggers completion if backgrounded past `targetEndTimestamp`.
