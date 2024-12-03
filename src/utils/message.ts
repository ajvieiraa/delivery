import FlashMessage, {
  FlashMessageProps,
  MessageOptions,
  showMessage as flashMessage,
} from 'react-native-flash-message';

import colors from '../assets/colors';

export const FLASH_MESSAGE_PROPS: FlashMessageProps = {
  duration: 2000,
  backgroundColor: colors.primary,
  color: colors.in_primary,
  position: 'bottom',
  titleStyle: { fontFamily: 'Nunito_600SemiBold' },
  textStyle: { fontFamily: 'Nunito_400Regular' },
  floating: true,
  style: { borderRadius: 30 },
};

export function showMessage (
  message: string,
  duration?: number,
  ref?: React.RefObject<FlashMessage>,
) {
  const options: MessageOptions = {
    message: message,
    type: 'info',
    icon: 'info',
    backgroundColor: colors.primary,
    duration: duration || 2000,
  };

  if (ref) {
    ref.current?.showMessage(options);
  } else {
    flashMessage(options);
  }
}

export function showError (
  message: string,
  duration?: number,
  ref?: React.RefObject<FlashMessage>,
) {
  const options: MessageOptions = {
    message: message,
    type: 'danger',
    icon: 'danger',
    backgroundColor: colors.danger,
    duration: duration || 2000,
  };

  if (ref) {
    ref.current?.showMessage(options);
  } else {
    flashMessage(options);
  }
}
