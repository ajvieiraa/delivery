import React from 'react';
import colors from '../../assets/colors';

import { EmpresaListItem } from '../../services/api';
import Spacer from '../Spacer';

import { CardButton, Container, Header, Label, Name, Value } from './styles';

type Props = {
  onPress: (id: number) => void;
};

const SupplierCard: React.FC<EmpresaListItem & Props> = ({
  id,
  nome,
  prazo_entrega,
  valor_minimo_pedido,
  aberto,
  onPress,
}) => {
  return (
    <Container>
      <CardButton onPress={() => onPress(id)}>
        <Header>
          <Name>{nome}</Name>
          <Value style={{ color: aberto ? colors.open : colors.closed }}>
            {aberto ? 'Aberto' : 'Fechado'}
          </Value>
        </Header>

        <Label>Prazo de entrega</Label>
        <Value>{prazo_entrega}</Value>

        <Label>Valor mínimo de pedido</Label>
        <Value>R$ {valor_minimo_pedido}</Value>

        <Spacer height={1.6} />
      </CardButton>
    </Container>
  );
};

export default SupplierCard;
