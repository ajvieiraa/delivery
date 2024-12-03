import { useFocusEffect } from '@react-navigation/core';
import { useCallback } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useAuth } from '../store/auth';

export const BackButtonLogout = () => {
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          Alert.alert(
            'Sair',
            'Tem certeza de que deseja sair da sua conta?',
            [{ text: 'Sim', onPress: logout }, { text: 'Não' }],
            { cancelable: true },
          );
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );
};

export const BackButtonExit = () => {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          const quit = BackHandler.exitApp;

          Alert.alert(
            'Sair',
            'Tem certeza de que deseja fechar o aplicativo?',
            [{ text: 'Sim', onPress: quit }, { text: 'Não' }],
            { cancelable: true },
          );
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );
};
