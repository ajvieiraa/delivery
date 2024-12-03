import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../assets/colors';

import Button from '../../components/Button';
import Input from '../../components/Input';
import OrderInfo from '../../components/OrderInfo';
import ProductList from '../../components/ProductList';

import { useOrder } from '../../store/order';
import money from '../../utils/money';
import { keyboardAvoidingViewProps } from '../../utils/platform';

import {
  Container,
  Empty,
  EmptyContainer,
  Footer,
  GoBack,
  Label,
} from './styles';
import { useAuth } from '../../store/auth';
import { useForm } from 'react-hook-form';
import { UsuarioTipo } from '../../services/api';
import PhoneInput from '../../components/PhoneInput';
import { showError } from '../../utils/message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  responsavel: yup.string().required('O nome do responsável é obrigatório.'),
  telefone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX')
    .required('O telefone é obrigatório.'),
});

const Cart: React.FC = () => {
  const { navigate, goBack } = useNavigation<any>();
  const { order, setObservacao, setTelefone, setResponsavel } = useOrder();
  const { isClient, auth, address } = useAuth();
  const { control, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      responsavel: auth?.user.tipo === UsuarioTipo.CLIENTE ? auth.user.name : '',
      telefone: '',
    },
  });

  const handlePress = useCallback(() => { 
    const { responsavel, telefone } = getValues();

    setResponsavel(responsavel);
    setTelefone(telefone);


    //console.log('Responsável:', responsavel);
    //console.log('Telefone:', telefone);
    
    if (order.delivery && (!address || typeof address !== 'object') && auth) {
      showError('Por favor, defina um endereço para entrega antes de prosseguir.');
      return;
    }

    if (!responsavel && !telefone) {
      showError('Por favor, preencha o nome do responsável e telefone.');
      return;
    }

    if (!responsavel) {
      showError('Por favor, preencha o nome do responsável.');
      return;
    }
  
    if (!telefone) {
      showError('Por favor, preencha o telefone para contato.');
      return;
    }

    if(auth){
      navigate('Payment');
    } else {
      navigate('SignIn');
    }
    
   
  }, [setObservacao, setTelefone, navigate, order.delivery, auth, address]);

  const minimumReached = (() => {
    const min = order.fornecedor?.valor_minimo_pedido;
    if (!min) return true;

    if (order.total_price < min) return false;

    return true;
  })();

  return (
    <Container {...keyboardAvoidingViewProps}>
      <ProductList
        products={order.items}
        ListEmptyComponent={
          <EmptyContainer>
            <Empty>Seu carrinho está vazio!</Empty>
            <TouchableOpacity onPress={goBack}>
              <GoBack>Voltar</GoBack>
            </TouchableOpacity>
          </EmptyContainer>
        }
        footer={
          <>
          <Footer>
            <View style={{ height: 18 }} />

            <OrderInfo />

            <View style={{ height: 24 }} />


              <Input
                control={control}
                name="responsavel"
                label="Responsável"
                inputProps={{
                  placeholder: 'Nome de quem receberá o pedido',
                }}
              />

              
              <PhoneInput
                control={control}
                name="telefone"
                label="Telefone"
                inputProps={{
                  placeholder: 'Telefone para Contato',
                }}
                errorMessage={errors.telefone}
              />

            <Button
              enabled={order.items_count > 0 && minimumReached}
              onPress={handlePress}
            >
              {(() => {
                if (order.items_count < 1 || minimumReached)
                  return 'Selecionar forma de pagamento';
                if (!minimumReached) return 'Valor mínimo não atingido';
              })()}
            </Button>

            {!minimumReached && order.items_count > 0 && (
              <Label style={{ color: colors.danger, textAlign: 'center' }}>
                Adicione mais R${' '}
                {money(
                  (order.fornecedor?.valor_minimo_pedido as number) -
                    order.total_price,
                )}{' '}
                em produtos para finalizar o pedido
              </Label>
            )}

            {/* <Label style={{ color: colors.danger, textAlign: 'center' }}>
              {money(order.total_price)}
            </Label> */}

            <View style={{ height: 20 }} />
          </Footer>
          </>
        }
      />
    </Container>
  );
};

export default Cart;
