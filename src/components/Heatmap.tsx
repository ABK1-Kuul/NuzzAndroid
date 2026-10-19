import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export interface HeatmapDay {
  date: string;
  intensity: number; // 0..4
}

interface HeatmapProps {
  days: HeatmapDay[];
}

export function Heatmap({ days }: HeatmapProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const getCellColor = (intensity: number) => {
    switch (intensity) {
      case 1:
        return 'rgba(111, 194, 118, 0.25)';
      case 2:
        return 'rgba(111, 194, 118, 0.50)';
      case 3:
        return 'rgba(111, 194, 118, 0.75)';
      case 4:
        return colors.accent;
      default:
        return colors.surfaceAlt;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {days.map((day) => (
          <View key={day.date} style={styles.cellWrapper}>
            <View
              style={[
                styles.cell,
                {
                  backgroundColor: getCellColor(day.intensity),
                  borderRadius: radius.xs,
                  borderColor: colors.border,
                },
              ]}
            />
            <Text
              style={[
                styles.dayLabel,
                {
                  color: colors.textMuted,
                  fontSize: typography.fontSize.xs - 1,
                  marginTop: spacing.xxs,
                },
              ]}
            >
              {day.date.slice(5)}
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.legend, { marginTop: spacing.md }]}>
        <Text style={[styles.legendText, { color: colors.textMuted }]}>Less</Text>
        {[0, 1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={[
              styles.legendCell,
              {
                backgroundColor: getCellColor(level),
                borderRadius: radius.xs,
                marginHorizontal: spacing.xxs,
              },
            ]}
          />
        ))}
        <Text style={[styles.legendText, { color: colors.textMuted }]}>More</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cellWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  cell: {
    width: 32,
    height: 32,
    borderWidth: 1,
  },
  dayLabel: {
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  legendText: {
    fontSize: 10,
  },
  legendCell: {
    width: 12,
    height: 12,
  },
});
