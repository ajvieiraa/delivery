import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';

import { FlatList, Text } from 'react-native';
import colors from '../../assets/colors';

import LoadError from '../../components/LoadError';
import LoadingSpinner from '../../components/LoadingSpinner';
import NoItems from '../../components/NoItems';
import PaginationLoading from '../../components/PaginationLoading';
import SaleCard from '../../components/SaleCard';
import UpdateSale, { UpdateSaleHandles } from '../../components/UpdateSale';

import { UpdateOrderData, Venda, VendasResponse } from '../../services/api';
import useRequest, { useLazyRequest } from '../../services/api/store/hook';
import { showError } from '../../utils/message';

import { pagination } from '../../utils/pagination';

import { Container } from './styles';

type RouteProps = RouteProp<
  {
    params?: {
      pedido_id: number;
    };
  } & ParamListBase,
  'params'
>;

const MySales: React.FC = () => {
  const { params } = useRoute<RouteProps>();

  const updateSale = useRef<UpdateSaleHandles>(null);

  const [refetched, setRefetched] = useState(false);
  const [opened, setOpened] = useState(false);

  const {
    data: orders,
    error,
    refetch,
    refreshing,
    endReached,
    fetchMore,
  } = useRequest<{
    data: VendasResponse;
  }>('/venda', {
    merge: pagination,
    paginate: true,
    refetchOnFocus: true,
  });

  const [update, { loading: updating }] = useLazyRequest<
    { data: Venda },
    UpdateOrderData
  >(`/venda`, {
    method: 'PUT',
    onComplete (_result) {
      refetch();
      updateSale?.current?.close();
    },
    onError: () => showError(' alterar o pedido.'),
  });

  useEffect(() => {
    if (!params?.pedido_id) return;
    if (!orders && refetched) return;
    if (!orders) {
      refetch();
      setRefetched(true);
      return;
    }
    if (opened) return;

    const attempt = () => {
      if (!updateSale.current) {
        setTimeout(() => {
          attempt();
        }, 500);

        return;
      }

      const order = orders.data.items.find(({ id }) => id === params.pedido_id);

      if (!order) return;

      setRefetched(false);

      updateSale.current.open({
        order,
        onSubmit: (updated) => update(`/venda/${order.id}`, { data: updated }),
      });

      setOpened(true);
    };

    attempt();
  }, [opened, orders, params, refetch, refetched, update]);

  useEffect(() => {
    if (params?.pedido_id) setOpened(false);
  }, [params]);

  return (
    <>
      <Container>
        <LoadingSpinner visible={updating} />
        <UpdateSale ref={updateSale} />

        <LoadError
          message={` carregar os pedidos.\n\n${
            error?.response?.data.message ||
            error?.response?.data.status ||
            error?.message
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
          onEndReachedThreshold={0.5}
          onEndReached={fetchMore}
          ListHeaderComponent={
            <NoItems items={orders?.data.items}>
              Nenhum pedido encontrado.
            </NoItems>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item: order }) => {
            // Logando os dados do pedido enquanto renderiza
            console.log('Pedido renderizado:', order);
            return (
              <SaleCard
                order={order}
                onPress={() =>
                  updateSale.current?.open({
                    order,
                    onSubmit: (updated) =>
                      update(`/venda/${order.id}`, { data: updated }),
                  })
                }
              />
            );
          }}
          ListFooterComponent={() => (
            <PaginationLoading loading={endReached === false} />
          )}
        />

      </Container>
    </>
  );
};

export default MySales;
