import type { TextStyle } from 'react-native';

export const palette = {
  white:   '#FFFFFF',
  gray50:  '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  gray950: '#0A0A0A',
  black:   '#000000',
  red500:  '#EF4444',
  red400:  '#F87171',
} as const;

export type ThemeColors = {
  background: string;
  surface: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  onAccent: string;
  placeholder: string;
  overlay: string;
  danger: string;
};

// Note the inverted accent: a black button in light mode becomes a white
// button in dark mode — the core minimalist signature.
export const lightColors: ThemeColors = {
  background:    palette.white,
  surface:       palette.gray100,
  border:        palette.gray200,
  borderStrong:  palette.gray300,
  textPrimary:   palette.gray950,
  textSecondary: palette.gray500,
  textTertiary:  palette.gray400,
  accent:        palette.gray950,
  onAccent:      palette.white,
  placeholder:   palette.gray400,
  overlay:       'rgba(0,0,0,0.40)',
  danger:        palette.red500,
};

export const darkColors: ThemeColors = {
  background:    palette.gray950,
  surface:       palette.gray900,
  border:        palette.gray800,
  borderStrong:  palette.gray700,
  textPrimary:   palette.gray50,
  textSecondary: palette.gray400,
  textTertiary:  palette.gray600,
  accent:        palette.gray50,
  onAccent:      palette.gray950,
  placeholder:   palette.gray600,
  overlay:       'rgba(0,0,0,0.60)',
  danger:        palette.red400,
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 6, md: 8, lg: 12, xl: 16, pill: 999 } as const;

// `satisfies` keeps the literal types while checking each entry is a valid TextStyle.
export const typography = {
  display: { fontSize: 28, fontWeight: '600', letterSpacing: -0.5 },
  title:   { fontSize: 22, fontWeight: '600', letterSpacing: -0.3 },
  heading: { fontSize: 17, fontWeight: '600' },
  body:    { fontSize: 15, fontWeight: '400' },
  label:   { fontSize: 13, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '400' },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  isDark: boolean;
};

export const lightTheme: Theme = { colors: lightColors, spacing, radius, typography, isDark: false };
export const darkTheme:  Theme = { colors: darkColors,  spacing, radius, typography, isDark: true  };
