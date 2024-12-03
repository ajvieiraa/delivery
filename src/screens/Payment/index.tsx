import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import Button from '../../components/Button';
import { CreditCardFormData } from '../../components/CreditCard';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderInfo, { OrderInfoHandlers } from '../../components/OrderInfo';
import PaymentSelector, {
  PaymentSelectorHandlers,
} from '../../components/PaymentSelector';
import WrappedScroll from '../../components/WrappedScroll';

import api, {
  PagamentoTipo,
  StoreOrderData,
  UsuarioTipo,
} from '../../services/api';

import { useAuth } from '../../store/auth';
import { Payment as PaymentT, useOrder } from '../../store/order';

import { showError, showMessage } from '../../utils/message';

import { Container } from './styles';
import { CashPaymentHandlers } from '../../components/CashPayment';

const Payment: React.FC = () => {
  const payment = useRef<PaymentSelectorHandlers>(null);

  const { dispatch, navigate } = useNavigation<any>();

  const { address, auth, location, isClient, isPdv } = useAuth();
  const { order, cleanItems } = useOrder();

  const orderInfo = useRef<OrderInfoHandlers>(null);
  const cashPaymentRef = useRef<CashPaymentHandlers>(null);
  const responsavel = useRef<string | undefined>(
    isClient ? auth?.user.name : undefined,
  );

  const [loading, setLoading] = useState(false);

  const handleEndOrder = useCallback(async () => {
    if (!responsavel.current || responsavel.current.length === 0)
      return showError(
        'Por favor, informe o nome do responsável por receber o pedido.',
      );

    const pagamento = (() => {
      if (!isPdv) {
        const paymentData = payment.current?.get() as PaymentT;

        if (!paymentData) return;

        if (paymentData.data?.typename === 'onDelivery') {
          if (
            !paymentData.data.card &&
            paymentData.data.change_for === undefined &&
            !paymentData.data.no_change
          )
            return showError('Por favor, informe a necessidade de troco.');

          return {
            tipo: UsuarioTipo['PONTO DE VENDA'],
            pagamento: paymentData.data.card
              ? 'Na entrega (Cartão)'
              : 'Dinheiro',
            troco: paymentData.data.change_for || 0,
          };
        } else if (paymentData.data?.typename === 'online') {
          const data = paymentData.data as unknown as CreditCardFormData;

          return {
            tipo: UsuarioTipo['PONTO DE VENDA'],
            pagamento: PagamentoTipo.CREDITO,
            numero_cartao: paymentData.data.numero_cartao,
            cvv: paymentData.data.cvv,
            nome_cartao: paymentData.data.nome_cartao,
            cpf: paymentData.data.cpf,
            data_validade: paymentData.data.data_validade,
            troco: 0,
            endereco_cobranca: {
              cep: data.cep,
              rua: data.rua,
              numero: data.numero,
              bairro: data.bairro,
              complemento: data.complemento,
              cidade: data.cidade,
              uf: data.uf,
            },
          };
        }
      } else if (isPdv) {
        const paymentData = payment.current?.get() as { tipo?: string };

        if (!paymentData.tipo) return;

        return {
          tipo: UsuarioTipo.DISTRIBUIDOR,
          pagamento: paymentData.tipo,
          troco: 0,
        };
      }
    })();

    if (!pagamento) return;

    if(order.delivery === true){
      if (!address || typeof address === 'string') {
        return Alert.alert(
          'Aviso!',
          'Para prosseguir, informe o endereço de entrega.',
          [{ text: 'Ok', onPress: () => orderInfo.current?.open?.() }],
          { cancelable: true },
        );
      }
    }

    if (!order.fornecedor?.id)
      return showError(
        'Ocorreu um erro ao obter dados do fornecedor. Por favor, tente novamente.',
      );

    if (!location?.city || !location.state)
      return showError('Por favor, selecione sua cidade e estado.');

    if (!auth) {
      return navigate('SignIn', { from: 'Payment' });
    }

    const data: StoreOrderData = {
      ...pagamento,
      ...address,
      cidade: location?.city.nome,
      estado: location?.state.nome,
      fornecedor_id: order.fornecedor.id,
      produtos: order.items.map((product) => ({
        id: product.id,
        valor_unitario: parseFloat(product.preco),
        quantidade: product.quantidade,
      })),
      delivery: order.delivery,
      responsavel: order.responsavel,
      telefone: order.telefone,
      observacao: order.observacao,
    };

    //console.log(data);

    setLoading(true);
    const response = await api.post('/pedido', data, {
      headers: { Authorization: `Bearer ${auth?.access_token}` },
    });

    if (response?.data?.success === true || 'true') {

      setLoading(false);
      showMessage(response.data.message);
      dispatch(StackActions.popToTop);
      cleanItems();
    } else {
      //console.log(err.response);
      setLoading(false);
      showError(
        'Erro ao realizar o pedido.',
      );
    }
  }, [address, order, location, auth, isPdv, navigate, dispatch, cleanItems]);

  const valueChangeMoney = (() => {
    const total_order = order?.total_price ?? 0;
  
    const changeFor = cashPaymentRef.current?.getChangeFor() ?? 0;

    if (changeFor < total_order) return false;

    return true;
  })();

  return (
    <WrappedScroll>
      <LoadingSpinner visible={loading} > Relizando Pedido
      </LoadingSpinner>

      <PaymentSelector ref={payment} />
      <Container>
        <OrderInfo ref={orderInfo} shipping={false} />

        <View style={{ height: 18 }} />
      </Container>

      <View style={{ height: 24 }} />

      <Button 
        enabled={valueChangeMoney}
        onPress={handleEndOrder}
      >
        {(() => {
           if (valueChangeMoney)
            return 'Finalizar Pedido';
           if (!valueChangeMoney) return 'Valor do Troco menor que o total!';
        })()}
      </Button>
    </WrappedScroll>
  );
};

export default Payment;
