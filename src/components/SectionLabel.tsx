import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme';

export interface SectionLabelProps {
  title: string;
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function SectionLabel({
  title,
  rightAction,
  style,
  textStyle,
}: SectionLabelProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.sm }, style]}>
      <Text
        style={[
          styles.label,
          {
            color: colors.textMuted,
            fontSize: typography.fontSize.xs,
            fontFamily: typography.fontFamily.bold,
          },
          textStyle,
        ]}
      >
        {title.toUpperCase()}
      </Text>
      {rightAction ? <View>{rightAction}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    letterSpacing: 1.2,
    includeFontPadding: false,
  },
});
