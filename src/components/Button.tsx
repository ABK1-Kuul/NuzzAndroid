import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
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

  let bg = colors.brandPrimary;
  let textCol = colors.textInverse;

  if (variant === 'secondary') {
    bg = colors.surfaceSecondary;
    textCol = colors.textPrimary;
  } else if (variant === 'danger') {
    bg = colors.statusError;
    textCol = colors.textPrimary;
  } else if (variant === 'ghost') {
    bg = 'transparent';
    textCol = colors.textSecondary;
  }

  const paddingVertical =
    size === 'sm' ? spacing.xs : size === 'lg' ? spacing.lg : spacing.md;
  const paddingHorizontal =
    size === 'sm' ? spacing.md : size === 'lg' ? spacing.xxl : spacing.lg;
  const fontSize =
    size === 'sm'
      ? typography.fontSizes.bodySm
      : size === 'lg'
      ? typography.fontSizes.subtitle
      : typography.fontSizes.body;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: bg,
          borderRadius: radius.full,
          paddingVertical,
          paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textCol} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              {
                color: textCol,
                fontSize,
                fontWeight: typography.fontWeights.semiBold,
                marginLeft: icon ? spacing.xs : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
