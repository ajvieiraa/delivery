import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const SupplierInfoContainer = styled.View`
  margin: 0 -10%;
  background-color: ${colors.background};
`;

export const Name = styled.Text`
  font-family: 'Nunito_700Bold';
  text-align: center;
  font-size: 22px;

  margin: 18px 0 12px;
`;

export const Phone = styled.Text`
  font-family: 'Nunito_400Regular';
  text-align: center;
`;

export const Picture = styled.Image``;

export const Address = styled.Text`
  font-family: 'Nunito_300Light';
  text-align: center;

  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-family: 'Nunito_300Light';
  color: ${colors.muted};
  text-align: center;

  margin-top: 12px;
`;

export const Title = styled.Text`
  font-family: 'Nunito_700Bold';
  text-align: center;
  font-size: 18px;

  margin: 16px 0 0;
`;

export const ProductsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    minHeight: Dimensions.get('window').height,
    backgroundColor: 'red',
  },
})`
  /* padding: 0 5%; */
`;

export const CategoriesContainer = styled.View`
  padding: 16px 5%;
`;

export const Closed = styled.Text<{ open: boolean }>`
  text-align: center;
  color: ${({ open }) => (open ? colors.open : colors.closed)};

  margin-bottom: 8px;
  font-family: 'Nunito_400Regular';
`;

export const Bold = styled.Text`
  font-family: 'Nunito_700Bold';
`;

export const Operation = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
  text-align: center;

  margin-top: 32px;
`;

export const CartButtonContainer = styled.View`
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 0;
`;
