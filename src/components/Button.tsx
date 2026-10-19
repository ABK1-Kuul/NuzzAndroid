import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { useTheme } from '../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const paddingVertical =
    size === 'sm' ? spacing.xs : size === 'lg' ? spacing.lg : spacing.md;
  const paddingHorizontal =
    size === 'sm' ? spacing.md : size === 'lg' ? spacing.xxl : spacing.lg;
  const fontSize =
    size === 'sm'
      ? typography.fontSize.sm
      : size === 'lg'
      ? typography.fontSize.md
      : typography.fontSize.base;

  const textColor = isPrimary
    ? colors.accentText
    : isGhost
    ? colors.textMuted
    : colors.text;

  const spinnerColor = isPrimary ? colors.accentText : textColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: radius.pill,
          paddingVertical,
          paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        isPrimary && {
          backgroundColor: colors.accent,
          borderBottomWidth: pressed ? 1 : 3,
          borderBottomColor: colors.accentDarkEdge,
          transform: [{ translateY: pressed ? 2 : 0 }],
        },
        isSecondary && {
          backgroundColor: pressed ? colors.surface : colors.surfaceAlt,
          borderWidth: 1,
          borderColor: colors.border,
        },
        isGhost && {
          backgroundColor: pressed ? colors.surfaceAlt : 'transparent',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={{ marginRight: spacing.xs }}>{icon}</View> : null}
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize,
                fontFamily: isPrimary
                  ? typography.fontFamily.bold
                  : typography.fontFamily.medium,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
