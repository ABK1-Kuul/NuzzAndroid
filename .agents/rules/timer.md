# Rule: Timestamp-Based Timer Engine

## Section 6: Timestamp-Based Timer Protocol

### 6.0 The Problem with Ticking Counters
Traditional countdown implementations relying on `setInterval(() => setRemaining(s => s - 1), 1000)` are **strictly forbidden**.
1. **Clock Drift**: JavaScript intervals drift by 2–15ms per second under CPU load.
2. **Android Lifecycle & Doze Mode**: When an app is backgrounded or screen turns off, the Android OS throttles or freezes JavaScript execution timers. When resumed, a ticking counter has lost all elapsed time.
3. **Desynchronization**: If the UI renders late or drops frames, time-based analytics, streak records, and room sync become corrupted.

---

### 6.1 Source of Truth Data Structure
The timer state must be modeled exclusively using wall-clock timestamps (epoch milliseconds):

```typescript
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerSessionState {
  id: string;                         // Unique session ID (UUID)
  tagId: string;                       // e.g., 'study', 'coding', 'reading'
  mode: 'pomodoro' | 'deep_work' | 'custom' | 'break';
  targetDurationMs: number;           // e.g., 25 * 60 * 1000 (25 min)
  
  // Critical Timestamps (Epoch ms)
  startTimestamp: number | null;      // When the session was started
  targetEndTimestamp: number | null;   // When the session should finish
  pausedAtTimestamp: number | null;    // Timestamp when paused (if paused)
  accumulatedPausedMs: number;        // Sum of past pause durations
  
  status: TimerStatus;
}
```

---

### 6.2 Deterministic Calculation Rules
Every timer property must be computed dynamically on demand:

```typescript
// 1. Current Remaining Time (ms)
export function getRemainingMs(session: TimerSessionState, now: number = Date.now()): number {
  if (session.status === 'idle') {
    return session.targetDurationMs;
  }
  if (session.status === 'completed') {
    return 0;
  }
  if (session.status === 'paused' && session.pausedAtTimestamp !== null && session.targetEndTimestamp !== null) {
    // While paused, remaining time is frozen relative to the pause moment
    return Math.max(0, session.targetEndTimestamp - session.pausedAtTimestamp);
  }
  if (session.status === 'running' && session.targetEndTimestamp !== null) {
    return Math.max(0, session.targetEndTimestamp - now);
  }
  return session.targetDurationMs;
}

// 2. Elapsed Time (ms)
export function getElapsedMs(session: TimerSessionState, now: number = Date.now()): number {
  const remaining = getRemainingMs(session, now);
  return Math.max(0, session.targetDurationMs - remaining);
}

// 3. Progress Ratio [0.0 - 1.0] for Dial / Ring
export function getProgressRatio(session: TimerSessionState, now: number = Date.now()): number {
  if (session.targetDurationMs <= 0) return 0;
  return Math.min(1.0, getElapsedMs(session, now) / session.targetDurationMs);
}
```

---

### 6.3 State Transitions

1. **Start**:
   - `startTimestamp = Date.now()`
   - `targetEndTimestamp = startTimestamp + targetDurationMs`
   - `accumulatedPausedMs = 0`
   - `status = 'running'`
   - *Action*: Schedule Android native notification/alarm for `targetEndTimestamp`. Persist state to local storage.

2. **Pause**:
   - `pausedAtTimestamp = Date.now()`
   - `status = 'paused'`
   - *Action*: Cancel scheduled OS completion notification. Persist state.

3. **Resume**:
   - `const pauseDuration = Date.now() - pausedAtTimestamp`
   - `accumulatedPausedMs += pauseDuration`
   - `targetEndTimestamp += pauseDuration` // Shift target end time into future
   - `pausedAtTimestamp = null`
   - `status = 'running'`
   - *Action*: Reschedule Android native notification for new `targetEndTimestamp`. Persist state.

4. **Complete**:
   - Triggered when `now >= targetEndTimestamp`.
   - `status = 'completed'`
   - *Action*: Save completed session to local history and sync with social feed.

5. **Reset / Abandon**:
   - Reset state back to `idle`.
   - *Action*: Cancel OS alarms. Clear active timer from storage.

---

### 6.4 Android App Lifecycle Handling
Register an `AppState` listener:
```typescript
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active' && session.status === 'running') {
      const now = Date.now();
      if (session.targetEndTimestamp !== null && now >= session.targetEndTimestamp) {
        handleTimerCompleted();
      } else {
        // Force UI re-render to instantly align countdown digits
        forceUpdate();
      }
    }
  });
  return () => subscription.remove();
}, [session]);
```

---

### 6.5 Display Interval Optimization
- An interval is used **ONLY for triggering UI re-renders** (refreshing the screen at ~1000ms or 60fps for dial animations).
- The interval **must never calculate or mutate state** — it only calls `getRemainingMs(session, Date.now())` for presentation.
- If the interval skips 5 seconds due to device sleep, the next frame automatically renders the correct remaining time without skipping or drifting.
