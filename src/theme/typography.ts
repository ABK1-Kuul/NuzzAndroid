// src/theme/typography.ts
// Typography tokens using DM Sans geometric sans-serif

export const fontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  bold: 'DMSans_700Bold',
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  timer: 56,
} as const;

export const lineHeight = {
  xs: 14,
  sm: 18,
  base: 22,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  timer: 64,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

export const typography = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
};

export type Typography = typeof typography;
