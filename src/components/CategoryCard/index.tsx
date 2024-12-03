import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Categoria, getImage } from '../../services/api';

import camera from '../../assets/images/camera.png';

import { CardContainer, Card, Image, Name } from './styles';

interface Props extends Categoria {
  empresa?: {
    id: number;
  };
  redirect?: string;
  title?: string;
}

const CategoryCard: React.FC<Props> = ({
  id,
  image,
  nome,
  empresa,
  redirect = 'Products',
}) => {
  const { navigate } = useNavigation();

  const handlePressCard = useCallback(() => {
    navigate('OrderStack', {
      screen: redirect,
      params: { categoria: { id, nome }, empresa },
    });
  }, [empresa, id, navigate, nome, redirect]);

  return (
    <CardContainer>
      <Card onPress={() => handlePressCard()}>
        <Image source={image ? { uri: getImage(image) } : camera} />
        <Name>{nome}</Name>
      </Card>
    </CardContainer>
  );
};

export default CategoryCard;
