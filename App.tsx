import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from 'styled-components';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { themeDefault } from './src/global/styles/theme';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { Routes } from './src/routes/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = useTheme();

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
          backgroundColor: theme.colors.background
        }}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </View>
  );
}
