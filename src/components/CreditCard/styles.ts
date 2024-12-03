import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-right: -8px;
`;

export const Column = styled.View`
  flex: 1;
  margin-right: 8px;
`;

export const LinkButton = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};

  margin-bottom: 16px;
`;
