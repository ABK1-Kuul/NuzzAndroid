import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme';

interface AvatarProps {
  url?: string;
  name?: string;
  size?: number;
  showRing?: boolean;
  ringColor?: string;
}

export function Avatar({
  url,
  name,
  size = 40,
  showRing = false,
  ringColor,
}: AvatarProps) {
  const { colors, radius, typography } = useTheme();

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const ringStyle = showRing
    ? {
        borderWidth: 2,
        borderColor: ringColor || colors.brandPrimary,
        padding: 2,
      }
    : null;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius.full,
          backgroundColor: colors.surfaceSecondary,
        },
        ringStyle,
      ]}
    >
      {url ? (
        <Image
          source={{ uri: url }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: radius.full,
          }}
        />
      ) : (
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: size * 0.4,
            fontWeight: typography.fontWeights.semiBold,
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
