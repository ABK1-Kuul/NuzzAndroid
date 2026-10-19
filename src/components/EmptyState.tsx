import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.card,
          padding: spacing.xl,
        },
        style,
      ]}
    >
      {icon ? (
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: colors.surfaceAlt,
              borderRadius: radius.pill,
              marginBottom: spacing.md,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.fontSize.lg,
            fontFamily: typography.fontFamily.bold,
            marginBottom: spacing.xs,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          {
            color: colors.textMuted,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.regular,
            lineHeight: 20,
            marginBottom: actionLabel && onAction ? spacing.lg : 0,
          },
        ]}
      >
        {description}
      </Text>

      {actionLabel && onAction ? (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          size="md"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
