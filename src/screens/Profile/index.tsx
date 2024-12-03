import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import * as yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import WrappedScroll from '../../components/WrappedScroll';

import { MeResponse, UpdateUserResponse } from '../../services/api';
import useRequest, { useLazyRequest } from '../../services/api/store/hook';

import { useAuth } from '../../store/auth';

import { showError, showMessage } from '../../utils/message';

import { ContentContainer, SubTitle } from './styles';
import DeleteAccount from '../../components/DeleteAccount';

interface FormData {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  email: yup
    .string()
    .email('E-mail inválido.')
    .required('E-mail é obrigatório.'),
  new_password: yup
    .string()
    .nullable()
    .when({
      is: (new_password: string) => new_password.length > 0,
      then: yup
        .string()
        .min(8, 'A nova senha deve conter pelo menos 8 caracteres.'),
      otherwise: yup.string().nullable(),
    }),
  current_password: yup.string().when('new_password', {
    is: (new_password: string) => new_password.length >= 8,
    then: yup
      .string()
      .required('Para alterar a senha é necessário informar sua senha atual.'),
    otherwise: yup.string().nullable(),
  }),
});

const Profile: React.FC = () => {
  const { update } = useAuth();
  const { data, loading } = useRequest<MeResponse>('/auth/me');

  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
  });

  const [
    updateUser,
    { loading: updating },
  ] = useLazyRequest<UpdateUserResponse>('/usuario', {
    method: 'PUT',
    onComplete (result) {
      if (result) update(result.data);
      if (result.message) showMessage(result.message);
      goBack();
    },
    onError: (err) => {
      const _errors = err.response?.data.data;

      if (Array.isArray(_errors)) {
        if (typeof _errors[0] === 'string') return showError(_errors[0]);
      }

      showError(err.response?.data.message || err.message);
    },
  });

  const onSubmit = useCallback(
    (formData: FormData) => {
      updateUser('/usuario', { data: formData });
    },
    [updateUser],
  );

  if (!data?.data) return <LoadingSpinner visible={loading} />;

  return (
    <WrappedScroll>
      <LoadingSpinner visible={updating} />

      <ContentContainer>
        <View>
          <SubTitle>Dados da conta</SubTitle>

          <Input
            control={control}
            name="name"
            defaultValue={data?.data?.name}
            label="Nome"
            error={errors.name}
          />
          <Input
            control={control}
            name="email"
            defaultValue={data?.data?.email}
            label="E-mail"
            error={errors.email}
          />

          <SubTitle>Alterar senha</SubTitle>

          <Input
            control={control}
            name="current_password"
            label="Senha atual"
            inputProps={{ secureTextEntry: true }}
            error={errors.current_password}
          />

          <Input
            control={control}
            name="new_password"
            label="Nova senha"
            inputProps={{ secureTextEntry: true }}
            error={errors.new_password}
          />
        </View>
      </ContentContainer>
      <View>
        <Button onPress={handleSubmit(onSubmit)}>Salvar alterações</Button>
      </View>
      <DeleteAccount />
    </WrappedScroll>
  );
};

export default Profile;
