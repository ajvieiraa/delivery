import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  /* flex: 1; */
`;

export const TextInput = styled.TextInput.attrs({})<{
  focused?: boolean;
  error?: string;
  isPlaceholder?: boolean;
}>`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#aaa' : '#000')};
  padding: 12px 16px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ focused, error }) => (error ? '#E74C3C' : focused ? '#3498DB' : '#000')};
  background-color: #fff;
  min-height: 48px;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Error = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.danger};
`;
