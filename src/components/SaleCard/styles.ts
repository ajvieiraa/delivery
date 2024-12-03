import styled from 'styled-components/native';

import colors from '../../assets/colors';

export const Card = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.line};
  padding: 16px;

  margin-top: 16px;
`;

export const Supplier = styled.Text`
  font-family: 'Nunito_700Bold';
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Left = styled.View`
  flex: 1;
`;

export const Created = styled.Text`
  font-family: 'Nunito_300Light';
  font-size: 12px;
`;

export const List = styled.View`
  margin-top: 8px;

  border-bottom-width: 1px;
  border-color: ${colors.line};

  margin-bottom: 12px;
  padding-bottom: 8px;
`;

export const ProductContainer = styled.View`
  margin-bottom: 16px;
`;

export const Product = styled.Text`
  font-family: 'Nunito_400Regular';
  margin-bottom: 4px;
  flex: 1;
`;

export const ProductTotal = styled.Text`
  font-family: 'Nunito_400Regular';
`;

export const TotalLabel = styled.Text`
  font-family: 'Nunito_600SemiBold';
`;

export const TotalValue = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.dark};
`;

export const StatusLabel = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.danger};
`;

export const MessageContainer = styled.View`
  border-top-width: 1px;
  border-color: ${colors.line};

  margin-top: 12px;
  padding-top: 8px;
`;

export const Label = styled.Text`
  font-family: 'Nunito_300Light';
  font-size: 12px;
  color: ${colors.regular};
`;

export const Message = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.dark};
`;

export const SubTitle = styled.Text`
  font-family: 'Nunito_700Bold';
  margin-top: 12px;
`;

export const Value = styled.Text`
  font-family: 'Nunito_400Regular';
`;
