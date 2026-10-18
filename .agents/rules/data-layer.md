# Rule: Data Layer & Repository Architecture

## The Key Rule
> **Screens call repository functions ONLY.**  
> **When you get the real API, you rewrite `src/data/repositories/`, NOT the screens.**

Under no circumstances should a screen or UI component:
1. Import mock data directly (e.g. `import { mockFeed } from '@/data/mock/feed.json'`).
2. Make direct HTTP / WebSocket network calls (e.g. `fetch()`, `axios.get()`).
3. Query databases or local storage directly.

---

## 1. Directory Structure

```
src/data/
├── types.ts               # Domain entity types & repository contracts
├── repositories/          # Pure async functions called by screens
│   ├── feed.ts            # getFeed(), likePost(), createPost()
│   ├── stats.ts           # getStats(), getWeeklyHeatmap()
│   ├── leaderboard.ts     # getLeaderboard(period, scope)
│   └── session.ts         # startSession(), completeSession(), abandonSession()
└── mock/                  # Realistic JSON fixtures consumed ONLY by repositories
    ├── feed.json
    ├── stats.json
    ├── leaderboard.json
    └── subjects.json
```

---

## 2. Type Contracts (`src/data/types.ts`)

```typescript
export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  streakDays: number;
  totalHours: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  colorToken: string;
}

export interface Session {
  id: string;
  userId: string;
  subjectId: string;
  durationMinutes: number;
  startTimestamp: number;
  endTimestamp: number;
  status: 'completed' | 'abandoned';
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
  change: number; // rank change (e.g. +2, 0, -1)
}

export interface StatsData {
  todayMinutes: number;
  weekMinutes: number;
  currentStreak: number;
  bestStreak: number;
  dailyHeatmap: { date: string; minutes: number }[];
  subjectBreakdown: { subject: Subject; minutes: number }[];
}
```

---

## 3. Repository Implementation Pattern (`src/data/repositories/`)

Repositories export clean, asynchronous functions. Today they read from `src/data/mock/` fixtures; tomorrow they call your backend.

```typescript
// src/data/repositories/feed.ts
import { Post } from '../types';
import mockFeedData from '../mock/feed.json';

// In-memory state for optimistic mutations during development
let posts: Post[] = [...mockFeedData];

export async function getFeed(page = 1, pageSize = 20): Promise<Post[]> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 200));
  return posts.slice((page - 1) * pageSize, page * pageSize);
}

export async function cheerPost(postId: string): Promise<Post> {
  await new Promise((r) => setTimeout(r, 100));
  const post = posts.find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');
  post.cheersCount += 1;
  post.hasCheered = true;
  return { ...post };
}
```

---

## 4. How Screens Consume Repositories

Screens only call repository functions through simple React state or custom hooks:

```tsx
// app/(tabs)/index.tsx (Home / Feed Screen)
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Post } from '@/data/types';
import { getFeed, cheerPost } from '@/data/repositories/feed';
import { Card } from '@/components/Card';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeed().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleCheer = async (postId: string) => {
    const updated = await cheerPost(postId);
    setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card>
          <Avatar url={item.user.avatarUrl} />
          {/* UI content */}
          <Button title={`Cheer (${item.cheersCount})`} onPress={() => handleCheer(item.id)} />
        </Card>
      )}
    />
  );
}
```

---

## 5. Verification & Zero Mock Import Enforcement

To guarantee no mock imports leak into screen or component code, run:
```powershell
Select-String -Path "app\*.tsx", "app\**\*.tsx", "src\components\*.tsx" -Pattern 'from.*mock' -AllMatches
```
This check must return **0 matches**.
