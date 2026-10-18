export const typography = {
  fontSizes: {
    caption: 11,
    bodySm: 13,
    body: 15,
    subtitle: 17,
    title: 20,
    heading: 26,
    display: 34,
    timerDigits: 64, // Hero countdown numbers
  },
  lineHeights: {
    caption: 14,
    bodySm: 18,
    body: 22,
    subtitle: 24,
    title: 28,
    heading: 32,
    display: 40,
    timerDigits: 72,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    heavy: '800',
  } as const,
};

export type Typography = typeof typography;
