import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Footer = styled.View``;

export const Label = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 14px;
  color: ${colors.muted};

  margin-top: 16px;
  margin-bottom: 10px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;

  margin: 32px 0;
`;

export const GoBack = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};
  margin-top: 8px;
`;

export const Empty = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.muted};
`;
