import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';

export default function RanksScreen() {
  const { colors, spacing, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.content, { padding: spacing.xl }]}>
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
          Ranks
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textMuted,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.regular,
              marginTop: spacing.xs,
            },
          ]}
        >
          Leaderboards & standings
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  subtitle: {
    textAlign: 'center',
  },
});
