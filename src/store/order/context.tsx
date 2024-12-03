import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Types
import { OrderContext as Context, Order, Item } from './types';

// Actions
import {
  sub,
  add,
  clean,
  set,
  limpar,
} from './actions';
import HeaderRightText from '../../components/HeaderRightText';
import { Empresa, PaymentType } from '../../services/api';

const OrderContext = React.createContext({} as Context);

const INITIAL_STATE: Order = {
  items: [],
  items_count: 0,
  total_price: 0,
  payment: undefined,
  address: undefined,
  fornecedor: undefined,
  delivery: false,
  observacao: '',
  responsavel:'',
  telefone: '',
};

export const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState(INITIAL_STATE); // @TODO: check if it exists on the storage
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>();

  useEffect(() => {
    if (order?.fornecedor) {
      // @TODO: save on storage
      // console.log(order.instructions);
      console.log('fornecedor id:', order.fornecedor.id);
    }
  }, [order.fornecedor]);

  return (
    <OrderContext.Provider
      value={{ order, setOrder, paymentTypes, setPaymentTypes }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const { order, setOrder, paymentTypes, setPaymentTypes } = useContext(
    OrderContext,
  );

  const setSupplier = (fornecedor: Empresa) => {
    setPaymentTypes(fornecedor.payment_types);
    setOrder((cur) => ({ ...cur, fornecedor }));
  };

  const addItem = (item: Omit<Item, 'quantidade'>) => add(item, setOrder);

  const subItem = (id: number) => sub(id, setOrder);

  const setItem = (item: Item) => set(item, setOrder);

  const cleanItems = () => clean(setOrder);

  const limparItens = (id: number) => limpar(id, setOrder);

  const setDelivery = (delivery: boolean) => {
    setOrder((cur) => ({ ...cur, delivery }));
  };

  const setResponsavel = (responsavel: string) => {
    setOrder((cur) => ({ ...cur, responsavel }));
  };
  
  const setTelefone = (telefone: string) => {
    setOrder((cur) => ({ ...cur, telefone }));
  };

  const setObservacao = (observacao?: string) => {
    setOrder((cur) => ({ ...cur, observacao }));
  };


  return {
    order,
    addItem,
    subItem,
    cleanItems,
    setItem,
    limparItens,
    setObservacao,
    setSupplier,
    setDelivery,
    setTelefone,
    setResponsavel,
    paymentTypes,
  };
};

export const getItems = (count: number) => {
  if (count === 0) return 'Ver carrinho';
  if (count === 1) return `Ver carrinho (${count} item)`;
  return `Ver carrinho (${count} itens)`;
};

export const HeaderBackToSupplier = (
  empresa?: { nome: string; id: number },
  label?: string,
) => {
  const { order } = useOrder();
  const { setOptions, navigate } = useNavigation();

  useEffect(() => {
    if (!empresa) return;

    if (order.fornecedor && order.fornecedor.id !== empresa.id) {
      setOptions({
        headerRight: () => (
          <HeaderRightText
            onPress={() =>
              navigate('OrderStack', {
                screen: 'Supplier',
                params: {
                  empresa: {
                    nome: order.fornecedor?.nome,
                    id: order.fornecedor?.id,
                  },
                },
              })
            }
          >
            {label || order.fornecedor?.nome
              ? `Voltar para ${order.fornecedor?.nome}`
              : 'Voltar para loja'}
          </HeaderRightText>
        ),
      });
    } else {
      setOptions({ headerRight: () => null });
    }
  }, [setOptions, empresa, navigate, label, order.fornecedor]);
};
