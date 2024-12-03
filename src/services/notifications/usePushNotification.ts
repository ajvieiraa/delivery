import React, { useCallback, useEffect } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '.';

interface Props {
  navigation: React.RefObject<NavigationContainerRef>;
  doneUpdateChecking: boolean;
}

const key = '@CSF:PENDING_REDIRECT';

export default function usePushNotification ({
  navigation,
  doneUpdateChecking,
}: Props) {
  const lastNotification = Notifications.useLastNotificationResponse();

  // Enable foreground notifications
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
      }),
    });
  }, []);

  // Register for push notifications
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const redirect = useCallback(
    (notification: Notifications.NotificationResponse) => {
      const { data } = notification.notification.request.content;

      if (!data.tipo) return;

      const attempt = () => {
        if (!navigation.current) {
          setTimeout(() => {
            return attempt();
          }, 500);

          return;
        }

        if (data.tipo === 'pedido_alterado')
          return navigation.current.navigate('MyOrders');

        if (data.tipo === 'pedido_recebido')
          return navigation.current.navigate('MySales', {
            pedido_id: data.pedido_id,
          });
      };

      attempt();
    },
    [navigation],
  );

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      redirect,
    );

    return () => subscription.remove();
  }, [redirect]);

  useEffect(() => {
    const pressed =
      lastNotification?.actionIdentifier ===
      Notifications.DEFAULT_ACTION_IDENTIFIER;

    if (!pressed) return;

    AsyncStorage.setItem(key, JSON.stringify(lastNotification));
  }, [lastNotification]);

  useEffect(() => {
    if (!doneUpdateChecking) return;

    AsyncStorage.getItem(key).then((result) => {
      if (!result) return;

      const notification: Notifications.NotificationResponse = JSON.parse(
        result,
      );

      redirect(notification);

      AsyncStorage.removeItem(key);
    });
  }, [doneUpdateChecking, redirect]);
}
