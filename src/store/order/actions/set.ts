import { Item, SetOrder } from '../types';

export default function (item: Item, setOrder: SetOrder) {
  setOrder((order) => {
    const index = order.items.findIndex((_item) => _item.id === item.id);

    // does not change the order if the item was not added and the value is invalid
    if (index === -1 && item.quantidade <= 0) return order;

    // add the item if it isn't in the items array with the selected quantidade
    console.log("teste");
    if (index === -1 && item.quantidade > 0)
      return {
        ...order,
        items: [...order.items, item],
        items_count: order.items_count + item.quantidade,
        total_price:
          order.total_price + (item.quantidade * parseFloat(item.preco)),
      };

    // if the item already exists on items array, do the following

    const currentItem = order.items[index];
    const previousQuantity = currentItem.quantidade;
    const priceToSubtract =
      currentItem.quantidade * parseFloat(currentItem.preco);

    // removes the item from items array, recalculating items_count and total_price
    if (item.quantidade <= 0)
      return {
        ...order,
        items: [
          ...order.items.splice(0, index),
          ...order.items.splice(index + 1),
        ],
        items_count: order.items_count - previousQuantity,
        total_price: order.total_price - priceToSubtract,
      };

    // update the item on items array, recalculating items_count and total_price according to the new quantidade
    return {
      ...order,
      items: [
        ...order.items.splice(0, index),
        { ...currentItem, quantidade: item.quantidade },
        ...order.items.splice(index + 1),
      ],
      items_count: order.items_count - previousQuantity + item.quantidade,
      total_price:
        order.total_price -
        priceToSubtract +
        (item.quantidade * parseFloat(currentItem.preco)),
    };
  });
}
