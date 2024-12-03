import { Linking, Platform } from 'react-native';
import { showError } from './message';

export const sendMessageOnWhatsApp = (phoneNumber: string, message: string) => {
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;

  // Tentativa de abrir o WhatsApp com o link
  Linking.openURL(whatsappURL)
    .then((res) => {
      console.log('WhatsApp abriu com sucesso!');
    })
    .catch((err) => {
      showError('Erro ao abrir o WhatsApp: ' + err);
      console.error('Erro ao abrir o WhatsApp:', err);
    });
};
