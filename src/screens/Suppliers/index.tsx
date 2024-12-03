import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { RefreshControl } from 'react-native';

import LoadError from '../../components/LoadError';
import LoadingSpinner from '../../components/LoadingSpinner';
import SupplierCard from '../../components/SupplierCard';
import WrappedScroll from '../../components/WrappedScroll';

import { EmpresaListItem, UsuarioTipo } from '../../services/api';

import useRequest from '../../services/api/store/hook';
import { useAuth } from '../../store/auth';
import { ParamList } from '../../utils/types';

const Suppliers: React.FC = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute<
    ParamList<{ categoria: { id: number; nome: string } }>
  >();

  const { isPdv } = useAuth();

  const { data, loading, error, refetch, refreshing } = useRequest<{
    data: EmpresaListItem[];
  }>('/empresa', {
    params: {
      categoria_id: params?.categoria?.id,
      tipo: isPdv ? UsuarioTipo.DISTRIBUIDOR : UsuarioTipo['PONTO DE VENDA'],
    },
  });

  const handlePressCard = useCallback(
    (id: number) => {
      navigate('OrderStack', {
        screen: 'Supplier',
        params: { empresa: { id }, categoria: params?.categoria },
      });
    },
    [navigate, params],
  );

  return (
    <WrappedScroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }
    >
      
      <LoadingSpinner visible={loading}>Carregando unidades</LoadingSpinner>

      <LoadError
        visible={!!error}
        onPress={refetch}
        message=" carregar as categorias."
      />

      {!loading &&
        data?.data.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            {...supplier}
            onPress={handlePressCard}
          />
        ))}
    </WrappedScroll>
  );
};

export default Suppliers;
