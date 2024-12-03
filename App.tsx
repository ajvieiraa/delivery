import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Nunito_300Light, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LogBox, Platform, SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
} from 'expo-updates';

import { AnonymousRoutes } from './src/routes';
import { OrderProvider } from './src/store/order';

import Nunito from './src/assets/fonts/Nunito';
import AuthProvider from './src/store/auth/context';

import { FLASH_MESSAGE_PROPS } from './src/utils/message';
import LoadingSpinner from './src/components/LoadingSpinner';
import RequestProvider from './src/services/api/store/context';

import { baseURL } from './src/services/api';
import usePushNotification from './src/services/notifications/usePushNotification';
import MyAwesomeSplashScreen from './src/components/MyAwesomeSplashScren';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const navigation = useRef<NavigationContainerRefWithCurrent<any>>(null);

  usePushNotification({
    navigation,
    doneUpdateChecking: true
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        await Font.loadAsync({
          Nunito_300Light, 
          Nunito_400Regular, 
          Nunito_600SemiBold, 
          Nunito_700Bold 
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RequestProvider baseUrl={baseURL}>
        <AuthProvider>
          <OrderProvider>
            <NavigationContainer ref={navigation}>
              <StatusBar
                style="dark"
                translucent={false}
                backgroundColor="#FFFFFF"
              />
              <AnonymousRoutes />
              <FlashMessage {...FLASH_MESSAGE_PROPS} />
            </NavigationContainer>
          </OrderProvider>
        </AuthProvider>
      </RequestProvider>
    </SafeAreaView>
  );
};

LogBox.ignoreLogs(["is missing in the 'defaultValue' prop"]);

export default App;