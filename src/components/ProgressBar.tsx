import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface ProgressBarProps {
  progress: number; // 0 to 1 (values > 1 will be treated as percentages / 100)
  height?: number;
  trackColor?: string;
  progressColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  progress,
  height = 4,
  trackColor,
  progressColor,
  style,
}: ProgressBarProps) {
  const { colors, radius } = useTheme();

  // Normalize progress to [0, 1]
  const normalized = Math.min(
    Math.max(progress > 1 ? progress / 100 : progress, 0),
    1
  );

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor || colors.surfaceAlt,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${normalized * 100}%`,
            height,
            backgroundColor: progressColor || colors.accent,
            borderRadius: radius.pill,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
