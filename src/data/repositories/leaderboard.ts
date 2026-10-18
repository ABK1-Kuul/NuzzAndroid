// Leaderboard Repository: screens call this function ONLY
import { LeaderboardEntry } from '../types';
import mockLeaderboardData from '../mock/leaderboard.json';

export type LeaderboardPeriod = 'daily' | 'weekly' | 'allTime';

export async function getLeaderboard(period: LeaderboardPeriod = 'weekly'): Promise<LeaderboardEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const multiplier = period === 'daily' ? 0.2 : period === 'weekly' ? 1.0 : 4.5;

  return (mockLeaderboardData as LeaderboardEntry[]).map((entry) => ({
    ...entry,
    focusMinutes: Math.round(entry.focusMinutes * multiplier),
  }));
}
