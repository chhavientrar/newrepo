/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider } from 'src/auth/context/jwt';
import axios from 'axios';
// import { AuthProvider } from 'src/auth/context/auth0';
// import { AuthProvider } from 'src/auth/context/amplify';
// import { AuthProvider } from 'src/auth/context/firebase';
// import { AuthProvider } from 'src/auth/context/supabase';

axios.defaults.baseURL = 'https://propel-x-server.vercel.app/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  console.log(axios.defaults.baseURL, 'baseUrl');

  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <CheckoutProvider>
                  <SettingsDrawer />
                  <ProgressBar />

                  <Router />
                </CheckoutProvider>
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
