// Stats Repository: screens call this function ONLY
import { StatsData } from '../types';
import mockStatsData from '../mock/stats.json';

export async function getStats(): Promise<StatsData> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockStatsData as StatsData;
}
