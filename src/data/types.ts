// Domain Entities and Repository Types for Nuzz Android

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  streakDays: number;
  totalHours: number;
  isCurrentUser?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string; // Token key, e.g. 'brandPrimary' | 'brandSecondary' | 'brandAccent' | 'statusSuccess'
}

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'abandoned';

export interface Session {
  id: string;
  userId: string;
  subjectId: string;
  durationMinutes: number;
  startTimestamp: number | null;
  targetEndTimestamp: number | null;
  pausedAtTimestamp: number | null;
  accumulatedPausedMs: number;
  status: SessionStatus;
  completedAt?: number;
  reflection?: string;
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

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  minutes: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface StatsData {
  todayMinutes: number;
  weekMinutes: number;
  totalHours: number;
  currentStreak: number;
  bestStreak: number;
  dailyHeatmap: HeatmapDay[];
  subjectBreakdown: {
    subject: Subject;
    minutes: number;
    percentage: number;
  }[];
}

export interface RoomParticipant {
  userId: string;
  name: string;
  avatarUrl: string;
  status: 'focusing' | 'break';
  progress: number; // 0.0 to 1.0
  elapsedMinutes: number;
}

export interface StudyRoom {
  id: string;
  title: string;
  subject: Subject;
  durationMinutes: number;
  startTimestamp: number;
  participants: RoomParticipant[];
  isPrivate?: boolean;
}
