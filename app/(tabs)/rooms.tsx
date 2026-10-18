import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';
import { StudyRoom } from '../../src/data/types';
import { getRooms, joinRoom } from '../../src/data/repositories';
import { Card, Button, Avatar } from '../../src/components';

export default function RoomsScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleJoin = async (roomId: string) => {
    await joinRoom(roomId);
    alert('Joined room session! Stay focused with your team.');
  };

  const renderHeader = () => (
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
        Live Study Rooms
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
        Focus synchronously alongside friends & peers
      </Text>
    </View>
  );

  const renderRoom = ({ item }: { item: StudyRoom }) => (
    <Card style={{ marginBottom: spacing.md }}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: typography.fontSizes.subtitle,
              fontWeight: typography.fontWeights.semiBold,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: colors.brandPrimary,
              fontSize: typography.fontSizes.bodySm,
              fontWeight: typography.fontWeights.medium,
              marginTop: spacing.xxs,
            }}
          >
            {item.subject.name} • {item.durationMinutes} min block
          </Text>
        </View>
      </View>

      {/* Participants List */}
      <Text
        style={{
          color: colors.textMuted,
          fontSize: typography.fontSizes.caption,
          fontWeight: typography.fontWeights.semiBold,
          marginTop: spacing.md,
          marginBottom: spacing.xs,
          letterSpacing: 0.5,
        }}
      >
        PARTICIPANTS ({item.participants.length})
      </Text>
      <View style={styles.participantsRow}>
        {item.participants.map((p) => (
          <View key={p.userId} style={[styles.participantItem, { marginRight: spacing.sm }]}>
            <Avatar
              url={p.avatarUrl}
              name={p.name}
              size={38}
              showRing={p.status === 'focusing'}
              ringColor={colors.timerFocus}
            />
            <Text
              numberOfLines={1}
              style={{
                color: colors.textSecondary,
                fontSize: typography.fontSizes.caption,
                marginTop: spacing.xxs,
                maxWidth: 48,
                textAlign: 'center',
              }}
            >
              {p.name.split(' ')[0]}
            </Text>
          </View>
        ))}
      </View>

      {/* Join Action */}
      <View style={[styles.cardFooter, { marginTop: spacing.md }]}>
        <Button
          title="Join Room"
          variant="secondary"
          size="sm"
          onPress={() => handleJoin(item.id)}
        />
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
          data={rooms}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          renderItem={renderRoom}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadRooms();
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantItem: {
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
