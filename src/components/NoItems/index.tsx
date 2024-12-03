import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Button from '../Button';

import { Text } from './styles';

type Props = {
  items?: any[] | null;
  children: string;
  noButton?: boolean;
};

const NoItems: React.FC<Props> = ({ items, children, noButton }) => {
  const { goBack, canGoBack } = useNavigation();

  if (!items || items.length > 0) return null;

  return (
    <>
      <Text>{children}</Text>
      {!noButton && (
        <Button onPress={() => canGoBack() && goBack()}>VOLTAR</Button>
      )}
    </>
  );
};

export default NoItems;
