// src/theme/colors.ts
// Starting values from .agents/rules/theme.md (sampled from Nuzz web app screenshots)

export const colors = {
  bg: '#0a0a0b',          // app background
  surface: '#121214',     // cards
  surfaceAlt: '#18181b',  // nested cards / inputs
  border: '#26262a',      // subtle card / divider borders
  text: '#f4f4f5',        // high-contrast primary text
  textMuted: '#a1a1aa',   // secondary / placeholder text
  textFaint: '#71717a',   // low-emphasis / timestamps
  accent: '#6fc276',      // primary green accent for actions, rings, active tab
  accentText: '#0a0a0b',  // text on accent button
  streak: '#f97316',      // streak flame orange
  coin: '#f5b301',        // coin gold
  danger: '#ef4444',      // error / abandon red
  badge: '#f43f5e',       // notification / alert badge
} as const;

export const avatarPalette = [
  '#f97316',
  '#8b5cf6',
  '#3b82f6',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
] as const;

export type Colors = typeof colors;
export type ColorKey = keyof Colors;
