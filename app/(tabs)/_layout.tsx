import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, Timer, Users, BarChart2, Trophy, User } from 'lucide-react-native';
import { useTheme } from '../../src/theme';

interface TabBarIconProps {
  Icon: React.ComponentType<{ color: string; size: number; fill?: string }>;
  focused: boolean;
  color?: unknown;
}

function TabBarIcon({ Icon, focused, color }: TabBarIconProps) {
  const { colors, spacing, radius } = useTheme();
  const iconColor = focused
    ? colors.text
    : typeof color === 'string'
    ? color
    : colors.textMuted;

  return (
    <View
      style={[
        styles.iconWrapper,
        focused && {
          backgroundColor: colors.accentMuted,
          borderRadius: radius.pill,
          paddingHorizontal: spacing.md,
          paddingVertical: 3,
        },
      ]}
    >
      <Icon
        color={iconColor}
        fill={focused ? iconColor : 'none'}
        size={20}
      />
    </View>
  );
}

export default function TabLayout() {
  const { colors, typography, spacing } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: spacing.xs,
          paddingTop: spacing.xs,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: typography.fontSize.xs - 1,
          fontFamily: typography.fontFamily.medium,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Home} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Timer} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Users} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={BarChart2} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranks"
        options={{
          title: 'Ranks',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Trophy} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={User} focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    height: 28,
  },
});

