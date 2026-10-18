import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';
import { Post } from '../../src/data/types';
import { getFeed, cheerPost } from '../../src/data/repositories';
import { Card, Button, Avatar, StreakBadge } from '../../src/components';

export default function HomeScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = useCallback(async () => {
    try {
      const data = await getFeed();
      setPosts(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const onRefresh = () => {
    setRefreshing(true);
    loadFeed();
  };

  const handleCheer = async (postId: string) => {
    try {
      const updated = await cheerPost(postId);
      setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
    } catch {
      // optimistic rollback if error
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, { marginBottom: spacing.lg }]}>
      <View>
        <Text
          style={[
            styles.appName,
            {
              color: colors.brandPrimary,
              fontSize: typography.fontSizes.heading,
              fontWeight: typography.fontWeights.heavy,
            },
          ]}
        >
          Nuzz
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              fontSize: typography.fontSizes.bodySm,
              marginTop: spacing.xxs,
            },
          ]}
        >
          Live Focus Feed & Streaks
        </Text>
      </View>
      <StreakBadge days={12} size="md" />
    </View>
  );

  const renderItem = ({ item }: { item: Post }) => (
    <Card style={{ marginBottom: spacing.md }}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Avatar url={item.user.avatarUrl} name={item.user.name} size={42} />
          <View style={{ marginLeft: spacing.sm }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: typography.fontSizes.body,
                fontWeight: typography.fontWeights.semiBold,
              }}
            >
              {item.user.name}
            </Text>
            <Text
              style={{
                color: colors.textMuted,
                fontSize: typography.fontSizes.caption,
              }}
            >
              {item.user.username}
            </Text>
          </View>
        </View>
        <StreakBadge days={item.user.streakDays} size="sm" />
      </View>

      {/* Focus Session Badge */}
      <View
        style={[
          styles.sessionBadge,
          {
            backgroundColor: colors.surfaceSecondary,
            borderRadius: radius.md,
            padding: spacing.sm,
            marginTop: spacing.md,
          },
        ]}
      >
        <Text
          style={{
            color: colors.brandPrimary,
            fontSize: typography.fontSizes.bodySm,
            fontWeight: typography.fontWeights.medium,
          }}
        >
          🎯 Focused for {item.durationMinutes}m on {item.subject.name}
        </Text>
      </View>

      {/* Reflection Note */}
      {item.reflection && (
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: typography.fontSizes.body,
            marginTop: spacing.sm,
            lineHeight: typography.lineHeights.body,
          }}
        >
          "{item.reflection}"
        </Text>
      )}

      {/* Footer / Cheer Action */}
      <View style={[styles.cardFooter, { marginTop: spacing.md }]}>
        <Button
          title={item.hasCheered ? `Cheered (${item.cheersCount})` : `Cheer (${item.cheersCount})`}
          variant={item.hasCheered ? 'primary' : 'secondary'}
          size="sm"
          onPress={() => handleCheer(item.id)}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.bgPrimary,
          paddingHorizontal: spacing.lg,
        },
      ]}
    >
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={colors.brandPrimary} size="large" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  appName: {
    letterSpacing: -0.5,
  },
  subtitle: {},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
