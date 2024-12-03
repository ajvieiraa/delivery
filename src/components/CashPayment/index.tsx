import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { AnyObject } from 'yup/lib/types';

import { OnDelivery, useOrder } from '../../store/order';

import CheckBox from '../CheckBox';
import MaskedInput from '../MaskedInput';
import RadioButton from '../RadioButton';
import Spacer from '../Spacer';

import { Container, Row, Text } from './styles';

export type CashPaymentHandlers = {
  get(): OnDelivery | void;
  getChangeFor(): void;
};

const alert = (message: string) =>
  Alert.alert('Aviso', message, undefined, { cancelable: true });

const CashPayment: React.ForwardRefRenderFunction<
  CashPaymentHandlers,
  AnyObject
> = (_, ref) => {
  const { order } = useOrder();
  const ORDER_TOTAL = order?.total_price ?? 0;

  const validationSchema = Yup.object().shape({
    money: Yup.boolean(),
    card: Yup.boolean(),
    change_for: Yup.number()
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' || isNaN(Number(originalValue))
          ? null
          : value;
      })
      .when('money', {
        is: true,
        then: (schema) =>
          schema
            .required('Por favor, informe o valor para o troco.')
            .min(
              ORDER_TOTAL,
              `O valor do pagamento deve ser maior que R$ ${ORDER_TOTAL.toFixed(2)}.`
            ),
        otherwise: (schema) => schema.nullable(),
      }),
  });
  

  const { control, getValues, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      money: false,
      card: false,
      change_for: undefined,
    },
    mode: 'onChange',
  });


  const [noChange, setNoChange] = useState(false);

  const [method, setMethod] = useState<'money' | 'card'>();

  const get = useCallback((): OnDelivery | void => {
    const data = getValues();

    if (!method)
      return alert('Por favor, informe se pagará em dinheiro ou cartão.');

    if (method === 'money' && !data.change_for && !noChange)
      return alert('Por favor, preencha as informações sobre o troco.');

    const typename = 'onDelivery' as const;

    return {
      typename,
      no_change: noChange,
      card: method === 'card',
      change_for: data.change_for,
    };
  }, [getValues, method, noChange]);

  useImperativeHandle(ref, () => ({ get, getChangeFor: () => getValues().change_for, }));

  return (
    <Container>
      <Row>
        <Spacer width={0.6} />
        <RadioButton
          control={control}
          name="card"
          label="Cartão de débito ou crédito"
          noUncheck
          defaultValue={method === 'card'}
          onChange={(value) => value && setMethod('card')}
        />
      </Row>

      <Row>
        <Spacer width={0.6} />
        <RadioButton
          control={control}
          name="money"
          label="Dinheiro"
          noUncheck
          defaultValue={method === 'money'}
          onChange={(value) => value && setMethod('money')}
        />
      </Row>

      {!noChange && method === 'money' && (
        <>
          <MaskedInput
            maskType="money"
            maskOptions={{ maskType: 'BRL', unit: 'R$ ' }}
            control={control}
            name="change_for"
            inputProps={{ placeholder: 'Precisa de troco para quanto?' }}
          />
          {errors.change_for && (
              <Text style={{ color: 'red', marginBottom: 15, marginTop: -15 }}>
                {errors.change_for.message}
              </Text>
          )}
        </>
      )}

      {method === 'money' && (
        <Row>
          <CheckBox control={control} name="no_change" onChange={setNoChange} />
          <Text>Não preciso de troco.</Text>
        </Row>
      )}
    </Container>
  );
};

export default forwardRef(CashPayment);
