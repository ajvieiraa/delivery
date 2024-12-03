import React, { ReactElement } from 'react';
import { FlatList, ViewStyle } from 'react-native';

import { Produto } from '../../services/api/types';
import { useOrder } from '../../store/order';

import ProductCard from '../ProductCard';

type ListEmptyComponentT =
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | null
  | undefined;

type Props = {
  products?: Produto[] | null;
  refreshing?: boolean;
  handleRefresh?: () => void;
  footer?: ReactElement;
  header?: ReactElement;
  onlyRedirect?: boolean;
  stickyHeaderIndices?: number[];
  scrollEnabled?: boolean;
  onEndReached?: () => void;
  ListEmptyComponent?: ListEmptyComponentT;
};

const ProductList: React.FC<Props> = ({
  products,
  refreshing,
  handleRefresh,
  footer,
  header,
  onlyRedirect,
  stickyHeaderIndices,
  scrollEnabled = true,
  onEndReached,
  ListEmptyComponent,
}) => {
  const { order } = useOrder();

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => `${product.id}_${product.empresa_id}`}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      stickyHeaderIndices={stickyHeaderIndices}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <ProductCard
          key={`${item.id}_${item.empresa_id}`}
          product={item}
          supplier={order.fornecedor}
          onlyRedirect={onlyRedirect}
        />
      )}
      contentContainerStyle={contentContainerStyle}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      onEndReached={onEndReached}
    />
  );
};

const contentContainerStyle: ViewStyle = {
  paddingHorizontal: '5%',
};

export default ProductList;
