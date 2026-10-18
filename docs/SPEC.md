# SPEC: Nuzz Mobile Prototype

## 1. Product summary
Nuzz is a social focus-timer app: users run timed focus sessions on a subject, build daily streaks, earn coins, see stats, climb leaderboards, and share progress in a feed. This prototype recreates the core experience as a mobile app on mock data to pitch to the Nuzz creator.

Reference screenshots (web app): `docs/screenshots/01..10`. Adapt layouts for a phone; keep the brand look.

## 2. Scope
**In scope (6 screens + shell):** Home, Focus (setup + running + finished), Stats, Ranks (leaderboard), Rooms (browse shell), Profile/More (links to secondary screens as simple placeholders), bottom-tab navigation.
**Out of scope (list as "Phase 2" in the pitch):** live video rooms, battles, moments/stories, buddies, tasks CRUD, plan/calendar, notifications center, real auth, payments (Nuzz Pro), desktop-only features (app blocking, timelapse, app-usage tracking), light theme.

## 3. Navigation
Bottom tabs: **Home, Focus, Rooms, Stats, Ranks**. Profile avatar top-right opens a Profile/More screen (placeholder rows for Tasks, Plan, Buddies, Notifications marked "Coming in phase 2").
Focus tab: a prominent center action; starting a session pushes the Running screen full-screen (tabs hidden).

## 4. Data types (`src/data/types.ts`)
```ts
export type UserSummary = { id: string; name: string; handle: string; color: string; streak: number; isOnline: boolean };
export type Me = UserSummary & { bestStreak: number; coins: number; dailyGoalMin: number; focusedTodayMs: number; weekDays: boolean[] /* Mon..Sun goal met */ };
export type Subject = { id: string; name: string; color: string };
export type Session = { id: string; subjectId: string; plannedMs: number; focusedMs: number; startedAt: number; endedAt: number; completed: boolean; isPrivate: boolean };
export type Post = { id: string; author: UserSummary; body: string; createdAt: number; cherishCount: number; commentCount: number; viewCount: number; cherishedByMe: boolean; followingAuthor: boolean };
export type LeaderboardPeriod = 'today' | 'week' | 'lifetime';
export type LeaderboardEntry = { rank: number; user: UserSummary; focusedMs: number };
export type StatsSummary = {
  weekMs: number; weekSessions: number; allTimeMs: number; allTimeSessions: number;
  completedPct: number; coins: number;
  bySubject: { subjectId: string; ms: number }[];
  heatmap: { date: string /* YYYY-MM-DD */; ms: number }[]; // last 18 weeks
};
export type Room = { id: string; name: string; subject: string; memberCount: number; isPrivate: boolean };
export type FocusingNow = { count: number; users: UserSummary[] };
```

## 5. Screens and acceptance criteria

### 5.1 Home (ref: 01-home-feed.png)
- Top: greeting/app logo, avatar button, notification bell with badge (taps to placeholder).
- **Today card**: streak count + flame, coins pill, "today X / goal Y" progress bar, Mon-Sun day dots (today highlighted, met days filled).
- **Plan your day** card with "Plan today" button (placeholder action).
- **Focusing now** card: count + horizontal avatar strip with green presence dots.
- Feed: Global / Following segmented control; post cards with avatar, name, @handle, time-ago, streak flame, Follow button, body text, cherish button with count (toggle, haptic), comment count, views.
- Pull to refresh. Skeleton on load. Empty state for Following with no posts.
- AC: scrolls smoothly with 20+ posts; cherish toggles optimistically; all colors from tokens.

### 5.2 Focus: setup (ref: 09-start-session.png)
- Hours + minutes wheel picker (native-feeling, snaps, haptic tick). Default 25 min. Min 5 min, max 8 h.
- Subject selector (bottom sheet) with colored dot; "New subject" inline creation (name + color).
- Toggles: Pomodoro breaks, Private session. (No desktop-only toggles.)
- Live preview text: "Ends ~HH:MM" and "+N coin(s), next at 15m".
- Big green "Start focus" button.
- AC: preview updates as the picker changes; start pushes Running screen.

### 5.3 Focus: running and finished
- Large progress ring (react-native-svg) with remaining time (mm:ss or h:mm:ss), subject chip, "ends at" text.
- Pause/Resume and End buttons (End asks to confirm). Pomodoro phase label if enabled.
- Keep screen awake while running (`expo-keep-awake`).
- Finished screen: focused time, coins earned, streak status, "Share to feed" (adds a mock post) and "Done".
- AC: follows `.agents/rules/timer.md` exactly, including backgrounding, kill/reopen, and the local notification.

### 5.4 Stats (ref: 06-stats.png)
- "Focus today" big number with progress toward goal, streak and best, total focused hours.
- 2x2 "At a glance" cards: This week, All time, Completed %, Coins.
- "What you focus on": subject breakdown (horizontal bars or donut, using subject colors).
- 18-week heatmap (SVG), 4 intensity levels using accent greens, horizontally scrollable if needed.
- AC: fixtures give a realistic non-empty state; also implement the zero-data empty state shown in the reference.

### 5.5 Ranks (ref: 07-leaderboard.png)
- Segmented control: Today / This week / Lifetime; "N people" label.
- Top 3 with medal styling (gold/silver/bronze) and the leader crown/tag; rows 4+ with rank, avatar, name, streak flame, focused time.
- Current user's row pinned/highlighted when off-screen.
- AC: switching period re-queries with a loading state; list virtualized.

### 5.6 Rooms (ref: 04-rooms.png)
- Browse / My rooms tabs, Join with code, New room buttons.
- Mock list of 4-6 rooms (name, subject, member count, lock icon for private); empty state per reference.
- Tapping a room opens a simple "Room preview" screen with members and a "Join" button that is marked "Live video coming in phase 2".
- AC: no real video or realtime.

### 5.7 Profile/More
- Avatar, name, handle, streak, coins, daily goal.
- Rows linking to placeholders: Tasks, Plan, Study buddies, Notifications ("Coming in phase 2"). A "Download desktop app" row is not needed.

## 6. Mock data requirements
- 25-30 fictional users, 3-5 subjects, 20 feed posts (varied length, some with streaks), 6 rooms, leaderboard of 30 people, 18 weeks of heatmap data.
- Current user: "Alex", streak 5, 120 coins, goal 120 min, today 45 min.

## 7. Build phases (one commit each)
0. Foundation: scaffold, theme, fonts, tab navigation, base components, gallery screen
1. Design system: sample colors from screenshots, finalize tokens and components
2. Focus: setup, running, finished, timer store, tests, notification
3. Stats
4. Home
5. Ranks and Rooms
6. Polish: transitions, skeletons, empty states, icon, splash; EAS preview build; demo recording

## 8. Quality bar
- Runs on a real Android and iOS device without red screens.
- 60 fps scrolling on feed and leaderboard.
- Typecheck, lint and tests clean.
- No screen contains a hardcoded color, font size or fixture.
