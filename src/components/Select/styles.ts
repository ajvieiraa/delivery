import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View``;

export const Option = styled.TouchableOpacity`
  padding: 16px 0;
`;

export const OptionLabel = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${colors.line};
`;
