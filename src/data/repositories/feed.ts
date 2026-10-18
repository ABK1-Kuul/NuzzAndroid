// Feed Repository: screens call this function ONLY
import { Post } from '../types';
import mockFeedData from '../mock/feed.json';

let feedState: Post[] = [...(mockFeedData as Post[])];

export async function getFeed(page = 1, pageSize = 20): Promise<Post[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 250));
  const start = (page - 1) * pageSize;
  return feedState.slice(start, start + pageSize);
}

export async function cheerPost(postId: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const post = feedState.find((p) => p.id === postId);
  if (!post) {
    throw new Error(`Post ${postId} not found`);
  }

  post.cheersCount += post.hasCheered ? -1 : 1;
  post.hasCheered = !post.hasCheered;

  return { ...post };
}
