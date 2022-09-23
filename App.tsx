import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider, useTheme } from 'styled-components';
import { themeDefault } from './src/global/styles/theme';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, StatusBar } from 'react-native';
import { Routes } from './src/routes/index.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/AuthContext';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { useAuth } from './src/hooks/useAuth';
import AppLoading from 'expo-app-loading';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isUserStorageLoading  } = useAuth();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold
        });
      } catch (err) {
        console.warn(err);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!isUserStorageLoading) {
    <AppLoading />
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1
      }}
    >
      <ThemeProvider theme={themeDefault}>
        <GestureHandlerRootView style={{
          flex: 1,
          backgroundColor: '#5636d3'
        }}>
          <AuthProvider>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Routes />
          </AuthProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </View>
  );
}
