import React from 'react';

import Button from '../Button';

import { Error } from './styles';

type Props = {
  message: string;
  onPress(): void;
  buttonText?: string;
  visible?: boolean;
};

const LoadError: React.FC<Props> = ({
  visible,
  message,
  onPress,
  buttonText,
}) => {
  if (visible === false) return null;

  return (
    <>
      <Error>{message}</Error>
      <Button onPress={onPress}>{buttonText || 'Recarregar'}</Button>
    </>
  );
};

export default LoadError;
