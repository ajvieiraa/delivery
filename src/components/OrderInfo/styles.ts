import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View``;

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.line};

  padding: 8px 0;
`;

export const ItemName = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
  flex: 1;
  margin-right: 16px;
`;

export const ItemPrice = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const TotalContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Quantity = styled.Text`
  font-size: 14px;
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const Total = styled.Text`
  text-align: right;

  font-size: 16px;
  color: ${colors.primary};
  font-family: 'Nunito_700Bold';
`;

export const Deliver = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};

  margin-top: 32px;
  margin-bottom: 8px;
`;

export const Location = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
  font-size: 16px;

  margin-top: 8px;
`;

export const DeliveryFeeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  padding-bottom: 8px;

  border-bottom-width: 1px;
  border-color: ${colors.line};
`;

export const DeliveryFeeLabel = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 14px;
  color: ${colors.regular};
`;

export const DeliveryFeeValue = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 14px;
  color: ${colors.regular};
`;
