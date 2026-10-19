import React from 'react';
import { Pressable, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme';

export interface ToggleProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  style,
  testID,
}: ToggleProps) {
  const { colors, radius } = useTheme();

  const handlePress = () => {
    if (disabled) return;
    try {
      Haptics.selectionAsync();
    } catch {
      // Haptics fallback on unsupported platforms
    }
    onValueChange(!value);
  };

  const trackBg = disabled
    ? colors.surfaceAlt
    : value
    ? colors.accent
    : colors.toggleOffTrack;

  const thumbBg = disabled
    ? colors.textFaint
    : colors.toggleOffThumb;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.track,
        {
          backgroundColor: trackBg,
          borderRadius: radius.pill,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbBg,
            borderRadius: radius.pill,
            alignSelf: value ? 'flex-end' : 'flex-start',
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 26,
    padding: 3,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
});
