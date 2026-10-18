import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface StreakBadgeProps {
  days: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakBadge({ days, size = 'md' }: StreakBadgeProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const paddingVertical = isSmall ? spacing.xxs : isLarge ? spacing.sm : spacing.xs;
  const paddingHorizontal = isSmall ? spacing.xs : isLarge ? spacing.md : spacing.sm;
  const fontSize = isSmall
    ? typography.fontSizes.caption
    : isLarge
    ? typography.fontSizes.subtitle
    : typography.fontSizes.bodySm;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.surfaceSecondary,
          borderColor: colors.streakFire,
          borderRadius: radius.full,
          paddingVertical,
          paddingHorizontal,
        },
      ]}
    >
      <Text style={[styles.icon, { fontSize: fontSize * 1.1 }]}>🔥</Text>
      <Text
        style={[
          styles.text,
          {
            color: colors.streakFire,
            fontSize,
            fontWeight: typography.fontWeights.bold,
            marginLeft: spacing.xxs,
          },
        ]}
      >
        {days}d
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    includeFontPadding: false,
  },
  text: {
    includeFontPadding: false,
  },
});
