import { KeyboardAvoidingViewProps, Platform } from 'react-native';
import Constants from 'expo-constants';

const isIOS = Platform.OS === 'ios';

const { statusBarHeight } = Constants;

const iosHeaderHeight = 64;

const keyboardAvoidingViewProps: Pick<
  KeyboardAvoidingViewProps,
  'behavior' | 'keyboardVerticalOffset'
> = {
  behavior: Platform.select({ ios: 'padding' }),
  keyboardVerticalOffset: iosHeaderHeight,
};

export { isIOS, statusBarHeight, iosHeaderHeight, keyboardAvoidingViewProps };
