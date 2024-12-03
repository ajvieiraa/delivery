import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  NavigationContainerRefWithCurrent,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Linking } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import pattern from '../../utils/pattern';

import {
  ButtonsContainer,
  Logo,
  LogoContainer,
  Touchable,
  TouchableText,
} from './styles';

import WrappedScroll from '../../components/WrappedScroll';
import api, { LoginResponse } from '../../services/api';
import { useAuth } from '../../store/auth';
import { showError } from '../../utils/message';
import { statusBarHeight } from '../../utils/platform';
import DeleteAccount from '../../components/DeleteAccount';
import usePushNotification from '../../services/notifications/usePushNotification';

type FormData = {
  email: string;
  password: string;
};

type RouteProps = RouteProp<
  { params?: { email: string } } & ParamListBase,
  'params'
>;

const SignIn: React.FC = () => {
  const { params } = useRoute<RouteProps>();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm({
    reValidateMode: 'onChange',
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const { navigate } = useNavigation<any>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);

        const response = await api.post('/auth/login', data);
        const auth = response.data as LoginResponse;

        await login(auth);

        navigate('AuthRoutes');
      } catch (err) {
        setLoading(false);
        showError('E-mail ou senha incorretos.');
      }
    },
    [login, navigate],
  );

  return (
    <WrappedScroll
      keyboardShouldPersistTaps="handled"
      keyboardVerticalOffset={statusBarHeight}
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>

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
          autoCompleteType: 'email',
          textContentType: 'emailAddress',
          autoCapitalize: 'none',
        }}
        error={formState.errors?.email}
        defaultValue={params?.email}
      />

      <Input
        label="Senha"
        name="password"
        rules={{
          required: { message: 'Por favor, digite a senha.', value: true },
        }}
        control={control}
        inputProps={{
          autoCompleteType: 'password',
          textContentType: 'password',
          secureTextEntry: true,
        }}
        error={formState.errors?.password}
      />

      <Button
        enabled={formState.isValid}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      >
        ACESSAR
      </Button>

      <ButtonsContainer>
        <Touchable onPress={() => navigate('SignUp')}>
          <TouchableText>CADASTRE-SE</TouchableText>
        </Touchable>
        <Touchable onPress={() => navigate('ForgotPassword')}>
          <TouchableText>ESQUECI A SENHA</TouchableText>
        </Touchable>
      </ButtonsContainer>
    </WrappedScroll>
  );
};

export default SignIn;
