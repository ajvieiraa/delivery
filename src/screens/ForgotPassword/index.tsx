import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Keyboard, TouchableOpacity } from 'react-native';

import colors from '../../assets/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import Spacer from '../../components/Spacer';
import WrappedScroll from '../../components/WrappedScroll';
import { Response } from '../../services/api';
import { useLazyRequest } from '../../services/api/store';
import { showError, showMessage } from '../../utils/message';
import pattern from '../../utils/pattern';
import rem from '../../utils/rem';

import { Center, Description, ErrorText, LinkButton, Title } from './styles';
import { TextInput } from '../../components/Input/styles';

interface RequestEmailData {
  email: string;
}

interface SendCodeData {
  code: string;
  email: string;
}

interface ResetPasswordData {
  code: string;
  email: string;
  new_password: string;
  new_password_confirmation: string;
}

const ForgotPassword: React.FC = () => {
  const { control } = useForm();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [codeError, setCodeError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [showIcon, setShowIcon] = useState(true);

  const { goBack } = useNavigation();

  const [requestEmail, { loading: requesting }] = useLazyRequest<
    Response<never>,
    RequestEmailData
  >('/auth/forgot_password', {
    data: { email },
    method: 'post',
    onComplete (result) {
      if (result.message) showMessage(result.message);
      setSent(true);
    },
    onError (error) {
      if (error.response?.data.message) showError(error.response.data.message);
      else showError(error.message);
    },
  });

  const [sendCode, { loading: sending }] = useLazyRequest<
    Response<never>,
    SendCodeData
  >('/auth/check_code', {
    data: { code, email },
    method: 'post',
    onComplete (result) {
      if (result.success) setValid(true);
    },
    onError (error) {
      setCodeError(error.response?.data.message);
      setValid(false);
    },
  });

  const [resetPassword, { loading: reseting }] = useLazyRequest<
    Response<never>,
    ResetPasswordData
  >('/auth/reset_password', {
    data: {
      code,
      email,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    },
    method: 'post',
    onComplete (result) {
      if (result.message) showMessage(result.message);
      if (result.success) goBack();
    },
    onError (error) {
      setPasswordError(error.response?.data.message);
    },
  });

  function handleSubmit (alreadyHasCode?: boolean) {
    if (!sent) {
      if (email.length === 0)
        return showError('Por favor, informe o endereço de e-mail.');

      if (!pattern.email.test(email))
        return showError('Por favor, informe um e-mail válido.');

      if (!alreadyHasCode) requestEmail();
      else setSent(true);
    } else if (sent && !valid) {
      if (code.length < 6) return showError('O código deve ter 6 digitos.');

      sendCode();
    } else if (sent && valid) {
      console.log(newPassword);
      if (newPassword.length < 8)
        return setPasswordError('A senha deve conter pelo menos 8 caracteres.');

      if (newPassword !== newPasswordConfirmation)
        return setPasswordError('A confirmação de senha não confere.');

      resetPassword();
    }
    Keyboard.dismiss();
  }

  function codeReciver (option: Boolean) {
    if(option){
      setSent(option);
    }
  }

  useEffect(() => {
    setPasswordError(undefined);
  }, [newPassword, newPasswordConfirmation]);

  return (
    <WrappedScroll>
      <Title>Esqueceu sua senha?</Title>

      <Center>
        <Ionicons
          name="md-lock-closed"
          size={rem(showIcon ? 18 : 5)}
          color={colors.regular}
        />
      </Center>

      {!sent && (
        <>
          <Description>
            Não se preocupe!{'\n'}Digite o seu e-mail abaixo e enviaremos um
            código de recuperação para você.
          </Description>

          <TextInput
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={(text) => {
              console.log('Texto digitado:', text);
              setEmail(text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Spacer height={1} />

          <Button onPress={handleSubmit} loading={requesting}>
            Enviar
          </Button>

          <TouchableOpacity>
            <LinkButton onPress={() => codeReciver(true)}>
              Já tenho um código
            </LinkButton>
          </TouchableOpacity>
        </>
      )}

      {sent && !valid && (
        <>
          <Description>
            Digite abaixo o código que enviamos em seu e-mail.
          </Description>

          <MaskedInput
            control={control}
            name="code"
            maskType="only-numbers"
            inputProps={{
              placeholder: 'Digite o código',
              onFocus: () => setShowIcon(false),
              onBlur: () => setShowIcon(true),
              onChangeText: (text) => {
                setCode(text);
                setCodeError(undefined);
              },
              keyboardType: 'decimal-pad',
              autoCompleteType: 'off',
              autoCapitalize: 'none',
              textAlign: 'center',
              maxLength: 6,
            }}
            error={{ message: codeError }}
          />

          <Spacer height={1} />

          <Button onPress={handleSubmit} loading={sending}>
            Enviar
          </Button>

          <TouchableOpacity>
            <LinkButton onPress={() => setSent(false)}>
              Reenviar código
            </LinkButton>
          </TouchableOpacity>
        </>
      )}

      {valid && (
        <>
          <Description>Escolha sua nova senha!</Description>

          <TextInput
            placeholder="Digite sua nova senha"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setShowIcon(false); 
            }}
            onBlur={() => setShowIcon(true)}
            keyboardType="default"
            secureTextEntry={true}
            autoComplete="off"
            autoCapitalize="none"
            textContentType="newPassword"
          />

          <TextInput
            placeholder="Digite a senha novamente"
            value={newPasswordConfirmation}
            onChangeText={(text) => {
              setNewPasswordConfirmation(text);
              setShowIcon(false);
            }}
            onBlur={() => setShowIcon(true)} 
            keyboardType="default"
            secureTextEntry={true}
            autoComplete="off"
            autoCapitalize="none"
            textContentType="newPassword"
          />

          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <Spacer height={1} />

          <Button onPress={handleSubmit} loading={reseting}>
            Salvar
          </Button>
        </>
      )}
    </WrappedScroll>
  );
};

export default ForgotPassword;
