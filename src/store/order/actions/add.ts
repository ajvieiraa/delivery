import { Item, SetOrder } from '../types';

export default function (item: Omit<Item, 'quantidade'>, setOrder: SetOrder) {
  setOrder((cur) => {
    const index = cur.items.findIndex((_item) => _item.id === item.id);

    // Função para garantir que o preço seja convertido corretamente
    const parsePrice = (price: string) => {
      return parseFloat(price.replace(',', '.')); // Substitui a vírgula por ponto
    };

    if (index === -1) {
      const itemPrice = parsePrice(item.preco); // Converter preco para número
      return {
        ...cur,
        items: [...cur.items, { ...item, quantidade: 1 }],
        items_count: cur.items_count + 1,
        total_price: cur.total_price + itemPrice,
      };
    }

    const current = cur.items[index];
    const updated = { ...current, quantidade: current.quantidade + 1 };

    const updatedPrice = parsePrice(updated.preco); // Converter preco do item atualizado
    // Verificar o valor correto de updated.preco
    //console.log(updatedPrice);  

    return {
      ...cur,
      items_count: cur.items_count + 1,
      items: [
        ...cur.items.slice(0, index),
        updated,
        ...cur.items.slice(index + 1),
      ],
      total_price: cur.total_price + updatedPrice,
    };
  });
}
