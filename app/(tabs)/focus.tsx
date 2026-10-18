import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/theme';
import { Subject } from '../../src/data/types';
import { getSubjects, startSession } from '../../src/data/repositories';
import { startTimer } from '../../src/store/timer';
import { Ring, Button } from '../../src/components';

const DURATIONS = [15, 25, 45, 60, 90];

export default function FocusScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const router = useRouter();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(25);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSubjects().then((data) => {
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubject(data[0]);
      }
      setLoading(false);
    });
  }, []);

  const handleStart = async () => {
    if (!selectedSubject) return;

    // Start in repository & store
    await startSession(selectedSubject.id, selectedDuration);
    startTimer(selectedSubject.id, selectedDuration);

    router.push('/session/running');
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.bgPrimary }]}
      >
        <ActivityIndicator color={colors.brandPrimary} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.bgPrimary, paddingHorizontal: spacing.lg },
      ]}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: spacing['4xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
              fontSize: typography.fontSizes.heading,
              fontWeight: typography.fontWeights.bold,
              marginTop: spacing.md,
            },
          ]}
        >
          Focus Session
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
          Choose duration and subject to begin
        </Text>

        {/* Circular Preview Dial */}
        <View style={[styles.dialContainer, { marginVertical: spacing['3xl'] }]}>
          <Ring progress={1.0} size={220} strokeWidth={12}>
            <View style={styles.dialInner}>
              <Text
                style={[
                  styles.timerText,
                  {
                    color: colors.textPrimary,
                    fontSize: typography.fontSizes.timerDigits - 8,
                    fontWeight: typography.fontWeights.bold,
                  },
                ]}
              >
                {selectedDuration}:00
              </Text>
              <Text
                style={[
                  styles.subjectBadge,
                  {
                    color: colors.brandPrimary,
                    fontSize: typography.fontSizes.body,
                    fontWeight: typography.fontWeights.medium,
                    marginTop: spacing.xs,
                  },
                ]}
              >
                {selectedSubject?.name || 'Focus'}
              </Text>
            </View>
          </Ring>
        </View>

        {/* Duration Selector */}
        <Text
          style={[
            styles.sectionLabel,
            {
              color: colors.textMuted,
              fontSize: typography.fontSizes.caption,
              fontWeight: typography.fontWeights.semiBold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          DURATION (MINUTES)
        </Text>
        <View style={[styles.pillRow, { marginBottom: spacing.xl }]}>
          {DURATIONS.map((d) => {
            const isSelected = d === selectedDuration;
            return (
              <TouchableOpacity
                key={d}
                activeOpacity={0.7}
                onPress={() => setSelectedDuration(d)}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isSelected
                      ? colors.brandPrimary
                      : colors.surfaceSecondary,
                    borderRadius: radius.full,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    borderColor: isSelected
                      ? colors.brandPrimary
                      : colors.borderSubtle,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelected ? colors.textInverse : colors.textPrimary,
                    fontSize: typography.fontSizes.bodySm,
                    fontWeight: typography.fontWeights.semiBold,
                  }}
                >
                  {d}m
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Subject Selector */}
        <Text
          style={[
            styles.sectionLabel,
            {
              color: colors.textMuted,
              fontSize: typography.fontSizes.caption,
              fontWeight: typography.fontWeights.semiBold,
              marginBottom: spacing.sm,
            },
          ]}
        >
          SUBJECT
        </Text>
        <View style={[styles.subjectGrid, { marginBottom: spacing['3xl'] }]}>
          {subjects.map((sub) => {
            const isSelected = sub.id === selectedSubject?.id;
            return (
              <TouchableOpacity
                key={sub.id}
                activeOpacity={0.7}
                onPress={() => setSelectedSubject(sub)}
                style={[
                  styles.subjectCard,
                  {
                    backgroundColor: isSelected
                      ? colors.surfaceSecondary
                      : colors.surfacePrimary,
                    borderRadius: radius.md,
                    borderColor: isSelected
                      ? colors.brandPrimary
                      : colors.borderSubtle,
                    padding: spacing.md,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelected ? colors.brandPrimary : colors.textPrimary,
                    fontSize: typography.fontSizes.body,
                    fontWeight: typography.fontWeights.semiBold,
                  }}
                >
                  {sub.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Big Start Button */}
        <Button
          title="Start Deep Work"
          size="lg"
          onPress={handleStart}
          style={{ width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    alignItems: 'stretch',
  },
  title: {},
  subtitle: {},
  dialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontVariant: ['tabular-nums'],
  },
  subjectBadge: {},
  sectionLabel: {
    letterSpacing: 1,
  },
  pillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pill: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectCard: {
    minWidth: '48%',
    flex: 1,
  },
});
