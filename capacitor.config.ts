import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.fede.alarma',
  appName: 'alarma',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchFadeOutDuration: 700,
    },
  },
};

export default config;
