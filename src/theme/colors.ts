// src/theme/colors.ts
// Starting values from .agents/rules/theme.md (sampled from Nuzz web app screenshots)

export const colors = {
  bg: '#0a0a0a',          // app background (sampled from m02)
  surface: '#101010',     // cards (sampled from m04)
  surfaceAlt: '#141416',  // nested cards / segmented track (sampled from m02)
  border: '#28282a',      // subtle card / divider borders (sampled from m04)
  text: '#f2f1f6',        // high-contrast primary text (sampled from 01-home-feed)
  textMuted: '#989899',   // secondary / placeholder text (sampled from 01-home-feed)
  textFaint: '#6e7175',   // low-emphasis / inactive tab labels (sampled from m02)
  accent: '#77c26f',      // primary green accent for actions, rings (sampled from m01)
  accentDarkEdge: '#569851', // 3D tactile bottom bevel on primary buttons (sampled from m01)
  accentMuted: '#232f23', // pill highlight behind active tab (sampled from m02/m04)
  accentText: '#0f150e',  // high-contrast text and spinner on accent button
  streak: '#fab162',      // streak flame orange (sampled from m02)
  coin: '#f4c94b',        // coin gold (sampled from m04)
  avatarOrange: '#ef6c02', // default profile avatar orange (sampled from m08)
  danger: '#ef4444',      // error / abandon red
  badge: '#e2080b',       // notification / alert badge (sampled from 01-home-feed)
  toggleOffTrack: '#3c3c3e', // inactive switch track (sampled from m04)
  toggleOffThumb: '#ededed', // inactive switch thumb (sampled from m04)
  segmentActive: '#101010',  // segmented control active segment (sampled from m04)
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
