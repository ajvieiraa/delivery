import React from 'react';
import { Platform } from 'react-native';

// Importação dos componentes específicos
import SelectAndroid from './SelectAndroid';
import SelectIOS from './SelectIOS';

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  error?: string;
  value?: string;
  onChange?: (option: { label: string; value: any }) => void;
}

const Select: React.FC<Props> = (props) => {
  if (Platform.OS === 'ios') {
    return <SelectIOS {...props} />;
  }
  return <SelectAndroid {...props} />;
};

export default Select;
