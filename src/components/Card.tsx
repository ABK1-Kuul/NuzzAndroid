import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../theme';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'surface' | 'surfaceAlt';
}

export function Card({ children, style, variant = 'surface' }: CardProps) {
  const { colors, spacing, radius } = useTheme();

  const backgroundColor = variant === 'surfaceAlt' ? colors.surfaceAlt : colors.surface;

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor,
          borderColor: colors.border,
          borderRadius: radius.card,
          padding: spacing.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});
