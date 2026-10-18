# Data layer rules

The prototype has no backend. Mock data must be replaceable by a real API by changing ONLY `src/data/repositories/`.

## Rules
1. Screens and components NEVER import from `src/data/mock/`. They call repository functions (via small hooks like `useFeed()`).
2. Every repository function is `async`, returns typed data from `src/data/types.ts`, and has the signature a real API client would have, e.g.
   `getFeed(scope: 'global' | 'following'): Promise<Post[]>`.
3. Add a fake latency (300-700 ms) in the mock repositories so loading states are exercised.
4. Mock repositories can occasionally fail when a dev flag `SIMULATE_ERRORS` is on, to test error UI.
5. Mutations (start session, cherish a post, follow) update an in-memory store so the UI reacts, but nothing persists except the timer.
6. Mock people are fictional. Avatars are initials on colored circles or generated shapes. No real photos.
7. Dates in fixtures are relative to "now" (generated at runtime) so the app never looks stale.
8. Keep one `src/data/repositories/index.ts` that exports the active implementation, so a future `api/` implementation can replace `mock/` with one line.

## Repositories needed for the prototype
`auth` (current user), `feed`, `stats`, `leaderboard`, `presence` (focusing now), `subjects`, `sessions`, `rooms`, `plan`.
