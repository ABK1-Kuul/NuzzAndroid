import { colors, spacing, radius, typography } from '../src/theme';

describe('Theme Foundation', () => {
  it('exports required color tokens with valid hex values', () => {
    expect(colors.bg).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.surface).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.streak).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.coin).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.danger).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(colors.badge).toMatch(/^#[0-9a-fA-F]{6}$/);
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
