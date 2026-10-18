# Rule: Theme & Design Tokens

## Golden Rule
**Zero hardcoded colors or ad-hoc style values in application code.**
No component, screen, or style definition may contain raw hex values (`#FFFFFF`), rgb/rgba strings, or browser color names (`"red"`, `"blue"`). All visual styling must use tokens imported from the centralized theme system.

---

## 1. Design Token Specifications

### 1.1 Color Tokens
Colors are defined semantically to support seamless dark and light modes.

```typescript
export interface ColorTokens {
  // Brand & Accents
  brandPrimary: string;       // Nuzz energetic coral / orange (#FF5A36)
  brandSecondary: string;     // Warm amber (#FFAA00)
  brandAccent: string;        // Vibrant violet (#7C3AED)
  
  // Timer States
  timerFocus: string;         // Active focus ring color (#FF5A36)
  timerBreak: string;         // Rest / break interval color (#10B981)
  timerLongBreak: string;     // Long break color (#06B6D4)
  timerTrackBg: string;       // Unfilled ring background track
  
  // Backgrounds & Surfaces
  bgPrimary: string;          // Screen background
  bgSecondary: string;        // Secondary screen background
  surfacePrimary: string;     // Card, container, modal surface
  surfaceSecondary: string;   // Nested card, pill, tag background
  surfaceElevated: string;    // Floating sheets, bottom nav, dropdowns
  
  // Text & Content
  textPrimary: string;        // High-emphasis text, headlines, timer digits
  textSecondary: string;      // Medium-emphasis text, labels, subtitles
  textMuted: string;          // Low-emphasis text, placeholders, timestamps
  textInverse: string;        // Text on inverted/brand backgrounds
  
  // Borders & Dividers
  borderSubtle: string;       // Hairline borders, dividers
  borderStrong: string;       // Active inputs, focused card borders
  
  // Status & Badges
  statusSuccess: string;      // Completed session, streak milestone (#10B981)
  statusWarning: string;      // Timer near finish, alert (#F59E0B)
  statusError: string;        // Abandoned session, critical error (#EF4444)
  statusInfo: string;         // Info badges, tips (#3B82F6)
  
  // Social & Gamification
  streakFire: string;         // Streak badge fire glow (#FF3B30)
  levelPill: string;          // User level indicator (#8B5CF6)
}
```

### 1.2 Spacing Tokens
Based on an 8-point grid (with 4-point micro-adjustments):
```typescript
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;
```

### 1.3 Typography Tokens
```typescript
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    mono: 'JetBrainsMono-Bold', // For timer digits & countdown numbers
  },
  fontSize: {
    caption: 11,
    bodySm: 13,
    body: 15,
    subtitle: 17,
    title: 20,
    heading: 26,
    display: 34,
    timerDigits: 56,          // Hero countdown display
  },
  lineHeight: {
    caption: 14,
    bodySm: 18,
    body: 22,
    subtitle: 24,
    title: 28,
    heading: 32,
    display: 40,
    timerDigits: 64,
  },
} as const;
```

### 1.4 Radii & Shape Tokens
```typescript
export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999, // Pill buttons, circular avatars, round timer buttons
} as const;
```

---

## 2. Usage Conventions

### 2.1 Using Tokens in Components
Always use the theme hook or theme object:
```tsx
// ✅ Correct
import { useTheme } from '../theme';
import { StyleSheet, Text, View } from 'react-native';

export const StudyCard = ({ title, duration }: StudyCardProps) => {
  const { colors, spacing, radii, typography } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surfacePrimary, borderRadius: radii.md, padding: spacing.lg }]}>
      <Text style={[styles.title, { color: colors.textPrimary, fontSize: typography.fontSize.title }]}>
        {title}
      </Text>
    </View>
  );
};
```

### 2.2 What NOT to Do
```tsx
// ❌ FORBIDDEN: Hardcoded hex colors
backgroundColor: '#1E1E2E'

// ❌ FORBIDDEN: Hardcoded named colors
color: 'white'

// ❌ FORBIDDEN: Arbitrary ad-hoc numbers for spacing
padding: 13.5,
marginHorizontal: 27
```

---

## 3. Enforcement
- Run a static check: `grep -rE "#[0-9a-fA-F]{3,6}|rgba?\(" src/` must return zero results in component files.
- All styles must type-check against the `Theme` schema.
