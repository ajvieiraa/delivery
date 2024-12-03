import React from 'react';
import { FlatList } from 'react-native';

import colors from '../../assets/colors';

import LoadError from '../../components/LoadError';
import NoItems from '../../components/NoItems';
import PaginationLoading from '../../components/PaginationLoading';

import { Pagination, Pedido } from '../../services/api';
import useRequest from '../../services/api/store/hook';
import { parseAndDisplay } from '../../utils/date';
import { pagination } from '../../utils/pagination';

import {
  Card,
  Supplier,
  Row,
  Created,
  List,
  Product,
  TotalLabel,
  TotalValue,
  StatusLabel,
  Left,
  ProductTotal,
  MessageContainer,
  Message,
  Label,
  Container,
  DeliveryFeeLabel,
  DeliveryFeeValue,
  DeliveryFeeRow,
} from './styles';

const MyOrders: React.FC = () => {
  const {
    data: orders,
    error,
    refetch,
    refreshing,
    endReached,
    fetchMore,
  } = useRequest<{
    data: { items: Pedido[]; pagination: Pagination };
  }>('/pedido', {
    merge: pagination,
    paginate: true,
    refetchOnFocus: true,
  });

  return (
    <Container>
      <LoadError
        message={`Não foi possível carregar os pedidos.\n\n${
          error?.response?.data?.message || error?.message
        }`}
        onPress={refetch}
        visible={!!error}
      />

      <FlatList
        data={orders?.data.items}
        keyExtractor={({ id }) => id.toString()}
        contentContainerStyle={{
          paddingHorizontal: '5%',
          backgroundColor: colors.background,
        }}
        onRefresh={refetch}
        refreshing={refreshing}
        onEndReachedThreshold={0.7}
        onEndReached={fetchMore}
        ListHeaderComponent={
          <NoItems items={orders?.data.items}>
            Nenhum pedido encontrado.
          </NoItems>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item: order }) => (
          <Card key={order.id}>
            <Row>
              <Left>
                <Supplier numberOfLines={1}>
                  {order.id} - {order.fornecedor.nome}
                </Supplier>
                <Created>
                  Realizado em: {parseAndDisplay(order.created_at)}
                </Created>
                <Created>
                  Última atualização: {parseAndDisplay(order.updated_at)}
                </Created>
              </Left>

              <StatusLabel style={{ color: colors[order.status] }}>
                {order.status}
              </StatusLabel>
            </Row>

            <List>
              {order.produtos.map((product) => (
                <Row key={product.id}>
                  <Product numberOfLines={1}>
                    {product.quantidade.toString().padStart(2, '0')}x -{' '}
                    {product.nome.toUpperCase()}
                  </Product>
                  <ProductTotal>
                    R$ {product.valor_total.toFixed(2)}
                  </ProductTotal>
                </Row>
              ))}
            </List>

            <DeliveryFeeRow>
              <DeliveryFeeLabel>TAXA DE ENTREGA</DeliveryFeeLabel>
              <DeliveryFeeValue>
                R$ {order.taxa_entrega.toFixed(2)}
              </DeliveryFeeValue>
            </DeliveryFeeRow>

            <Row>
              <TotalLabel>TOTAL</TotalLabel>
              <TotalValue>R$ {order.total.toFixed(2)}</TotalValue>
            </Row>

            {!!order.mensagem && (
              <MessageContainer>
                <Label>Mensagem</Label>
                <Message>{order.mensagem}</Message>
              </MessageContainer>
            )}
          </Card>
        )}
        ListFooterComponent={() => (
          <PaginationLoading loading={endReached === false} />
        )}
      />
    </Container>
  );
};

export default MyOrders;
