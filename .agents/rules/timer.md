# Timer rules (critical)

Phones suspend apps. A tick-counting timer WILL drift or stop. Compute time from timestamps.

## State shape (Zustand store, persisted to AsyncStorage)
```ts
type TimerState = {
  status: 'idle' | 'running' | 'paused';
  sessionId: string | null;
  subjectId: string | null;
  plannedMs: number;
  startedAt: number | null;     // epoch ms when started
  pausedAt: number | null;      // epoch ms when current pause began
  totalPausedMs: number;        // sum of completed pauses
  options: { pomodoro: boolean; isPrivate: boolean };
};
```

## Derived values (pure functions in `src/store/timerMath.ts`, unit-tested)
```ts
elapsedMs(s, now) = (s.status === 'paused' ? s.pausedAt! : now) - s.startedAt! - s.totalPausedMs
remainingMs(s, now) = Math.max(0, s.plannedMs - elapsedMs(s, now))
isComplete(s, now) = remainingMs(s, now) === 0
coinsEarned(focusedMs) = Math.floor(focusedMs / (15 * 60 * 1000))   // 1 coin per 15 focused minutes
```

## Behaviour
- UI re-renders with a 250-1000 ms interval that only triggers a re-render. The interval is NOT the source of truth.
- Pause sets `pausedAt`. Resume adds `now - pausedAt` to `totalPausedMs` and clears `pausedAt`.
- On app start, rehydrate persisted state. If a running session already passed its end time, show the completion screen.
- On `AppState` change to `active`, recompute immediately.
- On start/resume, schedule a local notification for the end time (`expo-notifications`). Cancel and reschedule on pause/resume/end.
- Ending early records `focusedMs = elapsedMs`; `completed = false`. Reaching zero records `completed = true`.
- Only one active session at a time.

## Tests required (`npm test`)
Elapsed time with no pauses; with one pause; with several pauses; while paused; completion; coin rounding at 14:59 vs 15:00; session that expired while the app was closed.

## Pomodoro (prototype scope)
When enabled: 25 min focus / 5 min break cycle, shown as a phase label on the running screen. Break time does NOT count as focus time or coins.
