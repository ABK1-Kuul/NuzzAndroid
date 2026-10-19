# SPEC: Nuzz Mobile Prototype

## 1. Product summary
Nuzz is a social focus-timer app: users run timed focus sessions on a subject, build daily streaks, earn coins, see stats, climb leaderboards, and share progress in a feed. This prototype recreates the core experience as a mobile app on mock data to pitch to the Nuzz creator.

Reference screenshots:
- **PRIMARY (mobile, authoritative):** `docs/screenshots-mobile/m01..m08`. These are the real Nuzz mobile layout (the PWA on a phone). Match them closely.
- Secondary (desktop web): `docs/screenshots/01..10`. Use only for screens/features that have no mobile screenshot (Tasks, Plan, Buddies, Notifications).
If the two disagree, the mobile screenshots win. See section 9 for mobile-specific details.

## 2. Scope
**In scope (6 tabs + shell):** Home (header, stories row, feed), Focus (setup + running + finished, with Focus/Tasks/Plan segmented control where Tasks and Plan are simple placeholders), Rooms (browse shell), Stats, Ranks (leaderboard with podium), Profile, first-launch welcome sheet, bottom-tab navigation.
**Visual-only (no real logic):** stories row (static avatars with streak badges, tap opens a simple placeholder), timelapse-style feed posts (generated placeholder image, "Timelapse" tag), notification bell (opens placeholder).
**Out of scope (list as "Phase 2" in the pitch):** live video rooms, battles, real moments creation, buddies, tasks CRUD, plan/calendar editing, notifications center, real auth, payments (Nuzz Pro), desktop-only features (app blocking, real timelapse recording, app-usage tracking), light theme.

## 3. Navigation
Bottom tab bar with **6 tabs**: Home, Focus, Rooms, Stats, Ranks, Profile. The active tab shows a filled icon and a pill-shaped dark-green highlight behind icon + label; inactive tabs are muted outline icons with labels.
Persistent top header on tab screens: left = streak pill (orange flame + count), center = Nuzz logo wordmark, right = context action (share icon on Rooms/Focus/Ranks/Stats; notification bell on Home).
Starting a session pushes the Running screen full-screen (tab bar hidden).

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

## 9. Mobile reference details (from docs/screenshots-mobile)

**m01 Welcome sheet (first launch only):** bottom sheet over a blurred app. Eyebrow "Welcome to Nuzz", headline "A focus timer you use with friends.", logo mascot (green rounded shape with two dark pause bars). Three rows with icon: Time your focus / Build a daily streak / Focus with friends. A note card: "This feed is people sharing focus sessions they just finished: proof of work, not scrolling." Buttons: primary green "Start focusing, it's free ->", outline "How it works", text "Just look around". Close X top-right. Show once, persist dismissal.

**m02/m03 Home:** header (streak pill, logo, bell with ring outline). Stories row: first tile "Add moment" (dashed green ring, big "+" badge), then circles with gradient ring and a small orange flame badge with the streak number. Below: Global/Following segmented control (active segment is a darker pill), "TODAY" section label, then post cards. Post card: avatar, name + orange flame and "12d", @handle and time-ago, white pill "Follow" button; a large rounded media area with a "Timelapse" tag top-right and a timer overlay at the bottom ("00:25:5x", subject, "26m today") with a thin progress line; below it a big duration ("2h") and a green chip "Hit 2h goal". A floating green "Post" button (pen icon) sits bottom-right above the tab bar. The dismissible "New here? Nuzz is a focus timer" explainer card (m02) can appear between stories and the segmented control for new users.
Mock media: generate placeholder visuals (gradients/abstract shapes). Never use real people's photos.

**m04 Focus setup:** top segmented control Focus / Tasks / Plan (Tasks and Plan show a simple "Coming in phase 2" empty state). A large rounded card with the wheel picker: hours column (left) and minutes column (right), selected row highlighted in a lighter pill, numbers fading above and below. Under it a centered line: clock icon "Ends 12:47" and gold coin "+1". Then a grouped list card: Subject (purple icon, current subject, chevron), Private session (toggle; helper text "Shows on the feed when you finish"), Pomodoro breaks (red icon, toggle; helper text "Too short for breaks" when duration is short, otherwise describe the cycle). A big green "Start focus" button must be reachable (list scrolls above the tab bar).

**m05 Rooms:** header share icon on the right. Two large action cards side by side: "New room / Host a focus session" (green plus icon) and "Join with code / Got an invite?" (indigo lock-key icon). Browse / My Rooms segmented control. Empty state card: icon, "No open rooms right now", "Start one: whoever drops in focuses with you.", green pill button "+ Create a room". With mock data also show a populated list.

**m06 Stats:** "Focus today" label in green, huge "0m" (use real value from mock), thin progress bar, "2h to your 2h goal", streak (red flame) and total focused (yellow bolt) metrics, "AT A GLANCE" label, 2x2 cards (This week with a mini 7-bar graphic, All time with a line graphic, Completed with a ring, Coins with a coin icon and "Save a streak" hint). Below the fold: subject breakdown and the heatmap.

**m07 Ranks:** Today / This week / Lifetime segmented control, "90 people" label. "TOP PERFORMERS · TODAY" card with a podium: #1 centered and larger with a crown, #2 left and #3 right, each with avatar, rank badge (gold/silver/bronze), name and time. Below, a list card with rank number, avatar, name, "3h 20m today" subtitle and orange streak "1d" on the right.

**m08 Profile:** top-right share and settings icons. Large avatar (initial on orange circle), @handle, display name, bio, location and "Joined Oct 2026". Stats row: following, followers, streak, focused hours. Buttons: "Edit profile" (wide, dark) and a share icon button. "No achievements yet >" row. Tab icons row below: Stats (active, underlined), Activity, Followers, Following. "LAST 26 WEEKS" heatmap with month labels (Jul, Aug, Sep, Oct). Implement Stats tab fully; the other three tabs can be simple lists from mock data.

**Common UI details:** cards are dark gray with generous radius; segmented controls are pill-shaped with a darker active segment; primary buttons are green with dark text; the streak pill in the header is dark with an orange flame. Respect Android and iOS safe areas (status bar, gesture bar).

## 10. Why native (include in the creator pitch)
The PWA already works, so the pitch must show what native adds: reliable background timer plus end-of-session notifications, lock-screen/Live Activity timer, home-screen widgets (streak, today's focus), haptics, camera access for timelapse and moments, App Store and Play Store presence and discoverability, push notifications that actually deliver. The prototype should demonstrate at least: the timer surviving backgrounding, the end-of-session notification, and haptics on the wheel picker.
