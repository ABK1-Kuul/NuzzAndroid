import React from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../theme';

export interface PillProps {
  label: string;
  icon?: React.ReactNode;
  dotColor?: string;
  active?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export function Pill({
  label,
  icon,
  dotColor,
  active = false,
  onPress,
  size = 'md',
  style,
}: PillProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isSmall = size === 'sm';
  const paddingVertical = isSmall ? spacing.xs : spacing.sm;
  const paddingHorizontal = isSmall ? spacing.sm : spacing.md;
  const fontSize = isSmall ? typography.fontSize.xs : typography.fontSize.sm;

  const backgroundColor = active ? colors.surfaceAlt : colors.surface;
  const borderColor = active ? colors.accent : colors.border;
  const textColor = active ? colors.text : colors.textMuted;

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderRadius: radius.pill,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
    >
      {dotColor ? (
        <View
          style={[
            styles.dot,
            {
              backgroundColor: dotColor,
              borderRadius: radius.pill,
              marginRight: spacing.xs,
            },
          ]}
        />
      ) : null}
      {icon ? <View style={{ marginRight: spacing.xs }}>{icon}</View> : null}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize,
            fontFamily: active
              ? typography.fontFamily.medium
              : typography.fontFamily.regular,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
  },
  text: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
