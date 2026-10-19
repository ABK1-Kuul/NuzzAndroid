import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, ColorKey } from '../../src/theme';
import {
  Card,
  Button,
  Avatar,
  Pill,
  StreakBadge,
  Header,
  SegmentedControl,
  BottomSheet,
} from '../../src/components';

export default function GalleryScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'global' | 'following'>('global');
  const [clickCount, setClickCount] = useState(0);
  const [selectedSegment2, setSelectedSegment2] = useState(0);
  const [selectedSegment3, setSelectedSegment3] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(false);

  const colorEntries = Object.entries(colors) as [ColorKey, string][];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { marginBottom: spacing.xl }]}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                  fontSize: typography.fontSize['2xl'],
                  fontFamily: typography.fontFamily.bold,
                },
              ]}
            >
              Dev Gallery
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textMuted,
                  fontSize: typography.fontSize.sm,
                  fontFamily: typography.fontFamily.regular,
                  marginTop: spacing.xxs,
                },
              ]}
            >
              Tokens & Base Components Playground
            </Text>
          </View>
          <Button
            title="Close"
            variant="ghost"
            size="sm"
            onPress={() => router.back()}
          />
        </View>

        {/* 1. Color Tokens */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          COLOR TOKENS
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={styles.colorGrid}>
            {colorEntries.map(([key, hex]) => (
              <View key={key} style={[styles.colorItem, { marginBottom: spacing.sm }]}>
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: hex,
                      borderRadius: radius.xs,
                      borderColor: colors.border,
                    },
                  ]}
                />
                <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: typography.fontSize.xs,
                      fontFamily: typography.fontFamily.medium,
                    }}
                  >
                    {key}
                  </Text>
                  <Text
                    style={{
                      color: colors.textFaint,
                      fontSize: typography.fontSize.xs - 1,
                      fontFamily: typography.fontFamily.regular,
                    }}
                  >
                    {hex}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* 2. Typography Samples */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          TYPOGRAPHY (DM SANS)
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize['3xl'],
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.xs,
            }}
          >
            Display Heading (34px)
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize['2xl'],
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.xs,
            }}
          >
            Heading 2xl (28px)
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize.lg,
              fontFamily: typography.fontFamily.medium,
              marginBottom: spacing.xs,
            }}
          >
            Title Lg (20px)
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.regular,
              marginBottom: spacing.xs,
            }}
          >
            Body Regular (15px) — Nuzz is a social focus-timer app.
          </Text>
          <Text
            style={{
              color: colors.textFaint,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.regular,
            }}
          >
            Caption (11px) — Timestamps and subtle labels
          </Text>
        </Card>

        {/* 3. Buttons */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          BUTTONS
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={{ gap: spacing.md }}>
            <Button
              title="Primary Action (Start focus)"
              variant="primary"
              size="lg"
              onPress={() => setClickCount((c) => c + 1)}
            />
            <Button
              title="Secondary Action (Explore)"
              variant="secondary"
              size="md"
              onPress={() => setClickCount((c) => c + 1)}
            />
            <Button
              title="Ghost Button (Cancel)"
              variant="ghost"
              size="sm"
              onPress={() => setClickCount((c) => c + 1)}
            />
            <Button
              title="Loading Primary"
              variant="primary"
              loading
              onPress={() => {}}
            />
            <Button
              title="Disabled Button"
              variant="primary"
              disabled
              onPress={() => {}}
            />
            <Text
              style={{
                color: colors.textMuted,
                fontSize: typography.fontSize.xs,
                textAlign: 'center',
                marginTop: spacing.xs,
              }}
            >
              Clicks registered: {clickCount}
            </Text>
          </View>
        </Card>

        {/* 4. Avatars */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          AVATARS (WITH PRESENCE DOTS)
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarItem}>
              <Avatar name="Alex" size="lg" isOnline />
              <Text style={[styles.avatarLabel, { color: colors.textMuted }]}>
                Alex (Lg)
              </Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Sarah Chen" size="md" isOnline />
              <Text style={[styles.avatarLabel, { color: colors.textMuted }]}>
                Sarah (Md)
              </Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Marcus Vance" size="sm" isOnline={false} />
              <Text style={[styles.avatarLabel, { color: colors.textMuted }]}>
                Marcus (Sm)
              </Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Elena Rostova" color={colors.accent} size="md" isOnline />
              <Text style={[styles.avatarLabel, { color: colors.textMuted }]}>
                Accent
              </Text>
            </View>
          </View>
        </Card>

        {/* 5. Streak Badges */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          STREAK BADGES
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={styles.badgeRow}>
            <StreakBadge count={1} size="sm" suffix="d" />
            <StreakBadge count={5} size="md" suffix="d" />
            <StreakBadge count={41} size="lg" />
            <StreakBadge count={100} size="md" />
          </View>
        </Card>

        {/* 6. Pills & Filters */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          PILLS & SEGMENTED CONTROLS
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={[styles.pillGroup, { marginBottom: spacing.md }]}>
            <Pill
              label="Global"
              active={activeTab === 'global'}
              onPress={() => setActiveTab('global')}
            />
            <Pill
              label="Following"
              active={activeTab === 'following'}
              onPress={() => setActiveTab('following')}
            />
          </View>

          <Text
            style={{
              color: colors.textFaint,
              fontSize: typography.fontSize.xs,
              marginBottom: spacing.xs,
            }}
          >
            Subject & Status Tags:
          </Text>
          <View style={styles.pillGroup}>
            <Pill label="Coding" dotColor={colors.accent} />
            <Pill label="Math" dotColor={colors.streak} />
            <Pill label="Design" dotColor="#8b5cf6" />
            <Pill label="🪙 +1 coin" />
          </View>
        </Card>

        {/* 7. Card Variants */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          CARD CONTAINERS
        </Text>
        <Card style={{ marginBottom: spacing.md }} variant="surface">
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.xs,
            }}
          >
            Primary Card (surface)
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.fontSize.sm,
              marginBottom: spacing.md,
            }}
          >
            Standard container with 20px radius and subtle border.
          </Text>

          <Card variant="surfaceAlt">
            <Text
              style={{
                color: colors.text,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily.medium,
              }}
            >
              Nested Container (surfaceAlt)
            </Text>
            <Text
              style={{
                color: colors.textFaint,
                fontSize: typography.fontSize.xs,
                marginTop: spacing.xxs,
              }}
            >
              Used for inputs, inner cards, and highlighted sections.
            </Text>
          </Card>
        </Card>

        {/* 8. Persistent Header */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          PERSISTENT HEADER (TAB SCREENS)
        </Text>
        <Card style={{ marginBottom: spacing.xl, padding: 0, overflow: 'hidden' }}>
          <Header streak={5} rightAction="bell" />
          <View style={{ borderTopWidth: 1, borderColor: colors.border }}>
            <Header streak={12} rightAction="share" />
          </View>
          <View style={{ borderTopWidth: 1, borderColor: colors.border }}>
            <Header streak={42} rightAction="profile" />
          </View>
        </Card>

        {/* 9. Segmented Control */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          SEGMENTED CONTROLS
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <Text
            style={{
              color: colors.textFaint,
              fontSize: typography.fontSize.xs,
              marginBottom: spacing.xs,
            }}
          >
            2-Item (Global / Following):
          </Text>
          <SegmentedControl
            values={['Global', 'Following']}
            selectedIndex={selectedSegment2}
            onChange={setSelectedSegment2}
            style={{ marginBottom: spacing.lg }}
          />

          <Text
            style={{
              color: colors.textFaint,
              fontSize: typography.fontSize.xs,
              marginBottom: spacing.xs,
            }}
          >
            3-Item (Focus / Tasks / Plan):
          </Text>
          <SegmentedControl
            values={['Focus', 'Tasks', 'Plan']}
            selectedIndex={selectedSegment3}
            onChange={setSelectedSegment3}
          />
        </Card>

        {/* 10. Bottom Sheet */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.accent,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.bold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          BOTTOM SHEET
        </Text>
        <Card style={{ marginBottom: spacing.xl }}>
          <Button
            title="Open Demo Bottom Sheet"
            variant="secondary"
            size="md"
            onPress={() => setSheetVisible(true)}
          />
        </Card>
      </ScrollView>

      {/* Bottom Sheet Demo */}
      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Welcome to Nuzz"
      >
        <View style={{ paddingVertical: spacing.md }}>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.medium,
              marginBottom: spacing.sm,
            }}
          >
            A focus timer you use with friends.
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.fontSize.sm,
              lineHeight: 20,
              marginBottom: spacing.xl,
            }}
          >
            This feed is people sharing focus sessions they just finished: proof of work, not scrolling.
          </Text>
          <Button
            title="Start focusing — it's free →"
            variant="primary"
            size="lg"
            onPress={() => setSheetVisible(false)}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {},
  subtitle: {},
  sectionTitle: {
    letterSpacing: 1.2,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  swatch: {
    width: 28,
    height: 28,
    borderWidth: 1,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatarItem: {
    alignItems: 'center',
  },
  avatarLabel: {
    fontSize: 11,
    marginTop: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
