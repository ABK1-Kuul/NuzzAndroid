import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary' | 'elevated';
}

export function Card({ children, style, variant = 'primary' }: CardProps) {
  const { colors, spacing, radius } = useTheme();

  const backgroundColor =
    variant === 'elevated'
      ? colors.surfaceElevated
      : variant === 'secondary'
      ? colors.surfaceSecondary
      : colors.surfacePrimary;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderColor: colors.borderSubtle,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});
