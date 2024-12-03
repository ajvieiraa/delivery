import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../assets/colors';

import { Container, Button } from './styles';

const HeaderLeftButton: React.FC<StackHeaderLeftButtonProps> = ({
  onPress,
}) => {
  return (
    <Container>
      <Button onPress={onPress}>
        <MaterialIcons name="menu" size={38} color={colors.regular} />
      </Button>
    </Container>
  );
};

export default HeaderLeftButton;
