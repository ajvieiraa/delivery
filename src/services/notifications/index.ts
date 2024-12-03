import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform, Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import Storage from '../../services/storage';
import axios from 'axios';

export async function registerForPushNotificationsAsync () {
  const auth = await Storage.getAuth();
  //console.log('Auth carregado do Storage:', auth);

  let token;
  let userId;
  let expoToken;
  
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }


  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      Alert.alert(
          'Permissões de Notificação',
          'Para receber notificações, por favor, ative as permissões de notificação nas configurações do seu dispositivo.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Ir para Configurações',
              onPress: () => Linking.openSettings(),
            },
          ]
      );
  
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      
      return;   
    } else {
      token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId
          //projectId: 'f8e7bd7c-b905-4daa-987d-e262acfbbe97',
      });
      console.log(token.data);
    }   
   
  } else {
    alert('Must use physical device for Push Notifications');
  }

  userId = auth?.user?.id;
  expoToken = token?.data;
  console.log('Auth:', auth);
  console.log('User ID:', userId);
  console.log('Token:', expoToken);

  if (userId && token) {
    console.log('Enviando token e userId para o servidor...');

    const data = {
      userId,
      "token": expoToken
    }

    try {
      const response = await axios.post(`http://137.184.117.63/api/usuario/device_token`, data, {
        headers: { Authorization: `Bearer ${auth?.access_token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      console.log('REQUEST ERROR:', error);
    }

  }

}
