import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import * as colors from '../utils/colors';


// Create a custom theme with our vibrant color palette
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    onPrimary: colors.primary.contrast,
    primaryContainer: colors.primary.light,
    onPrimaryContainer: colors.primary.dark,
    secondary: colors.accent.info,
    onSecondary: colors.primary.contrast,
    secondaryContainer: colors.accent.info + '20',
    error: colors.accent.error,
    onError: colors.primary.contrast,
    errorContainer: colors.accent.error + '20',
    background: colors.neutral.background,
    onBackground: colors.neutral.text.primary,
    surface: colors.neutral.card,
    onSurface: colors.neutral.text.primary,
    surfaceVariant: colors.neutral.background,
    outline: colors.neutral.border.medium,
  },
};

export default function RootLayout() {
  useFrameworkReady();

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
