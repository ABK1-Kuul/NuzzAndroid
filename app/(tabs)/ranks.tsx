import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';
import { LeaderboardEntry } from '../../src/data/types';
import { getLeaderboard, LeaderboardPeriod } from '../../src/data/repositories';
import { Card, Avatar, StreakBadge } from '../../src/components';

const PERIODS: { key: LeaderboardPeriod; label: string }[] = [
  { key: 'daily', label: 'Today' },
  { key: 'weekly', label: 'This Week' },
  { key: 'allTime', label: 'All Time' },
];

export default function RanksScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLeaderboard = async (selectedPeriod: LeaderboardPeriod) => {
    try {
      const data = await getLeaderboard(selectedPeriod);
      setEntries(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadLeaderboard(period);
  }, [period]);

  const topThree = entries.slice(0, 3);
  const restEntries = entries.slice(3);

  const renderHeader = () => (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={[styles.header, { marginBottom: spacing.md }]}>
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
          Leaderboards
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
          Compete with friends & maintain your streak
        </Text>
      </View>

      {/* Period Filter Tabs */}
      <View
        style={[
          styles.tabRow,
          {
            backgroundColor: colors.surfaceSecondary,
            borderRadius: radius.full,
            padding: spacing.xxs,
            marginBottom: spacing.xl,
          },
        ]}
      >
        {PERIODS.map((p) => {
          const isSelected = p.key === period;
          return (
            <TouchableOpacity
              key={p.key}
              activeOpacity={0.8}
              onPress={() => setPeriod(p.key)}
              style={[
                styles.tabButton,
                {
                  backgroundColor: isSelected ? colors.surfacePrimary : 'transparent',
                  borderRadius: radius.full,
                  paddingVertical: spacing.sm,
                },
              ]}
            >
              <Text
                style={{
                  color: isSelected ? colors.brandPrimary : colors.textMuted,
                  fontSize: typography.fontSizes.bodySm,
                  fontWeight: typography.fontWeights.semiBold,
                }}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Podium Display (Top 3) */}
      {topThree.length >= 3 && (
        <View style={[styles.podiumContainer, { marginBottom: spacing.lg }]}>
          {/* Rank 2 */}
          <View style={[styles.podiumColumn, { marginTop: 24 }]}>
            <Avatar
              url={topThree[1].user.avatarUrl}
              name={topThree[1].user.name}
              size={54}
              showRing
              ringColor={colors.rankSilver}
            />
            <Text style={[styles.podiumRank, { color: colors.rankSilver }]}>2nd</Text>
            <Text numberOfLines={1} style={[styles.podiumName, { color: colors.textPrimary }]}>
              {topThree[1].user.name.split(' ')[0]}
            </Text>
            <Text style={[styles.podiumScore, { color: colors.textMuted }]}>
              {Math.round(topThree[1].focusMinutes / 60)}h
            </Text>
          </View>

          {/* Rank 1 */}
          <View style={styles.podiumColumn}>
            <Text style={{ fontSize: 24, marginBottom: -4 }}>👑</Text>
            <Avatar
              url={topThree[0].user.avatarUrl}
              name={topThree[0].user.name}
              size={66}
              showRing
              ringColor={colors.rankGold}
            />
            <Text style={[styles.podiumRank, { color: colors.rankGold, fontWeight: '700' }]}>
              1st
            </Text>
            <Text numberOfLines={1} style={[styles.podiumName, { color: colors.textPrimary }]}>
              {topThree[0].user.name.split(' ')[0]}
            </Text>
            <Text style={[styles.podiumScore, { color: colors.brandPrimary }]}>
              {Math.round(topThree[0].focusMinutes / 60)}h
            </Text>
          </View>

          {/* Rank 3 */}
          <View style={[styles.podiumColumn, { marginTop: 36 }]}>
            <Avatar
              url={topThree[2].user.avatarUrl}
              name={topThree[2].user.name}
              size={50}
              showRing
              ringColor={colors.rankBronze}
            />
            <Text style={[styles.podiumRank, { color: colors.rankBronze }]}>3rd</Text>
            <Text numberOfLines={1} style={[styles.podiumName, { color: colors.textPrimary }]}>
              {topThree[2].user.name.split(' ')[0]}
            </Text>
            <Text style={[styles.podiumScore, { color: colors.textMuted }]}>
              {Math.round(topThree[2].focusMinutes / 60)}h
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderRankItem = ({ item }: { item: LeaderboardEntry }) => (
    <Card
      style={[
        styles.rankCard,
        {
          marginBottom: spacing.sm,
          borderColor: item.user.isCurrentUser ? colors.brandPrimary : colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.rankLeft}>
        <Text
          style={[
            styles.rankIndex,
            {
              color: item.user.isCurrentUser ? colors.brandPrimary : colors.textMuted,
              fontWeight: typography.fontWeights.bold,
            },
          ]}
        >
          #{item.rank}
        </Text>
        <Avatar url={item.user.avatarUrl} name={item.user.name} size={36} />
        <View style={{ marginLeft: spacing.sm }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: typography.fontSizes.body,
              fontWeight: typography.fontWeights.semiBold,
            }}
          >
            {item.user.name} {item.user.isCurrentUser && '(You)'}
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: typography.fontSizes.caption }}>
            {item.user.username}
          </Text>
        </View>
      </View>

      <View style={styles.rankRight}>
        <StreakBadge days={item.user.streakDays} size="sm" />
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: typography.fontSizes.body,
            fontWeight: typography.fontWeights.bold,
            marginLeft: spacing.md,
          }}
        >
          {Math.round(item.focusMinutes / 60)}h
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.bgPrimary, paddingHorizontal: spacing.lg },
      ]}
    >
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={colors.brandPrimary} size="large" />
        </View>
      ) : (
        <FlatList
          data={restEntries}
          keyExtractor={(item) => item.user.id}
          ListHeaderComponent={renderHeader}
          renderItem={renderRankItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadLeaderboard(period);
              }}
              tintColor={colors.brandPrimary}
            />
          }
        />
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
  tabRow: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 12,
  },
  podiumColumn: {
    alignItems: 'center',
    flex: 1,
  },
  podiumRank: {
    fontSize: 13,
    marginTop: 4,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  podiumScore: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  rankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankIndex: {
    width: 32,
    fontSize: 15,
  },
  rankRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
