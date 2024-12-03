import React from 'react';

import { Container, Label } from './styles';

interface Props {
  onPress?: () => void;
}

const HeaderRightText: React.FC<Props> = ({ children, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Label numberOfLines={1}>{children}</Label>
    </Container>
  );
};

export default HeaderRightText;
