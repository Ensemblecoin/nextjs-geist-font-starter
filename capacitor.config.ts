import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.wattwise',
  appName: 'WattWise',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    Geolocation: {
      permissions: ['location']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#2D5016'
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
