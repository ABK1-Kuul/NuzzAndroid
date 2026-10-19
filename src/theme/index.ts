// src/theme/index.ts
import { colors, Colors, ColorKey, avatarPalette } from './colors';
import { spacing, Spacing } from './spacing';
import { radius, Radius } from './radius';
import { typography, Typography } from './typography';
import { shadows, Shadows } from './shadows';

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  radius: Radius;
  typography: Typography;
  shadows: Shadows;
}

export const theme: Theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
};

export function useTheme(): Theme {
  return theme;
}

export { colors, Colors, ColorKey, avatarPalette, spacing, radius, typography, shadows };
