// Session & Subject Repository: screens call these functions ONLY
import { Session, Subject } from '../types';
import mockSubjectsData from '../mock/subjects.json';

let activeSession: Session | null = null;

export async function getSubjects(): Promise<Subject[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockSubjectsData as Subject[];
}

export async function startSession(subjectId: string, durationMinutes: number): Promise<Session> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const startTimestamp = Date.now();
  const targetEndTimestamp = startTimestamp + durationMinutes * 60 * 1000;

  activeSession = {
    id: `session_${Date.now()}`,
    userId: 'u_current',
    subjectId,
    durationMinutes,
    startTimestamp,
    targetEndTimestamp,
    pausedAtTimestamp: null,
    accumulatedPausedMs: 0,
    status: 'running',
  };

  return { ...activeSession };
}

export async function completeSession(sessionId: string, reflection?: string): Promise<Session> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  if (!activeSession || activeSession.id !== sessionId) {
    throw new Error('No active session found with this ID');
  }

  activeSession = {
    ...activeSession,
    status: 'completed',
    completedAt: Date.now(),
    reflection,
  };

  const completed = { ...activeSession };
  activeSession = null;
  return completed;
}

export async function abandonSession(sessionId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (activeSession?.id === sessionId) {
    activeSession = null;
  }
}

export async function getActiveSession(): Promise<Session | null> {
  return activeSession ? { ...activeSession } : null;
}
