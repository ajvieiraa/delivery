import { Dispatch, SetStateAction } from 'react';
import { Empresa, PaymentType, Produto } from '../../services/api';

export type Item = {
  quantidade: number;
} & Produto;

export type CreditCard = {
  typename: 'online';
  numero_cartao?: string;
  data_validade?: string;
  cvv?: string;
  nome_cartao?: string;
  cpf?: string;
};

export type OnDelivery = {
  typename: 'onDelivery';
  card?: boolean;
  no_change?: boolean;
  change_for?: number;
};

export type PaymentMethods = 'online' | 'on_delivery';

export type Payment = {
  method?: PaymentMethods;
  data?: OnDelivery | CreditCard;
};

export type Address = {
  cep: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
};

export type Order = {
  items: Item[];
  items_count: number;
  total_price: number;
  payment?: Payment;
  address?: Address;
  instructions?: string;
  observacao?:string;
  fornecedor?: Empresa;
  delivery: Boolean;
  telefone: string;
  responsavel: string;
};

export type SetOrder = Dispatch<SetStateAction<Order>>;

export type OrderContext = {
  order: Order;
  setOrder: SetOrder;
  paymentTypes: PaymentType[] | undefined;
  setPaymentTypes: Dispatch<SetStateAction<PaymentType[] | undefined>>;
};
