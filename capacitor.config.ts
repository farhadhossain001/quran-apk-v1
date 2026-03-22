import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noorquran.app',
  appName: 'NoorQuran',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
