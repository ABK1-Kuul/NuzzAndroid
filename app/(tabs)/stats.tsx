import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';
import { StatsData } from '../../src/data/types';
import { getStats } from '../../src/data/repositories';
import { Card, Heatmap } from '../../src/components';

export default function StatsScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.bgPrimary, paddingHorizontal: spacing.lg },
      ]}
    >
      {loading || !stats ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={colors.brandPrimary} size="large" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadStats();
              }}
              tintColor={colors.brandPrimary}
            />
          }
        >
          {/* Header */}
          <View style={[styles.header, { marginBottom: spacing.lg }]}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSizes.heading,
                  fontWeight: typography.fontWeights.bold,
                },
              ]}
            >
              Productivity Stats
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSizes.body,
                  marginTop: spacing.xxs,
                },
              ]}
            >
              Your deep work metrics & consistency
            </Text>
          </View>

          {/* Quick Stats Grid */}
          <View style={[styles.statsGrid, { marginBottom: spacing.md }]}>
            <Card style={styles.statCard}>
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSizes.caption }}>
                TODAY
              </Text>
              <Text
                style={{
                  color: colors.brandPrimary,
                  fontSize: typography.fontSizes.display,
                  fontWeight: typography.fontWeights.heavy,
                  marginTop: spacing.xxs,
                }}
              >
                {stats.todayMinutes}m
              </Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSizes.caption }}>
                THIS WEEK
              </Text>
              <Text
                style={{
                  color: colors.brandSecondary,
                  fontSize: typography.fontSizes.display,
                  fontWeight: typography.fontWeights.heavy,
                  marginTop: spacing.xxs,
                }}
              >
                {Math.round(stats.weekMinutes / 60)}h
              </Text>
            </Card>
          </View>

          <View style={[styles.statsGrid, { marginBottom: spacing.lg }]}>
            <Card style={styles.statCard}>
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSizes.caption }}>
                CURRENT STREAK
              </Text>
              <Text
                style={{
                  color: colors.streakFire,
                  fontSize: typography.fontSizes.display,
                  fontWeight: typography.fontWeights.heavy,
                  marginTop: spacing.xxs,
                }}
              >
                🔥 {stats.currentStreak}d
              </Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSizes.caption }}>
                ALL-TIME TOTAL
              </Text>
              <Text
                style={{
                  color: colors.statusSuccess,
                  fontSize: typography.fontSizes.display,
                  fontWeight: typography.fontWeights.heavy,
                  marginTop: spacing.xxs,
                }}
              >
                {stats.totalHours}h
              </Text>
            </Card>
          </View>

          {/* Activity Heatmap Card */}
          <Card style={{ marginBottom: spacing.lg }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: typography.fontSizes.subtitle,
                fontWeight: typography.fontWeights.semiBold,
                marginBottom: spacing.md,
              }}
            >
              Daily Consistency
            </Text>
            <Heatmap days={stats.dailyHeatmap} />
          </Card>

          {/* Subject Breakdown Card */}
          <Card>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: typography.fontSizes.subtitle,
                fontWeight: typography.fontWeights.semiBold,
                marginBottom: spacing.md,
              }}
            >
              Focus by Subject
            </Text>
            {stats.subjectBreakdown.map((item) => (
              <View key={item.subject.id} style={{ marginBottom: spacing.md }}>
                <View style={styles.subjectRow}>
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontSize: typography.fontSizes.body,
                      fontWeight: typography.fontWeights.medium,
                    }}
                  >
                    {item.subject.name}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontSize: typography.fontSizes.bodySm,
                    }}
                  >
                    {item.minutes}m ({item.percentage}%)
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressBarTrack,
                    {
                      backgroundColor: colors.surfaceSecondary,
                      borderRadius: radius.full,
                      marginTop: spacing.xs,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        backgroundColor: colors.brandPrimary,
                        borderRadius: radius.full,
                        width: `${item.percentage}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 8,
  },
  title: {},
  subtitle: {},
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarTrack: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
});
