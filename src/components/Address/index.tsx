import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { AnyObject } from 'yup/lib/types';

import colors from '../../assets/colors';
import { Endereco } from '../../services/api';

import { useAuth } from '../../store/auth';

import { showMessage } from '../../utils/message';

import Button from '../Button';
import FullModal from '../FullModal';
import Input from '../Input';

import {
  Container,
  IconContainer,
  Row,
  Text,
  Location,
  LocationLabel,
  ButtonContainer,
  ModalContentContainer,
} from './styles';

export interface AddressHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const schema = yup.object({
  logradouro: yup.string().required('Por favor, informe o logradouro.'),
  numero: yup.string().required('Por favor, informe o número.'),
  bairro: yup.string().required('Por favor, informe o nome do bairro.'),
  complemento: yup.string(),
});

const Address: React.ForwardRefRenderFunction<AddressHandlers, AnyObject> = (
  _,
  ref,
) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Endereco>({
    resolver: yupResolver(schema),
  });

  const { address, registerAddress, location } = useAuth();
  const [visible, setVisible] = useState(false);

  const onSubmit = useCallback(
    (data: Endereco) => {
      registerAddress(data);
      //console.log(data);
      showMessage('Endereço atualizado!');
      setVisible(false);
    },
    [registerAddress],
  );

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible((cur) => !cur);
  }, []);

  useImperativeHandle(ref, () => ({ open, close, toggle }));

  return (
    <Container>
      <FullModal
        title="Editar endereço"
        visible={visible}
        setVisible={setVisible}
      >
        <ModalContentContainer>
          <View>
            <Input
              control={control}
              name="logradouro"
              label="Logradouro (rua, avenida, etc.)"
              inputProps={{
                selectTextOnFocus: true,
              }}
              error={errors.logradouro}
              defaultValue={address?.logradouro}
            />

            <Input
              control={control}
              name="numero"
              label="Número"
              inputProps={{
                selectTextOnFocus: true,
              }}
              error={errors.numero}
              defaultValue={address?.numero}
            />

            <Input
              control={control}
              name="bairro"
              label="Bairro"
              inputProps={{
                selectTextOnFocus: true,
              }}
              error={errors.bairro}
              defaultValue={address?.bairro}
            />

            <Input
              control={control}
              name="complemento"
              label="Complemento"
              inputProps={{
                selectTextOnFocus: true,
              }}
              error={errors.complemento}
              defaultValue={address?.complemento}
            />
          </View>

          <ButtonContainer>
            <LocationLabel>Local selecionado</LocationLabel>
            <Location>{`${location?.city?.nome}, ${location?.state?.uf}`}</Location>
            <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
          </ButtonContainer>
        </ModalContentContainer>
      </FullModal>

      <Row onPress={() => setVisible(true)}>
        {address && typeof address === 'object' && (
          <Text numberOfLines={1}>
            {`${address.logradouro}, ${address.numero}, ${address.bairro}${
              address.complemento ? `, ${address.complemento}` : ''
            } - ${location?.city?.nome}, ${location?.state?.uf}`}
          </Text>
        )}

        {(!address || typeof address === 'string') && (
          <Text numberOfLines={1}>Toque aqui para definir o endereço</Text>
        )}

        <IconContainer>
          <Feather name="edit" size={16} color={colors.regular} />
        </IconContainer>
      </Row>
    </Container>
  );
};

export default forwardRef(Address);

