import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '@/utils/localStorage';
import { restoreAuth } from '@/store/slices/authSlice';
import { restoreOnboarding } from '@/store/slices/onboardingSlice';
import { Inter } from 'next/font/google';
import { ToasterProvider } from '@/config/toaster.config';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

function AppWrapper({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load state from localStorage on app initialization
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      store.dispatch(restoreAuth(savedState.auth));
      store.dispatch(restoreOnboarding(savedState.onboarding));
    }

    // Subscribe to store changes and save to localStorage
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });

    return () => unsubscribe();
  }, []);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${inter.variable} font-sans`}>
        <ToasterProvider />
        <AppWrapper {...props} />
      </div>
    </Provider>
  );
}
