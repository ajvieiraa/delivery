import Clipboard from 'expo-clipboard';
import { showMessage } from './message';

const copy = (text?: string) => {
  if (!text) return;

  Clipboard.setString(text);
  showMessage('Copiado!')
};

export default copy;
