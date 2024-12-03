import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AnyObject } from 'yup/lib/types';
import colors from '../../assets/colors';

import { PaymentType } from '../../services/api';

import { useOrder } from '../../store/order';
import copy from '../../utils/copy';

import CheckBox from '../CheckBox';

import {
  Title,
  Container,
  Row,
  SubTitle,
  CopyButton,
  CopyButtonContainer,
} from './styles';

export type PdvPaymentHandlers = {
  get(): { tipo?: string };
};

const PdvPayment: React.ForwardRefRenderFunction<
  PdvPaymentHandlers,
  AnyObject
> = (_, ref) => {
  const { control } = useForm();

  const {
    paymentTypes,
    order: { fornecedor },
  } = useOrder();

  const [method, setMethod] = useState<string>();

  const get = useCallback(() => {
    return { tipo: method };
  }, [method]);

  useImperativeHandle(ref, () => ({ get }));

  const isPix = (type?: PaymentType) =>
    type?.name.toLowerCase().includes('pix');

  const pixKey = fornecedor?.account?.chave_pix;

  return (
    <Container>
      {paymentTypes?.map((type) => (
        <View key={type.id.toString()}>
          <Row>
            <CheckBox
              name={type.name}
              control={control}
              value={method === type.name}
              onChange={() => setMethod(type.name)}
              allowUncheck={false}
            />
            <Title>{type.name}</Title>
          </Row>

          {isPix(type) && !!pixKey && method === type.name && (
            <View>
              <SubTitle selectable selectionColor={colors.primary_transparent}>
                Chave: {pixKey}
              </SubTitle>
              <CopyButtonContainer onPress={() => copy(pixKey)}>
                <CopyButton>Copiar</CopyButton>
              </CopyButtonContainer>
            </View>
          )}
        </View>
      ))}

      {paymentTypes?.length === 0 && (
        <>
          <Row>
            <CheckBox
              name="boleto"
              control={control}
              value={method === 'Boleto'}
              onChange={() => setMethod('Boleto')}
              allowUncheck={false}
            />
            <Title>Boleto</Title>
          </Row>

          <Row>
            <CheckBox
              name="dinheiro"
              control={control}
              value={method === 'Dinheiro'}
              onChange={() => setMethod('Dinheiro')}
              allowUncheck={false}
            />
            <Title>Dinheiro</Title>
          </Row>

          <Row>
            <CheckBox
              name="ted"
              control={control}
              value={method === 'TED'}
              onChange={() => setMethod('TED')}
              allowUncheck={false}
            />
            <Title>TED</Title>
          </Row>

          <Row>
            <CheckBox
              name="credito"
              control={control}
              value={method === 'Credito'}
              onChange={() => setMethod('Credito')}
              allowUncheck={false}
            />
            <Title>Cartão de crédito</Title>
          </Row>

          <Row>
            <CheckBox
              name="debito"
              control={control}
              value={method === 'Debito'}
              onChange={() => setMethod('Debito')}
              allowUncheck={false}
            />
            <Title>Cartão de débito</Title>
          </Row>

          <Row>
            <CheckBox
              name="pix"
              control={control}
              value={method === 'Pix'}
              onChange={() => setMethod('Pix')}
              allowUncheck={false}
            />
            <Title>PIX</Title>
          </Row>
        </>
      )}

      {/*
    {method === PagamentoTipo.CREDITO && <CreditCard ref={creditCard} />} */}
    </Container>
  );
};

export default forwardRef(PdvPayment);
