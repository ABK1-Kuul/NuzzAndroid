import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useTheme } from '../theme';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  showHandle?: boolean;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

export function BottomSheet({
  visible,
  onClose,
  title,
  showCloseButton = true,
  showHandle = true,
  children,
  contentStyle,
}: BottomSheetProps) {
  const { colors, spacing, radius, typography } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        {/* Dismiss Backdrop */}
        <Pressable style={styles.backdropTouchable} onPress={onClose} />

        {/* Sheet Container */}
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingBottom: Math.max(insets.bottom, spacing.lg),
            },
          ]}
        >
          {/* Top Handle */}
          {showHandle ? (
            <View style={[styles.handleRow, { marginTop: spacing.sm }]}>
              <View
                style={[
                  styles.handle,
                  {
                    backgroundColor: colors.border,
                    borderRadius: radius.pill,
                  },
                ]}
              />
            </View>
          ) : null}

          {/* Header Row (Optional Title & Close) */}
          {title || showCloseButton ? (
            <View
              style={[
                styles.headerRow,
                {
                  paddingHorizontal: spacing.lg,
                  paddingTop: showHandle ? spacing.xs : spacing.lg,
                  paddingBottom: spacing.sm,
                },
              ]}
            >
              {title ? (
                <Text
                  style={[
                    styles.title,
                    {
                      color: colors.text,
                      fontSize: typography.fontSize.lg,
                      fontFamily: typography.fontFamily.bold,
                    },
                  ]}
                >
                  {title}
                </Text>
              ) : (
                <View style={{ flex: 1 }} />
              )}

              {showCloseButton ? (
                <Pressable
                  onPress={onClose}
                  hitSlop={8}
                  style={({ pressed }) => [
                    styles.closeButton,
                    {
                      backgroundColor: pressed ? colors.surfaceAlt : 'transparent',
                      borderRadius: radius.pill,
                    },
                  ]}
                >
                  <X color={colors.textMuted} size={20} />
                </Pressable>
              ) : null}
            </View>
          ) : null}

          {/* Sheet Body Content */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ paddingHorizontal: spacing.lg }, contentStyle]}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    flex: 1,
  },
  sheetContainer: {
    borderTopWidth: 1,
    maxHeight: '90%',
  },
  handleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  handle: {
    width: 36,
    height: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
