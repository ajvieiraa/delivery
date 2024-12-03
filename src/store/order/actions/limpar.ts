import { Alert } from 'react-native';
import { SetOrder } from '../types';

export default function (id: number, setOrder: SetOrder) {
  setOrder((cur) => {

    const index = cur.items.findIndex((_item) => _item.id === id);

    if (index === -1) return cur;

    const current = cur.items[index];
    const updated = { ...current, quantidade: current.quantidade  };

    const valorFinal = updated.preco * updated.quantidade 

    return {
      ...cur,
      items: [...cur.items.slice(0, index), ...cur.items.slice(index + 1)],
      items_count: cur.items_count - updated.quantidade,
      total_price: cur.total_price - parseFloat(valorFinal),
    };

   
  });
  
}
