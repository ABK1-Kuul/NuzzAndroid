// Theme Colors Token Definitions
// Zero hardcoded colors in UI components - use theme.colors.*

export const darkColors = {
  // Brand & Accents
  brandPrimary: '#FF5A36',       // Nuzz vibrant coral/orange
  brandPrimaryMuted: 'rgba(255, 90, 54, 0.15)',
  brandSecondary: '#FFAA00',     // Warm amber
  brandSecondaryMuted: 'rgba(255, 170, 0, 0.15)',
  brandAccent: '#8B5CF6',        // Electric violet
  brandAccentMuted: 'rgba(139, 92, 246, 0.15)',

  // Timer Rings & Status
  timerFocus: '#FF5A36',
  timerBreak: '#10B981',         // Emerald break color
  timerLongBreak: '#06B6D4',     // Cyan long break
  timerTrackBg: '#1F1F2C',       // Muted track

  // Backgrounds
  bgPrimary: '#0C0C10',          // Deep workspace background
  bgSecondary: '#121218',        // Secondary screen background

  // Surfaces & Cards
  surfacePrimary: '#171720',     // Primary card surface
  surfaceSecondary: '#20202D',   // Nested container / tag pill
  surfaceElevated: '#282838',    // Floating modal / sheet / popover
  surfaceHighlight: 'rgba(255, 255, 255, 0.05)',

  // Text Hierarchy
  textPrimary: '#FFFFFF',        // High-emphasis
  textSecondary: '#A1A1B2',      // Medium-emphasis
  textMuted: '#636375',          // Low-emphasis / placeholders
  textInverse: '#0C0C10',        // Text on bright badges

  // Borders & Dividers
  borderSubtle: '#232332',
  borderStrong: '#3A3A50',

  // Status & Badges
  statusSuccess: '#10B981',
  statusWarning: '#F59E0B',
  statusError: '#EF4444',
  statusInfo: '#3B82F6',

  // Gamification & Social
  streakFire: '#FF3B30',
  rankGold: '#FFD700',
  rankSilver: '#C0C0C0',
  rankBronze: '#CD7F32',
  cheerHeart: '#EC4899',
} as const;

export const lightColors = {
  ...darkColors,
  bgPrimary: '#F8F9FA',
  bgSecondary: '#EDF0F3',
  surfacePrimary: '#FFFFFF',
  surfaceSecondary: '#F1F3F5',
  surfaceElevated: '#FFFFFF',
  surfaceHighlight: 'rgba(0, 0, 0, 0.03)',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',
  borderSubtle: '#E5E7EB',
  borderStrong: '#D1D5DB',
  timerTrackBg: '#E5E7EB',
};

export type ColorTheme = typeof darkColors;
