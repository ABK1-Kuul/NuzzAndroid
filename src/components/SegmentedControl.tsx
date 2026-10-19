import React from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControl({
  values,
  selectedIndex,
  onChange,
  size = 'md',
  fullWidth = true,
  style,
}: SegmentedControlProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isSmall = size === 'sm';
  const paddingVertical = isSmall ? spacing.xs : spacing.sm;
  const paddingHorizontal = isSmall ? spacing.md : spacing.lg;
  const fontSize = isSmall ? typography.fontSize.xs : typography.fontSize.sm;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
          borderRadius: radius.pill,
          padding: spacing.xxs,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {values.map((label, index) => {
        const isActive = index === selectedIndex;

        return (
          <Pressable
            key={label}
            onPress={() => onChange(index)}
            style={({ pressed }) => [
              styles.segment,
              {
                borderRadius: radius.pill,
                paddingVertical,
                paddingHorizontal,
                flex: fullWidth ? 1 : undefined,
                backgroundColor: isActive ? colors.surface : 'transparent',
                borderColor: isActive ? colors.border : 'transparent',
                borderWidth: isActive ? 1 : 0,
                opacity: pressed && !isActive ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  fontSize,
                  color: isActive ? colors.text : colors.textMuted,
                  fontFamily: isActive
                    ? typography.fontFamily.medium
                    : typography.fontFamily.regular,
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
