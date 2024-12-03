import { SetOrder } from '../types';

export default function (setOrder: SetOrder) {
  
  setOrder((order) => ({
    ...order,
    items: [],
    items_count: 0,
    total_price: 0,
    payment: undefined,
    fornecedor_id: undefined,
  }));
  
}


