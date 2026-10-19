import { colors, spacing, radius, typography } from '../src/theme';

describe('Theme Foundation', () => {
  it('exports required color tokens with valid hex values', () => {
    expect(colors.bg).toBe('#0a0a0a');
    expect(colors.surface).toBe('#101010');
    expect(colors.surfaceAlt).toBe('#141416');
    expect(colors.border).toBe('#28282a');
    expect(colors.text).toBe('#f2f1f6');
    expect(colors.textMuted).toBe('#989899');
    expect(colors.textFaint).toBe('#6e7175');
    expect(colors.accent).toBe('#77c26f');
    expect(colors.accentDarkEdge).toBe('#569851');
    expect(colors.accentMuted).toBe('#232f23');
    expect(colors.streak).toBe('#fab162');
    expect(colors.coin).toBe('#f4c94b');
    expect(colors.avatarOrange).toBe('#ef6c02');
    expect(colors.badge).toBe('#e2080b');
    expect(colors.toggleOffTrack).toBe('#3c3c3e');
    expect(colors.toggleOffThumb).toBe('#ededed');
    expect(colors.segmentActive).toBe('#101010');
  });

  it('uses 4-pt grid spacing tokens', () => {
    expect(spacing.none).toBe(0);
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(12);
    expect(spacing.lg).toBe(16);
    expect(spacing.xl).toBe(20);
    expect(spacing.xxl).toBe(24);
  });

  it('includes required radius tokens', () => {
    expect(radius.card).toBe(20);
    expect(radius.pill).toBe(9999);
  });

  it('uses DM Sans typography font family', () => {
    expect(typography.fontFamily.regular).toBe('DMSans_400Regular');
    expect(typography.fontFamily.medium).toBe('DMSans_500Medium');
    expect(typography.fontFamily.bold).toBe('DMSans_700Bold');
  });
});
