import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/theme';
import { useTimer } from '../../src/store/timer';
import { completeSession, abandonSession } from '../../src/data/repositories';
import { Ring, Button, Card } from '../../src/components';

export default function RunningSessionScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const router = useRouter();

  const {
    session,
    formattedTime,
    progress,
    pauseTimer,
    resumeTimer,
    completeTimer,
    resetTimer,
  } = useTimer();

  const [reflection, setReflection] = useState('');
  const [saving, setSaving] = useState(false);

  const handlePauseResume = () => {
    if (session.status === 'running') {
      pauseTimer();
    } else if (session.status === 'paused') {
      resumeTimer();
    }
  };

  const handleAbandon = () => {
    Alert.alert(
      'Abandon Session?',
      'Are you sure you want to stop this focus block? Unfinished time will not count toward streaks.',
      [
        { text: 'Keep Going', style: 'cancel' },
        {
          text: 'Abandon',
          style: 'destructive',
          onPress: async () => {
            await abandonSession(session.subjectId);
            resetTimer();
            router.back();
          },
        },
      ]
    );
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await completeSession(session.subjectId, reflection);
      resetTimer();
      router.back();
    } finally {
      setSaving(false);
    }
  };

  const isCompleted = session.status === 'completed';

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.bgPrimary, paddingHorizontal: spacing.xl },
      ]}
    >
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text
          style={[
            styles.modeLabel,
            {
              color: colors.brandPrimary,
              fontSize: typography.fontSizes.bodySm,
              fontWeight: typography.fontWeights.bold,
              letterSpacing: 1.5,
            },
          ]}
        >
          {isCompleted ? 'SESSION FINISHED 🎉' : 'DEEP WORK IN PROGRESS'}
        </Text>
      </View>

      {/* Main Dial & Digits */}
      <View style={styles.centerSection}>
        <Ring
          progress={progress}
          size={280}
          strokeWidth={16}
          color={isCompleted ? colors.statusSuccess : colors.timerFocus}
        >
          <View style={styles.timerContent}>
            <Text
              style={[
                styles.digits,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSizes.timerDigits,
                  fontWeight: typography.fontWeights.heavy,
                },
              ]}
            >
              {formattedTime}
            </Text>
            <Text
              style={[
                styles.statusText,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSizes.body,
                  marginTop: spacing.xs,
                },
              ]}
            >
              {session.status === 'paused'
                ? 'PAUSED'
                : isCompleted
                ? 'Great job!'
                : 'Stay focused'}
            </Text>
          </View>
        </Ring>
      </View>

      {/* Completion Modal / Reflection Card */}
      {isCompleted ? (
        <Card style={{ marginBottom: spacing.xl }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: typography.fontSizes.subtitle,
              fontWeight: typography.fontWeights.semiBold,
              marginBottom: spacing.xs,
            }}
          >
            Session Reflection
          </Text>
          <TextInput
            placeholder="What did you accomplish during this focus block?"
            placeholderTextColor={colors.textMuted}
            value={reflection}
            onChangeText={setReflection}
            multiline
            style={[
              styles.input,
              {
                backgroundColor: colors.surfaceSecondary,
                color: colors.textPrimary,
                borderRadius: radius.md,
                padding: spacing.md,
                borderColor: colors.borderSubtle,
              },
            ]}
          />
          <Button
            title="Save & Post to Feed"
            onPress={handleFinish}
            loading={saving}
            style={{ marginTop: spacing.md }}
          />
        </Card>
      ) : (
        /* Active Timer Controls */
        <View style={[styles.controlsRow, { marginBottom: spacing['3xl'] }]}>
          <Button
            title="Abandon"
            variant="ghost"
            size="md"
            onPress={handleAbandon}
            style={{ flex: 1, marginRight: spacing.md }}
          />

          <Button
            title={session.status === 'paused' ? 'Resume' : 'Pause'}
            variant="secondary"
            size="md"
            onPress={handlePauseResume}
            style={{ flex: 1, marginRight: spacing.md }}
          />

          <Button
            title="Complete"
            variant="primary"
            size="md"
            onPress={completeTimer}
            style={{ flex: 1 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    alignItems: 'center',
    paddingTop: 16,
  },
  modeLabel: {},
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  digits: {
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  statusText: {
    letterSpacing: 0.5,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    minHeight: 70,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});
