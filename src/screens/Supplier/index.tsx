import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

import ProductCard from '../../components/ProductCard';
import Spacer from '../../components/Spacer';
import LoadingSpinner from '../../components/LoadingSpinner';

import { Categoria, Empresa, Pagination, Produto } from '../../services/api';

import useRequest from '../../services/api/store/hook';

import {
  Address,
  Bold,
  CartButtonContainer,
  Closed,
  Label,
  Name,
  Operation,
  Phone,
} from './styles';

import { useOrder } from '../../store/order';

import money from '../../utils/money';
import { capitalize } from '../../utils/string';
import { pagination } from '../../utils/pagination';

import colors from '../../assets/colors';

import NoItems from '../../components/NoItems';
import LoadError from '../../components/LoadError';
import PaginationLoading from '../../components/PaginationLoading';
import CartButton from '../../components/CartButton';

interface RouteParams extends ParamListBase {
  params: {
    empresa: {
      id: number;
    };
    categoria: {
      id: number;
      name: string;
    };
  };
}

type Params = RouteProp<RouteParams, 'params'>;

const Category: React.FC<{ categoryId: number; supplierId: number }> = ({
  categoryId,
  supplierId,
}) => {
  const {
    order: { fornecedor },
  } = useOrder();

  const {
    data: products,
    refreshing,
    refetch,
    error,
    endReached,
    fetchMore,
  } = useRequest<{ data: { items: Produto[]; pagination: Pagination } }>(
    'produto',
    {
      params: { empresa_id: supplierId, categoria_id: categoryId },
      paginate: true,
      merge: pagination,
    },
  );

  const handleEndReached = useCallback(() => {
    if (!endReached) fetchMore();
  }, [endReached, fetchMore]);

  return (
    <Tabs.FlatList
      data={products?.data.items}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
        paddingBottom: 80,
      }}
      ListEmptyComponent={
        <>
          {!products && !error && <PaginationLoading loading />}

          {!products && !!error && (
            <LoadError
              visible
              message=" carregar os produtos"
              buttonText="Recarregar"
              onPress={refetch}
            />
          )}

          <NoItems items={products?.data.items} noButton>
            Nenhum produto nessa categoria!
          </NoItems>
        </>
      }
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          supplier={fornecedor}
          product={item}
          key={item.id.toString()}
        />
      )}
      ListFooterComponent={
        <PaginationLoading
          loading={
            !!products &&
            products.data.pagination.current_page <
              products.data.pagination.last_page
          }
        />
      }
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onRefresh={refetch}
      refreshing={refreshing}
    />
  );
};

const Supplier: React.FC = () => {
  const { params } = useRoute<Params>();

  const { setSupplier, order } = useOrder();

  const { data: supplier } = useRequest<{
    data: Empresa;
  }>(`/empresa/${params.empresa.id}`);

  useEffect(() => {
    if (!supplier?.data) return;

    if (
      order.fornecedor?.id === supplier?.data.id &&
      order.fornecedor?.taxa_entrega === supplier?.data.taxa_entrega
    )
      return;

    setSupplier(supplier.data);

    //console.log(supplier.data);
  }, [order, setSupplier, supplier]);

  const { data: categories } = useRequest<
    { data: Categoria[] },
    undefined,
    { empresa_id?: number }
  >('/categoria', { params: { empresa_id: params.empresa.id } });

  const address = !supplier
    ? ''
    : `${supplier?.data.endereco?.logradouro || 'Sem rua'}, ${
        supplier?.data.endereco?.numero || 'sem número'
      }, ${supplier?.data.endereco?.bairro || 'sem bairro'} - ${
        supplier?.data.endereco?.cidade || 'Sem cidade'
      }`;

  const minimumValue = (() => {
    const min = supplier?.data.valor_minimo_pedido;

    if (!min && min !== 0) return null;

    return (
      <>
        <Label>Valor mínimo do pedido</Label>
        <Address>R$ {money(min)}</Address>
      </>
    );
  })();

  const operation = (() => {
    if (supplier?.data.aberto) return null;
    if (!supplier?.data.funcionamento) return null;

    return (
      <Operation>
        <Bold>Funcionamento</Bold>
        {'\n\n'}
        {Object.keys(supplier.data.funcionamento)
          .filter((key) => key !== 'id' && !key.includes('_'))
          .map((key) => {
            const openTime = supplier.data.funcionamento[`abertura_${key}`];
            const closeTime = supplier.data.funcionamento[`fechamento_${key}`];

            if (typeof openTime !== 'string' || typeof closeTime !== 'string')
              return '';

            const open = openTime.substr(0, 5);
            const close = closeTime.substr(0, 5);

            return `${capitalize(key)}\n${open} - ${close}\n\n`;
          })}
      </Operation>
    );
  })();

  const renderHeader = useCallback(() => {
    return (
      <View>
        <Name>{supplier?.data.nome}</Name>

        <Label>Telefone</Label>
        <Phone>{supplier?.data.telefone}</Phone>

        <Label>Endereço</Label>
        <Address>{address}</Address>

        {minimumValue}

        <Closed open={!!supplier?.data.aberto}>
          {supplier?.data.aberto ? 'Aberto' : 'Fechado'}
        </Closed>

        <Spacer height={0.8} separator />

        {operation}
      </View>
    );
  }, [address, minimumValue, operation, supplier]);

  if (!categories?.data || !supplier?.data) return <LoadingSpinner />;

  if (!supplier.data.aberto)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.background }}
      >
        {renderHeader()}
      </ScrollView>
    );

  return (
    <>
      <Tabs.Container
        lazy
        renderHeader={renderHeader}
        containerStyle={{ backgroundColor: colors.background }}
        headerContainerStyle={{ backgroundColor: colors.background }}
        initialTabName={`Category-${params.categoria.id}`}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            activeColor={colors.primary}
            inactiveColor={colors.muted}
            labelStyle={{
              textTransform: 'capitalize',
              fontFamily: 'Nunito_400Regular',
            }}
            contentContainerStyle={{ backgroundColor: colors.background }}
          />
        )}
      >
        {categories.data.map((category) => (
          <Tabs.Tab
            key={category.id.toString()}
            name={`Category-${category.id}`}
            label={capitalize(category.nome)}
          >
            <Category categoryId={category.id} supplierId={params.empresa.id} />
          </Tabs.Tab>
        ))}
      </Tabs.Container>

      <CartButtonContainer>
        <CartButton />
      </CartButtonContainer>
    </>
  );
};

export default Supplier;
