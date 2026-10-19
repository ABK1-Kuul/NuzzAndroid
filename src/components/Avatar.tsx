import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, avatarPalette } from '../theme';

export interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  isOnline?: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getDeterministicColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarPalette.length;
  return avatarPalette[index];
}

export function Avatar({
  name,
  color,
  size = 'md',
  isOnline = false,
}: AvatarProps) {
  const { colors, radius, typography } = useTheme();

  const dimension =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 32
      : size === 'lg'
      ? 48
      : 40;

  const backgroundColor = color || getDeterministicColor(name);
  const initials = getInitials(name);
  const fontSize = dimension * 0.4;
  const dotSize = Math.max(8, Math.round(dimension * 0.25));

  return (
    <View style={[styles.wrapper, { width: dimension, height: dimension }]}>
      <View
        style={[
          styles.circle,
          {
            width: dimension,
            height: dimension,
            borderRadius: radius.pill,
            backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.initials,
            {
              fontSize,
              color: colors.text,
              fontFamily: typography.fontFamily.bold,
            },
          ]}
        >
          {initials}
        </Text>
      </View>
      {isOnline ? (
        <View
          style={[
            styles.presenceDot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: radius.pill,
              backgroundColor: colors.accent,
              borderColor: colors.bg,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
    includeFontPadding: false,
  },
  presenceDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    borderWidth: 2,
  },
});
