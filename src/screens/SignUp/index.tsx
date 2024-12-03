import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import WrappedScroll from '../../components/WrappedScroll';

import api from '../../services/api';

import { showError, showMessage } from '../../utils/message';

import pattern from '../../utils/pattern';

import { FormContainer } from './styles';

type FormData = {
  firstname: string;
  lastname: string;
  // phone: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      setLoading(true);

      const response = await api.post('/usuario', {
        name: `${data.firstname} ${data.lastname}`,
        email: data.email,
        password: data.password,
        tipo: 'Cliente',
      });

      showMessage(response.data.message);
      navigate('SignIn', { email: data.email });
    } catch (err) {
      showError('Ocorreu um erro ao realizar o cadastro.');
      setLoading(false);
    }
  }, [navigate]);

  return (
    <WrappedScroll keyboardShouldPersistTaps="handled">
      <FormContainer>
        <Input
          label="Nome"
          name="firstname"
          rules={{
            required: { message: 'Por favor, digite o nome.', value: true },
            minLength: {
              message: 'Por favor, digite um nome válido',
              value: 2,
            },
          }}
          control={control}
          inputProps={{
            textContentType: 'givenName',
          }}
          error={formState.errors?.firstname}
        />

        <Input
          label="Sobrenome"
          name="lastname"
          rules={{
            required: {
              message: 'Por favor, digite o sobrenome.',
              value: true,
            },
            minLength: {
              message: 'Por favor, digite um sobrenome válido.',
              value: 2,
            },
          }}
          control={control}
          inputProps={{
            textContentType: 'familyName',
          }}
          error={formState.errors?.lastname}
        />

        <Input
          label="E-mail"
          name="email"
          rules={{
            required: { message: 'Por favor, digite o e-mail', value: true },
            pattern: {
              message: 'Por favor, utilize um e-mail válido.',
              value: pattern.email,
            },
          }}
          control={control}
          inputProps={{
            keyboardType: 'email-address',
            autoCompleteType: 'email',
            textContentType: 'emailAddress',
          }}
          error={formState.errors?.email}
        />

        <Input
          label="Senha"
          name="password"
          rules={{
            required: { message: 'Por favor, digite a senha.', value: true },
            pattern: {
              message:
                'A senha deve conter no mínimo 8 caracteres, sendo pelo menos uma letra e um número.',
              value: pattern.password,
            },
          }}
          control={control}
          inputProps={{
            autoCompleteType: 'password',
            textContentType: 'password',
            secureTextEntry: true,
          }}
          error={formState.errors?.password}
        />

        {/* <MaskedInput
          label="Celular"
          name="phone"
          rules={{
            required: {
              message: 'Por favor, digite número de celular.',
              value: true,
            },
            minLength: {
              message: 'Por favor, digite um número de celular válido.',
              value: 11,
            },
            maxLength: {
              message: 'Por favor, digite um número de celular válido.',
              value: 11,
            },
          }}
          control={control}
          inputProps={{
            autoCompleteType: 'tel',
            textContentType: 'telephoneNumber',
            keyboardType: 'phone-pad',
            secureTextEntry: true,
          }}
          maskType="cel-phone"
          maskOptions={{ maskType: 'BRL', withDDD: true }}
          error={formState.errors?.phone}
        /> */}
      </FormContainer>

      <Button
        enabled={formState.isValid}
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      >
        CADASTRAR
      </Button>
    </WrappedScroll>
  );
};

export default SignUp;
