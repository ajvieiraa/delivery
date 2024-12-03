import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';

import colors from '../../assets/colors';

import { UsuarioTipo } from '../../services/api';

import { useAuth } from '../../store/auth';
import { Payment } from '../../store/order';

import CashPayment, { CashPaymentHandlers } from '../CashPayment';
import CreditCard, { CreditCardHandlers } from '../CreditCard';
import PdvPayment, { PdvPaymentHandlers } from '../PdvPayment';

import { Container, Expandable, ExpandableText, Icon } from './styles';

export type PaymentSelectorHandlers = {
  get(): Payment | { tipo?: string } | void;
  isValid(): boolean;
};


const alert = (message: string) =>
  Alert.alert('Aviso', message, undefined, { cancelable: true });

const PaymentSelector: React.ForwardRefRenderFunction<
  PaymentSelectorHandlers,
  any
> = (_, ref) => {
  const { auth } = useAuth();

  const [method, setMethod] = useState<'online' | 'on_delivery'>('on_delivery');

  const pdv = useRef<PdvPaymentHandlers>(null);
  const creditCard = useRef<CreditCardHandlers>(null);
  const cash = useRef<CashPaymentHandlers>(null);

  const get = useCallback(() => {
    if (auth?.user.tipo === UsuarioTipo['PONTO DE VENDA'])
      return pdv.current?.get();

    if (!method) return alert('Por favor, selecione o método de pagamento.');

    const data =
      method === 'on_delivery'
        ? cash.current?.get()
        : creditCard.current?.get();

    if (!data) return;

    return {
      method,
      data,
    };
  }, [auth, method]);


  useImperativeHandle(ref, () => ({ get }));

  if (auth?.user.tipo === UsuarioTipo['PONTO DE VENDA'])
    return (
      <Container>
        <PdvPayment ref={pdv} />
      </Container>
    );

  return (
    <Container>
      <Expandable onPress={() => setMethod('on_delivery')}>
        <Icon name="attach-money" size={24} color={colors.muted} />
        <ExpandableText isSelected={method === 'on_delivery' && true}>Pagar na entrega/retirada</ExpandableText>
      </Expandable>

      {method === 'on_delivery' && <CashPayment ref={cash} />}

      <Expandable onPress={() => setMethod('online')}>
        <Icon name="credit-card" size={24} color={colors.muted} />
        <ExpandableText isSelected={method === 'online' && true}>Pagar no App</ExpandableText>
      </Expandable>

      {method === 'online' && <CreditCard ref={creditCard} />}
    </Container>
  );
};

export default forwardRef(PaymentSelector);
