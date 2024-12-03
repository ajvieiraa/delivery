import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Item as ItemT, useOrder } from '../../store/order';

import money from '../../utils/money';

import Address, { AddressHandlers } from '../Address';

import {
  Container,
  Deliver,
  DeliveryFeeContainer,
  DeliveryFeeLabel,
  DeliveryFeeValue,
  Item,
  ItemName,
  ItemPrice,
  Quantity,
  Total,
  TotalContainer,
} from './styles';
import { Expandable, ExpandableText, Icon } from '../PaymentSelector/styles';
import colors from '../../assets/colors';
import { View } from 'react-native';
import { Label, TextInput } from '../Input/styles';
import Input from '../Input';

type Props = {
  hideList?: boolean;
  shipping?: boolean;
};

export interface OrderInfoHandlers {
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
}

const OrderInfo: React.ForwardRefRenderFunction<OrderInfoHandlers, Props> = (
  { hideList, shipping = true },
  ref,
) => {
  const { order, setDelivery, setObservacao } = useOrder();

  const address = useRef<AddressHandlers>(null);

  const getPrice = useCallback((item: ItemT) => { // correção: utilizando replace para substituir as vírgulas por ponto, pois estava dando conflito no JS.
    const preco = parseFloat(item.preco.replace(',', '.'));
    const price = money(preco * item.quantidade);
    return `R$ ${price}`;
  }, []);

  const getName = useCallback((item: ItemT) => {
    const quantidade = `${item.quantidade}x`;
    const name = item.nome.toUpperCase();
    return `${quantidade} - ${name}`;
  }, []);

  
  const getTotal = useCallback(() => { 
    const { total_price, fornecedor, delivery } = order;
  
    let delivery_fee = delivery && fornecedor?.taxa_entrega ? fornecedor.taxa_entrega : 0;
  
    let subtotal = order.items.reduce((acc, item) => {
      const preco = parseFloat(item.preco.replace(',', '.'));
      return acc + (preco * item.quantidade); // Acumulando o preço vezes a quantidade do item
    }, 0);
  
    let total = subtotal + delivery_fee;
    return `Total: R$ ${total.toFixed(2)}`;
  }, [order]);
  
  useImperativeHandle(ref, () => ({ ...address.current }));

  const handleChangeInstructions = useCallback((text: string) => {
    setObservacao(text);
  }, [setObservacao]);
  

  const handleDeliverySelection = useCallback((value: boolean) => {
    setDelivery(value);
  }, [setDelivery]);

  return (
    <Container>
      {!hideList &&
        order.items.map((item) => (
          <Item key={item.id}>
            <ItemName>{getName(item)}</ItemName>
            <ItemPrice>{getPrice(item)}</ItemPrice>
          </Item>
        ))}

        <DeliveryFeeContainer>
          <DeliveryFeeLabel>Taxa de entrega</DeliveryFeeLabel>
          <DeliveryFeeValue>
            R$ {money(order.delivery ? order.fornecedor?.taxa_entrega || 0 : 0)}
          </DeliveryFeeValue>
        </DeliveryFeeContainer>

      <TotalContainer>
        <Quantity>
          {order.items_count} {order.items_count === 1 ? 'produto' : 'produtos'}
        </Quantity>
        <Total>{getTotal()}</Total>
      </TotalContainer>

      <View style={{ height: 18 }} />

      {shipping && (
        <>
          <Expandable onPress={() => handleDeliverySelection(false)}>
            <Icon name="store" size={24} color={colors.muted} />
            <ExpandableText isSelected={order.delivery === false && true}>Retirada em loja</ExpandableText>
          </Expandable>

          <Expandable onPress={() => handleDeliverySelection(true)}>
            <Icon name="delivery-dining" size={24} color={colors.muted} />
            <ExpandableText isSelected={order.delivery}>Entrega em casa</ExpandableText>
          </Expandable>

          {order.delivery && (
            <>
                <Label>Instruções para o entregador</Label>
                <TextInput
                  placeholder="Ex: O interfone está quebrado. Favor ligar ao chegar."
                  multiline
                  value={order.observacao}
                  onChangeText={handleChangeInstructions}
                  textAlignVertical="top"
                />                
              <Deliver>Entregar em</Deliver>
              <Address ref={address} />
            </>
          )}
      </>
    )}

    </Container>
  );
};

export default forwardRef(OrderInfo);

