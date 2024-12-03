import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Platform, RefreshControl } from 'react-native';

import CartButton from '../../components/CartButton';
import LoadError from '../../components/LoadError';
import LoadingSpinner from '../../components/LoadingSpinner';
import WrappedScroll from '../../components/WrappedScroll';
import CategoryCard from '../../components/CategoryCard';
import NoItems from '../../components/NoItems';

import {
  Banner as BannerT,
  Categoria,
  getImage,
  Response,
} from '../../services/api';

import {
  Cards,
  ButtonContainer,
  BannerContainer,
  Banner,
  BannerTitle,
  BannerTitleContainer,
} from './styles';

import useRequest from '../../services/api/store/hook';
import { useAuth } from '../../store/auth';
import LocationSelect from '../../components/LocationSelect';

type RouteParams = ParamListBase & {
  params?: {
    empresa?: {
      id: number;
      nome: string;
    };
  };
};

type RouteProps = RouteProp<RouteParams, 'params'>;

const Categories: React.FC = () => {
  const { params } = useRoute<RouteProps>();
  const { location } = useAuth();

  const empresa = params?.empresa;

  const { data, loading, refetch, refreshing, error } = useRequest<
    { data: Categoria[] },
    undefined,
    { empresa_id?: number }
  >('/categoria', {
    params: { empresa_id: empresa?.id },
  });

  const { data: banner, refetch: refetchBanner } = useRequest<
    Response<BannerT>
  >('/campanha/aleatorio', { refetchOnFocus: true });

  if(Platform.OS === 'android'){
    if((location === null) || (location === undefined)){
      return <LocationSelect />;
    }
  }

  return (
    <>
      <WrappedScroll
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              refetch();
              refetchBanner();
            }}
          />
        }
      >
        {!params?.empresa && banner?.data && (
          <>
            <BannerContainer>
              <Banner source={{ uri: getImage(banner.data.imagem) }} />
              <BannerTitleContainer>
                <BannerTitle numberOfLines={4}>{banner.data.name}</BannerTitle>
              </BannerTitleContainer>
            </BannerContainer>
          </>
        )}


        <NoItems items={data?.data}>
          Nenhuma categoria para essa unidade.
        </NoItems>

        <LoadError
          visible={!!error}
          onPress={refetch}
          message={` carregar as categorias.\n\n${error?.response?.data?.message}`}
        />

        <Cards>
          {data?.data.map((categoria) => (
            <CategoryCard
              key={categoria.id}
              {...categoria}
              empresa={empresa}
              redirect="Suppliers"
            />
          ))}
        </Cards>
      </WrappedScroll>

      <ButtonContainer>
        <CartButton />
      </ButtonContainer>
    </>
  );
};

export default Categories;
