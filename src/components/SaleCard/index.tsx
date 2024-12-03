import React, { memo } from 'react';

import colors from '../../assets/colors';
import {
  DeliveryFeeLabel,
  DeliveryFeeRow,
  DeliveryFeeValue,
} from '../../screens/MyOrders/styles';

import { Venda } from '../../services/api';

import { parseAndDisplay } from '../../utils/date';
import money from '../../utils/money';

import {
  Card,
  Row,
  Left,
  Supplier,
  Created,
  StatusLabel,
  List,
  Product,
  ProductTotal,
  TotalLabel,
  TotalValue,
  MessageContainer,
  Message,
  Label,
  SubTitle,
  Value,
  ProductContainer,
} from './styles';

interface Props {
  order: Venda;
  onPress?: (order: Venda) => void;
  hideInfo?: boolean;
}

const SaleCard: React.FC<Props> = ({ order, onPress, hideInfo }) => {
  if (!order || !order.id) return null;

  return (
    <Card key={order.id} onPress={() => onPress?.(order)} disabled={!onPress}>
      <Row>
        <Left>
          <Supplier>Pedido nº {order.id.toString()}</Supplier>
          <Created>Realizado em: {parseAndDisplay(order.created_at)}</Created>
        </Left>

        <StatusLabel style={{ color: colors[order.status] }}>
          {order.status}
        </StatusLabel>
      </Row>

      <List>
          {order.produtos.map((product) => (
            <ProductContainer key={`product-${product.id}`}>
              <Row>
                <Product>
                  {`${product.quantidade.toString().padStart(2, '0')}x - ${product.nome.toUpperCase()}`}
                </Product>
              </Row>
              <Row>
                <Product>
                  {`Unitário: R$ ${product.valor_unitario.toFixed(2)} - Total: R$ ${product.valor_total.toFixed(2)}`}
                </Product>
              </Row>
            </ProductContainer>
        ))}
      </List>

      {order.taxa_entrega ? (
        <>
          <DeliveryFeeRow>
            <DeliveryFeeLabel>TAXA DE ENTREGA</DeliveryFeeLabel>
            <DeliveryFeeValue>R$ {money(order.taxa_entrega)}</DeliveryFeeValue>
          </DeliveryFeeRow>

          <Row>
            <TotalLabel>TOTAL</TotalLabel>
            <TotalValue>R$ {money(order.total)}</TotalValue>
          </Row>

          {!hideInfo && (
            <>
              {!!order.pagamento && (
                <>
                  <SubTitle>Forma de pagamento</SubTitle>
                  <Value>
                    {order.pagamento === 'on_delivery'
                      ? 'Dinheiro ou cartão (na entrega)'
                      : order.pagamento}
                  </Value>
                </>
              )}

              {!!order.troco_para && (
                <>
                  <SubTitle>Troco para</SubTitle>
                  <Value>R$ {money(order.troco_para)}</Value>
                </>
              )}

              <SubTitle>Endereço de entrega</SubTitle>
              <Value>{order.endereco}</Value>

              {!!order.observacao && (
                <MessageContainer>
                  <SubTitle>Informações para o entregador</SubTitle>
                  <Message>{order.observacao}</Message>
                </MessageContainer>
              )}

              <SubTitle>Responsável</SubTitle>
              <Value>{order.responsavel}</Value>

              <SubTitle>Telefone</SubTitle>
              <Value>{order.telefone?.toString()}</Value>
            </>
          )}
        </>
      ) : (
        <>
          <Row>
            <TotalLabel>TOTAL</TotalLabel>
            <TotalValue>R$ {money(order.total)}</TotalValue>
          </Row>

          {!hideInfo && (
            <>
              {!!order.pagamento && (
                <>
                  <SubTitle>Forma de pagamento</SubTitle>
                  <Value>
                    {order.pagamento === 'on_delivery'
                      ? 'Dinheiro ou cartão (na entrega)'
                      : order.pagamento}
                  </Value>
                </>
              )}

              {!!order.troco_para && (
                <>
                  <SubTitle>Troco para</SubTitle>
                  <Value>R$ {money(order.troco_para)}</Value>
                </>
              )}

              <SubTitle>Endereço</SubTitle>
              <Value>{order.endereco}</Value>

              <SubTitle>Responsável</SubTitle>
              <Value>{order.responsavel}</Value>

              <SubTitle>Telefone</SubTitle>
              <Value>{order.telefone?.toString()}</Value>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default memo(SaleCard);
