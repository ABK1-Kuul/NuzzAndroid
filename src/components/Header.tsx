import React from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Share2, Settings } from 'lucide-react-native';
import { useTheme } from '../theme';
import { StreakBadge } from './StreakBadge';

export type HeaderRightAction = 'bell' | 'share' | 'profile' | 'none';

export interface HeaderProps {
  streak?: number;
  rightAction?: HeaderRightAction;
  onPressStreak?: () => void;
  onPressRight?: () => void;
  onPressSettings?: () => void;
  customRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Header({
  streak = 0,
  rightAction = 'bell',
  onPressStreak,
  onPressRight,
  onPressSettings,
  customRight,
  style,
}: HeaderProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const insets = useSafeAreaInsets();

  const renderRight = () => {
    if (customRight) return customRight;

    if (rightAction === 'bell') {
      return (
        <Pressable
          onPress={onPressRight}
          hitSlop={8}
          style={({ pressed }) => [
            styles.actionCircle,
            {
              borderColor: colors.border,
              backgroundColor: pressed ? colors.surfaceAlt : colors.surface,
              borderRadius: radius.pill,
            },
          ]}
        >
          <Bell color={colors.text} size={18} />
        </Pressable>
      );
    }

    if (rightAction === 'share') {
      return (
        <Pressable
          onPress={onPressRight}
          hitSlop={8}
          style={({ pressed }) => [
            styles.actionCircle,
            {
              borderColor: colors.border,
              backgroundColor: pressed ? colors.surfaceAlt : colors.surface,
              borderRadius: radius.pill,
            },
          ]}
        >
          <Share2 color={colors.text} size={18} />
        </Pressable>
      );
    }

    if (rightAction === 'profile') {
      return (
        <View style={styles.rightGroup}>
          <Pressable
            onPress={onPressRight}
            hitSlop={8}
            style={({ pressed }) => [
              styles.actionCircle,
              {
                borderColor: colors.border,
                backgroundColor: pressed ? colors.surfaceAlt : colors.surface,
                borderRadius: radius.pill,
                marginRight: spacing.xs,
              },
            ]}
          >
            <Share2 color={colors.text} size={18} />
          </Pressable>
          <Pressable
            onPress={onPressSettings}
            hitSlop={8}
            style={({ pressed }) => [
              styles.actionCircle,
              {
                borderColor: colors.border,
                backgroundColor: pressed ? colors.surfaceAlt : colors.surface,
                borderRadius: radius.pill,
              },
            ]}
          >
            <Settings color={colors.text} size={18} />
          </Pressable>
        </View>
      );
    }

    return <View style={styles.actionPlaceholder} />;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, spacing.sm),
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.sm,
          backgroundColor: colors.bg,
        },
        style,
      ]}
    >
      {/* Left Slot: Streak Badge */}
      <View style={styles.leftSlot}>
        <Pressable onPress={onPressStreak} disabled={!onPressStreak}>
          <StreakBadge count={streak} size="sm" />
        </Pressable>
      </View>

      {/* Center Slot: Nuzz Wordmark */}
      <View style={styles.centerSlot}>
        <View style={styles.wordmarkRow}>
          {/* Mascot icon: green rounded pill with two pause dots */}
          <View
            style={[
              styles.logoIcon,
              {
                backgroundColor: colors.accent,
                borderRadius: radius.xs,
              },
            ]}
          >
            <View style={[styles.logoEye, { backgroundColor: colors.accentText }]} />
            <View style={[styles.logoEye, { backgroundColor: colors.accentText }]} />
          </View>
          <Text
            style={[
              styles.logoText,
              {
                color: colors.text,
                fontSize: typography.fontSize.lg,
                fontFamily: typography.fontFamily.bold,
                marginLeft: spacing.xs,
              },
            ]}
          >
            nuzz
          </Text>
        </View>
      </View>

      {/* Right Slot: Context Actions */}
      <View style={styles.rightSlot}>{renderRight()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  leftSlot: {
    minWidth: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 22,
    height: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 3,
  },
  logoEye: {
    width: 3,
    height: 7,
    borderRadius: 1,
  },
  logoText: {
    letterSpacing: -0.5,
  },
  rightSlot: {
    minWidth: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCircle: {
    width: 36,
    height: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPlaceholder: {
    width: 36,
    height: 36,
  },
});
