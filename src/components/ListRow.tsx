import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  right?: React.ReactNode;
  rightText?: string;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  hasDivider?: boolean;
}

export function ListRow({
  title,
  subtitle,
  icon,
  iconBgColor,
  right,
  rightText,
  onPress,
  showChevron = true,
  disabled = false,
  style,
  hasDivider = false,
}: ListRowProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isInteractive = Boolean(onPress) && !disabled;

  const content = (
    <View
      style={[
        styles.row,
        {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderBottomWidth: hasDivider ? 1 : 0,
          borderBottomColor: colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {/* Left Icon */}
      {icon ? (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: iconBgColor || colors.surfaceAlt,
              borderRadius: radius.md,
              marginRight: spacing.md,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}

      {/* Center Labels */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.medium,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textMuted,
                fontSize: typography.fontSize.xs,
                fontFamily: typography.fontFamily.regular,
                marginTop: spacing.xxs,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Right Slot */}
      <View style={styles.rightContainer}>
        {rightText ? (
          <Text
            style={[
              styles.rightText,
              {
                color: colors.textMuted,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily.regular,
                marginRight: showChevron ? spacing.xs : 0,
              },
            ]}
          >
            {rightText}
          </Text>
        ) : null}

        {right ? (
          right
        ) : isInteractive && showChevron ? (
          <ChevronRight color={colors.textFaint} size={18} />
        ) : null}
      </View>
    </View>
  );

  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          pressed && { backgroundColor: colors.surfaceAlt },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    includeFontPadding: false,
  },
  subtitle: {
    includeFontPadding: false,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 12,
  },
  rightText: {
    includeFontPadding: false,
  },
});
