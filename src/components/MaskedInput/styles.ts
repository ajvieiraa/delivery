import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  /* flex: 1; */
`;

export const TextInput = styled(TextInputMask).attrs({})<{
  focused?: boolean;
  error?: string;
}>`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.regular};

  padding: 8px;
  border-radius: 6px;

  border: 1px ${({ focused }) => (focused ? colors.primary : '#3E3E3E')};
  ${({ error }) => error && `border-color: ${colors.danger}`};
`;

export const Label = styled.Text`
  font-family: 'Nunito_400Regular';
  margin-bottom: 8px;
  font-size: 16px;
  color: ${colors.regular};
`;

export const Error = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.danger};
`;
