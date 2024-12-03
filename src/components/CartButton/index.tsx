import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import { getItems, useOrder } from '../../store/order';

import Button from '../Button';

const CartButton: React.FC = () => {
  const { order } = useOrder();
  const { navigate } = useNavigation<any>();

  const handlePress = useCallback(() => {
    navigate('Cart');
  }, [navigate]);

  if (order.items_count === 0) return null;

  return (
    <View>
      <Button theme="secondary" onPress={handlePress}>
        {getItems(order.items_count)}
      </Button>
    </View>
  );
};

export default CartButton;
