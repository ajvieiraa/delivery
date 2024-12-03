import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';

import CartButton from '../../components/CartButton';
import LoadError from '../../components/LoadError';
import LoadingSpinner from '../../components/LoadingSpinner';
import NoItems from '../../components/NoItems';
import PaginationLoading from '../../components/PaginationLoading';
import ProductList from '../../components/ProductList';

import { Pagination, Produto, UsuarioTipo } from '../../services/api';
import useRequest from '../../services/api/store/hook';

import { useAuth } from '../../store/auth';
import { pagination } from '../../utils/pagination';

import { Container, Wrapper } from './styles';

type RouteParams = ParamListBase & {
  params: {
    categoria: {
      id: number;
      nome: string;
    };
    empresa?: {
      id: number;
      nome: string;
    };
  };
};
type RouteProps = RouteProp<RouteParams, 'params'>;

const Products: React.FC = () => {
  const { setOptions } = useNavigation();
  const { location } = useAuth();

  const { auth } = useAuth();

  const empresa_tipo = useMemo(() => {
    if (auth?.user.tipo === UsuarioTipo.CLIENTE)
      return UsuarioTipo['PONTO DE VENDA'];

    if (auth?.user.tipo === UsuarioTipo['PONTO DE VENDA'])
      return UsuarioTipo.DISTRIBUIDOR;
  }, [auth]);

  const {
    params: { categoria, empresa },
  } = useRoute<RouteProps>();

  const {
    data: produtos,
    error,
    loading,
    refreshing,
    refetch,
    endReached,
    fetchMore,
  } = useRequest<{
    data: { items: Produto[]; pagination: Pagination };
  }>('/produto', {
    paginate: true,
    params: {
      categoria_id: categoria.id,
      empresa_id: empresa?.id,
      empresa_tipo,
      cidade_id: location?.city?.id,
    },
    merge: pagination,
  });

  



  useEffect(() => {
    setOptions({ headerTitle: categoria.nome });
  }, [categoria, setOptions]);

  return (
    <Container>
      <LoadingSpinner visible={loading}>Carregando produtos</LoadingSpinner>

      <Wrapper>
        <LoadError
          visible={!!error}
          onPress={refetch}
          message={` carregar os produtos.\n\n${error?.response?.data?.message}`}
        />

        <NoItems items={produtos?.data.items}>
          {`Nenhum produto disponível nessa categoria para a cidade selecionada.\n\n${location?.city?.nome}, ${location?.state?.uf}`}
        </NoItems>
      </Wrapper>

      <ProductList
        products={produtos?.data.items}
        refreshing={refreshing}
        handleRefresh={refetch}
        onlyRedirect={!empresa}
        onEndReached={fetchMore}
        footer={<PaginationLoading loading={endReached === false} />}
      />

      <Wrapper>
        <CartButton />
      </Wrapper>
    </Container>
  );
};

export default Products;
