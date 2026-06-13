import '../global.css';

import { Text } from '@/registry/nativewind/components/ui/text';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '@showcase/components/theme-toggle';
import { NAV_THEME } from '@showcase/lib/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme ?? 'light';

  return (
    <ThemeProvider value={NAV_THEME[scheme]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: NAV_THEME[scheme].colors.background }}>
        <KeyboardProvider>
          <Stack
            screenOptions={{
              headerBackTitle: 'Back',
              headerTitle: (props) => (
                <Text className="text-xl font-medium">{props.children}</Text>
              ),
              headerRight: () => <ThemeToggle />,
            }}>
            <Stack.Screen
              name="index"
              options={{
                title: 'coss Native',
                headerLargeTitle: Platform.OS === 'ios',
              }}
            />
            <Stack.Screen name="components/[slug]" options={{ title: 'Component' }} />
          </Stack>
          <PortalHost />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
