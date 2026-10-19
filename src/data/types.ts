// src/data/types.ts
// Domain types from docs/SPEC.md (Section 4)

export type UserSummary = {
  id: string;
  name: string;
  handle: string;
  color: string;
  streak: number;
  isOnline: boolean;
};

export type Me = UserSummary & {
  bestStreak: number;
  coins: number;
  dailyGoalMin: number;
  focusedTodayMs: number;
  weekDays: boolean[]; // Mon..Sun goal met
};

export type Subject = {
  id: string;
  name: string;
  color: string;
};

export type Session = {
  id: string;
  subjectId: string;
  plannedMs: number;
  focusedMs: number;
  startedAt: number;
  endedAt: number;
  completed: boolean;
  isPrivate: boolean;
};

export type Post = {
  id: string;
  author: UserSummary;
  body: string;
  createdAt: number;
  cherishCount: number;
  commentCount: number;
  viewCount: number;
  cherishedByMe: boolean;
  followingAuthor: boolean;
};

export type LeaderboardPeriod = 'today' | 'week' | 'lifetime';

export type LeaderboardEntry = {
  rank: number;
  user: UserSummary;
  focusedMs: number;
};

export type StatsSummary = {
  weekMs: number;
  weekSessions: number;
  allTimeMs: number;
  allTimeSessions: number;
  completedPct: number;
  coins: number;
  bySubject: { subjectId: string; ms: number }[];
  heatmap: { date: string /* YYYY-MM-DD */; ms: number }[]; // last 18 weeks
};

export type Room = {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  isPrivate: boolean;
};

export type FocusingNow = {
  count: number;
  users: UserSummary[];
};
