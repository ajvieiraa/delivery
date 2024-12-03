import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function rem (value: number) {
  if (width <= 340) return 7 * value;
  if (width > 340 && width <= 360) return 8 * value;
  return 10 * value;
}
