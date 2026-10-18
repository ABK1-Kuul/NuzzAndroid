import { darkColors, lightColors, ColorTheme } from './colors';
import { spacing, Spacing } from './spacing';
import { radius, Radius } from './radius';
import { typography, Typography } from './typography';
import { useColorScheme } from 'react-native';

export interface Theme {
  colors: ColorTheme;
  spacing: Spacing;
  radius: Radius;
  typography: Typography;
  isDark: boolean;
}

export const defaultTheme: Theme = {
  colors: darkColors,
  spacing,
  radius,
  typography,
  isDark: true,
};

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== 'light';

  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    typography,
    isDark,
  };
}

export { darkColors, lightColors, spacing, radius, typography };
