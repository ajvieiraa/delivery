import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;

  padding: 0 16px;
`;

export const Label = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};
`;
