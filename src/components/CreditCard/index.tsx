import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, TouchableOpacity } from 'react-native';
import { AnyObject } from 'yup/lib/types';

import { CreditCard as CreditCardT } from '../../store/order/index';

import Input from '../Input';
import MaskedInput from '../MaskedInput';

import { Column, Container, Row, LinkButton } from './styles';
import { Label } from '../Input/styles';
import { useAuth } from '../../store/auth';
import { useCep } from '../../services/cep';

export type CreditCardHandlers = {
  get(): CreditCardT | void;
};

const schema = yup.object().shape({
  numero_cartao: yup
    .string()
    .required('Preencha o número do cartão')
    .length(16, 'O número do cartão deve conter 16 dígitos'),
  cvv: yup
    .string()
    .required('Preencha o código de segurança')
    .length(3, 'O código de segurança deve conter 3 dígitos'),
  data_validade: yup.string().required('Preencha a data de validade'),
  nome_cartao: yup.string().required('Preencha o nome do titular'),
  cpf: yup.string().required('Preencha o CPF'),

  cep: yup.string().required('Preencha o CEP').min(8, 'Preencha o CEP'),
  logradouro: yup
    .string()
    .required('Preencha o logradouro')
    .min(2, 'Preencha o logradouro'),
  numero: yup
    .string()
    .required('Preencha o número')
    .min(1, 'Preencha o número'),
  bairro: yup
    .string()
    .required('Preencha o bairro')
    .min(2, 'Preencha o bairro'),
  cidade: yup
    .string()
    .required('Preencha a cidade')
    .min(2, 'Preencha a cidade'),
  uf: yup
    .string()
    .required('Preencha a sigla do estado')
    .length(2, 'Preencha a sigla do estado'),
});

interface FormData {
  numero_cartao: string;
  number: string;
  data_validade: string;
  nome_cartao: string;
  cpf: string;
  cvv: string;

  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;

  [key: string]: string;
}

export type CreditCardFormData = FormData;

const CreditCard: React.ForwardRefRenderFunction<
  CreditCardHandlers,
  AnyObject
> = (_, ref) => {
  const { cep, setCep, data: cepData } = useCep();
  const { address, location } = useAuth();

  const [defaultAddress, setDefaultAddress] = useState<
    typeof address & typeof location
  >();

  const { control, getValues, formState } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const get = useCallback(() => {
    if (Object.keys(formState.errors).length > 0) return undefined;

    const values = getValues();

    let hasError = false;

    Object.keys(values).forEach((key) => {
      if (values[key] === '' && key !== 'complemento') hasError = true;
    });

    if (hasError)
      return Alert.alert(
        'Aviso',
        'Por favor, preencha os dados do cartão e o endereço de cobrança.',
        undefined,
        { cancelable: true },
      );

    const data_validade = values.data_validade.split('/').join('/20');

    return {
      ...values,
      cep: values.cep.replace(/-/g, ' '),
      data_validade,
      typename: 'online',
    };
  }, [formState.errors, getValues]);

  useImperativeHandle(ref, () => ({ get }));

  return (
    <Container>
      <Label>Dados do Cartão</Label>

      <MaskedInput
        control={control}
        name="numero_cartao"
        maskType="credit-card"
        inputProps={{ placeholder: 'Número do cartão de crédito' }}
        error={formState.errors.numero_cartao}
      />

      <Row>
        <Column>
          <MaskedInput
            control={control}
            name="data_validade"
            maskType="custom"
            maskOptions={{ mask: '99/99' }}
            inputProps={{ placeholder: 'Validade' }}
            error={formState.errors.data_validade}
          />
        </Column>
        <Column>
          <MaskedInput
            control={control}
            name="cvv"
            maskType="only-numbers"
            inputProps={{ placeholder: 'CVV', maxLength: 3 }}
            error={formState.errors.cvv}
          />
        </Column>
      </Row>

      <Input
        control={control}
        name="nome_cartao"
        label="Nome do Titular"
        inputProps={{ placeholder: '' }}
        error={formState.errors.nome_cartao}
      />

      <MaskedInput
        control={control}
        name="cpf"
        maskType="cpf"
        inputProps={{ placeholder: 'CPF' }}
        error={formState.errors.cpf}
      />

      <Label>Endereço de cobrança</Label>

      <TouchableOpacity>
        <LinkButton
          onPress={() =>
            setDefaultAddress({
              logradouro: '',
              bairro: '',
              numero: '',
              ...address,
              ...location,
            })
          }
        >
          Copiar endereço de entrega
        </LinkButton>
      </TouchableOpacity>

      <Input
        control={control}
        name="cep"
        label="CEP"
        error={formState.errors.cep}
        inputProps={{
          onChangeText: setCep,
          maxLength: 8,
          keyboardType: 'number-pad',
          autoCompleteType: 'postal-code',
          textContentType: 'postalCode',
        }}
      />

      <Input
        control={control}
        name="logradouro"
        label="Logradouro"
        error={formState.errors.logradouro}
        defaultValue={cepData.logradouro || defaultAddress?.logradouro}
      />

      <Input
        control={control}
        name="numero"
        label="Número"
        error={formState.errors.numero}
        defaultValue={defaultAddress?.numero}
      />

      <Input
        control={control}
        name="bairro"
        label="Bairro"
        error={formState.errors.bairro}
        defaultValue={cepData.bairro || defaultAddress?.bairro}
      />

      <Input
        control={control}
        name="complemento"
        label="Complemento"
        error={formState.errors.complemento}
        defaultValue={defaultAddress?.complemento}
      />

      <Input
        control={control}
        name="cidade"
        label="Cidade"
        error={formState.errors.cidade}
        defaultValue={cepData.localidade || defaultAddress?.city?.nome}
      />

      <Input
        control={control}
        name="uf"
        label="UF"
        error={formState.errors.uf}
        defaultValue={cepData.uf || defaultAddress?.state?.uf}
        inputProps={{ maxLength: 2, autoCapitalize: 'characters' }}
      />
    </Container>
  );
};

export default forwardRef(CreditCard);
