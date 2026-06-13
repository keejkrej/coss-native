import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'coss Native Showcase',
  slug: 'coss-native-showcase',
  version: '0.0.1',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  scheme: 'coss-native',
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
