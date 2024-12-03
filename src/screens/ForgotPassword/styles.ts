import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.background};

  padding: 16px 5%;
`;

export const Center = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};
  font-size: 22px;

  text-align: center;

  margin: 16px 0;
`;

export const Description = styled.Text`
  font-family: 'Nunito_600SemiBold';
  color: ${colors.regular};
  font-size: 16px;

  text-align: center;

  margin: 16px 0;
`;

export const ErrorText = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.danger};
  font-size: 14px;

  text-align: center;
`;

export const LinkButton = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};
  font-size: 14px;

  text-align: center;

  margin-bottom: 16px;
`;
