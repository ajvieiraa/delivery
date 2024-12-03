import React, { useCallback } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../assets/colors';

import { Empresa, getImage, Produto } from '../../services/api';

import { useOrder } from '../../store/order';

import {
  ActionsContainer,
  Container,
  Description,
  ImageContainer,
  Image,
  InfoContainer,
  Name,
  Price,
  Icon,
  Quantity,
  Supplier,
  Wrapper,
  RedirectButton,
  RedirectButtonContainer,
  Row,
  IconContainer,
} from './styles';

import camera from '../../assets/images/camera.png';

import rem from '../../utils/rem';

type Props = {
  product: Produto;
  supplier?: Empresa;
  onlyRedirect?: boolean;
};

const ProductCard: React.FC<Props> = ({ product, supplier, onlyRedirect }) => {
  const {
    addItem,
    subItem,
    // setItem,
    order,
    setSupplier,
    cleanItems,
    limparItens,
  } = useOrder();

  const { navigate } = useNavigation();

  const info = order.items.find(
    (item) => item.id === product.id && item.empresa_id === product.empresa_id,
  );

  const handleAdd = useCallback(() => {
    if (!supplier?.id) return;

    if (order.fornecedor?.id === supplier.id) {
      addItem(product);
      return;
    }

    if (!order.fornecedor?.id || order.items_count === 0) {
      setSupplier(supplier);
      addItem(product);
      return;
    }

    if (
      order.fornecedor?.id &&
      order.fornecedor?.id !== supplier.id &&
      order.items_count > 0
    ) {
      const onConfirm = () => {
        cleanItems();
        setSupplier(supplier);
        addItem(product);
      };

      Alert.alert(
        'Aviso!',
        'Seu carrinho já contém produtos de outro vendedor.\n\nContinuar fará com que seu ele seja esvaziado.\n\nDeseja continuar?',
        [{ text: 'Não' }, { text: 'Sim', onPress: onConfirm }],
        { cancelable: true },
      );
    }
  }, [
    supplier,
    order.fornecedor,
    order.items_count,
    addItem,
    product,
    setSupplier,
    cleanItems,
  ]);

  const handleSub = useCallback(() => {
    subItem(product.id);
  }, [product.id, subItem]);

  const HandleLimpar = useCallback(() => {
    Alert.alert(
      'Aviso!',
      'Seu produto será retirado do carrinho, deseja continuar?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Esvaziar Item', onPress: () =>  limparItens(product.id) },
    ]);
     
  }, [product.id, limparItens]);

  const card = (
    <Wrapper>
      <Container>
        <ImageContainer>
          <Image
            resizeMode="contain"
            source={product.image ? { uri: getImage(product.image) } : camera}
          />
        </ImageContainer>

        <InfoContainer>
          <View>
            <Name>{product.nome}</Name>
            <Description>{product.description}</Description>
          </View>
          <Price>R$ {product.preco}</Price>
          {onlyRedirect && (
            <Row>
              <Supplier>{product.empresa_nome}</Supplier>
              <Supplier>Entrega em: {product.prazo_entrega}</Supplier>
            </Row>
          )}
        </InfoContainer>

        {!onlyRedirect && (
          <ActionsContainer>
             <View style={{ position: 'absolute' }}>
              {!!info?.quantidade && (
                <TouchableOpacity
                  style={{ marginTop: -40 }}
                  onPress={HandleLimpar}>
                 <Icon name="delete-outline" color={colors.regular} size={rem(2.5)} />
                </TouchableOpacity>
              )}
            </View>
            {!!info?.quantidade && (
              <>
                <IconContainer onPress={handleSub}>
                  <Icon name="remove" color={colors.regular} size={rem(2.5)} />
                </IconContainer>

                <Quantity>{info.quantidade}</Quantity>
              </>
            )}

            <IconContainer onPress={handleAdd}>
              <Icon name="add" size={rem(2.5)} color={colors.regular} />
            </IconContainer>
          </ActionsContainer>
        )}

        {onlyRedirect && (
          <RedirectButtonContainer>
            <RedirectButton>Ver</RedirectButton>
          </RedirectButtonContainer>
        )}
      </Container>
    </Wrapper>
  );

  if (product.preco === '0.00') return null;

  if (!onlyRedirect) return card;

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Supplier', {
          empresa: { id: product.empresa_id, nome: product.empresa_nome },
        })
      }
    >
      {card}
    </TouchableOpacity>
  );
};

export default ProductCard;
