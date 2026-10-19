# Theme rules

All styling comes from `src/theme/`. No raw hex values, magic numbers or font names in components.

## Look and feel (from the Nuzz web app)
- Dark-first UI: near-black background, slightly lighter card surfaces with thin subtle borders, large rounded corners (cards ~20-24px radius, pills fully rounded).
- One green accent for primary actions, active nav state, progress rings and positive states.
- Orange for streak flames and the default avatar color. Gold for coins. Red-pink for notification badges.
- Soft, generous spacing; bold, friendly sans-serif headings (the web app uses a DM Sans-like geometric sans). Use `DM Sans` via `@expo-google-fonts/dm-sans`.
- Primary buttons are solid green with dark text and a subtle bottom edge (3D pressed feel).

## Tokens: starting values (APPROXIMATE, verify against screenshots)
`src/theme/colors.ts` must export at least:
```ts
export const colors = {
  bg: '#0a0a0b',          // app background
  surface: '#121214',     // cards (sample from screenshots and adjust)
  surfaceAlt: '#18181b',  // nested cards / inputs
  border: '#26262a',
  text: '#f4f4f5',
  textMuted: '#a1a1aa',
  textFaint: '#71717a',
  accent: '#6fc276',      // green: SAMPLE the real value from docs/screenshots
  accentText: '#0a0a0b',
  streak: '#f97316',
  coin: '#f5b301',
  danger: '#ef4444',
  badge: '#f43f5e',
};
```
TASK for the agent in Phase 1: sample exact colors from docs/screenshots-mobile (primary) and docs/screenshots (view them, estimate pixel colors) and update this file. Record the final values in a comment.

## Also required
- `spacing` (4-pt scale), `radius`, `typography` (sizes, weights), `shadows`.
- A `Gallery` dev screen (`app/dev/gallery.tsx`) that renders every component and token so visual drift is easy to spot.
- Touch targets are at least 44x44. Respect safe areas on every screen.
- Light theme is out of scope for the prototype (keep the token structure ready for it).
