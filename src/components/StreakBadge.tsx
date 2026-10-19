import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export interface StreakBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  suffix?: string;
}

export function StreakBadge({ count, size = 'md', suffix = '' }: StreakBadgeProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const paddingVertical = isSmall ? 2 : isLarge ? spacing.sm : spacing.xs;
  const paddingHorizontal = isSmall ? spacing.xs : isLarge ? spacing.md : spacing.sm;
  const fontSize = isSmall
    ? typography.fontSize.xs
    : isLarge
    ? typography.fontSize.base
    : typography.fontSize.sm;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
          borderRadius: radius.pill,
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
            color: colors.streak,
            fontSize,
            fontFamily: typography.fontFamily.bold,
            marginLeft: 2,
          },
        ]}
      >
        {count}
        {suffix}
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
