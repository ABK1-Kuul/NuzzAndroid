import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme';
import { Header } from '../../src/components';

export default function RoomsScreen() {
  const { colors, spacing, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <Header rightAction="share" />
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
          Rooms
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
          Live group focus rooms & battles
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
