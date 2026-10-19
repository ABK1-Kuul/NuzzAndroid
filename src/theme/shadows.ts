// src/theme/shadows.ts
import { colors } from './colors';

export const shadows = {
  card: {
    shadowColor: colors.bg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPrimaryEdge: {
    borderBottomWidth: 3,
    borderBottomColor: '#529657', // subtle pressed bottom lip for primary green button
  },
} as const;

export type Shadows = typeof shadows;
