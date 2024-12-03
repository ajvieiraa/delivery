import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.6);

  justify-content: center;
  align-items: center;
`;

export const Action = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 20px;
  text-align: center;
  color: ${colors.primary};

  margin-top: 24px;
`;
