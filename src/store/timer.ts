// src/store/timer.ts
// Section 6: Timestamp-Based Timer Engine
// Adheres strictly to .agents/rules/timer.md - Zero tick-decrement counters

import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerSessionState {
  subjectId: string;
  durationMinutes: number;
  targetDurationMs: number;
  startTimestamp: number | null;
  targetEndTimestamp: number | null;
  pausedAtTimestamp: number | null;
  accumulatedPausedMs: number;
  status: TimerStatus;
}

const initialTimerState: TimerSessionState = {
  subjectId: 'sub_coding',
  durationMinutes: 25,
  targetDurationMs: 25 * 60 * 1000,
  startTimestamp: null,
  targetEndTimestamp: null,
  pausedAtTimestamp: null,
  accumulatedPausedMs: 0,
  status: 'idle',
};

let currentSession: TimerSessionState = { ...initialTimerState };
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getTimerState(): TimerSessionState {
  return currentSession;
}

export function startTimer(subjectId: string, durationMinutes: number) {
  const now = Date.now();
  const targetDurationMs = durationMinutes * 60 * 1000;

  currentSession = {
    subjectId,
    durationMinutes,
    targetDurationMs,
    startTimestamp: now,
    targetEndTimestamp: now + targetDurationMs,
    pausedAtTimestamp: null,
    accumulatedPausedMs: 0,
    status: 'running',
  };
  notify();
}

export function pauseTimer() {
  if (currentSession.status !== 'running') return;

  currentSession = {
    ...currentSession,
    pausedAtTimestamp: Date.now(),
    status: 'paused',
  };
  notify();
}

export function resumeTimer() {
  if (currentSession.status !== 'paused' || !currentSession.pausedAtTimestamp || !currentSession.targetEndTimestamp) {
    return;
  }

  const now = Date.now();
  const pauseDuration = now - currentSession.pausedAtTimestamp;

  currentSession = {
    ...currentSession,
    pausedAtTimestamp: null,
    accumulatedPausedMs: currentSession.accumulatedPausedMs + pauseDuration,
    targetEndTimestamp: currentSession.targetEndTimestamp + pauseDuration,
    status: 'running',
  };
  notify();
}

export function completeTimer() {
  currentSession = {
    ...currentSession,
    status: 'completed',
  };
  notify();
}

export function resetTimer() {
  currentSession = { ...initialTimerState };
  notify();
}

// Deterministic Calculations
export function getRemainingMs(now: number = Date.now()): number {
  const session = currentSession;
  if (session.status === 'idle') return session.targetDurationMs;
  if (session.status === 'completed') return 0;
  if (session.status === 'paused' && session.pausedAtTimestamp && session.targetEndTimestamp) {
    return Math.max(0, session.targetEndTimestamp - session.pausedAtTimestamp);
  }
  if (session.status === 'running' && session.targetEndTimestamp) {
    return Math.max(0, session.targetEndTimestamp - now);
  }
  return session.targetDurationMs;
}

export function getElapsedMs(now: number = Date.now()): number {
  return Math.max(0, currentSession.targetDurationMs - getRemainingMs(now));
}

export function getProgressRatio(now: number = Date.now()): number {
  if (currentSession.targetDurationMs <= 0) return 0;
  return Math.min(1.0, getElapsedMs(now) / currentSession.targetDurationMs);
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// React Hook for screens and components
export function useTimer() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleChange = () => setTick((t) => t + 1);
    listeners.add(handleChange);

    // 1-second interval ONLY for UI refresh ticks (never for state mutation)
    const interval = setInterval(() => {
      if (currentSession.status === 'running') {
        const remaining = getRemainingMs();
        if (remaining <= 0) {
          completeTimer();
        } else {
          setTick((t) => t + 1);
        }
      }
    }, 1000);

    // Android AppState listener for background / Doze mode return
    const appStateSub = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active' && currentSession.status === 'running') {
        if (getRemainingMs() <= 0) {
          completeTimer();
        } else {
          setTick((t) => t + 1);
        }
      }
    });

    return () => {
      listeners.delete(handleChange);
      clearInterval(interval);
      appStateSub.remove();
    };
  }, []);

  return {
    session: currentSession,
    remainingMs: getRemainingMs(),
    elapsedMs: getElapsedMs(),
    progress: getProgressRatio(),
    formattedTime: formatTime(getRemainingMs()),
    startTimer,
    pauseTimer,
    resumeTimer,
    completeTimer,
    resetTimer,
  };
}
