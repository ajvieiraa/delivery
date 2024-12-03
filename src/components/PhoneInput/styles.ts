import styled from 'styled-components/native';
import { MaskedTextInput } from 'react-native-mask-text';
import colors from '../../assets/colors';

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const StyledMaskedInput = styled(MaskedTextInput)<{
  focused?: boolean;
  error?: string;
  isPlaceholder?: boolean;
}>`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${({ isPlaceholder }) => (isPlaceholder ? colors.muted : colors.regular)};
  padding: 10px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ focused, error }) => {
    if (error) return colors.danger;
    if (focused) return colors.primary;
    return '#000';
  }};
  shadow-color: transparent;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Error = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 14px;
  color: ${colors.danger};
  margin-top: -10px;
`;
