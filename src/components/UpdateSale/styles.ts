import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  /* flex: 1; */
`;

export const FooterContainer = styled.View`
  padding: 0 5%;
`;

export const FormContainer = styled.View`
  margin: 32px 0;
`;

export const ContentContainer = styled.View`
  flex-grow: 1;
`;

export const BottomMessage = styled.Text`
  text-align: center;
  margin-bottom: 30px;

  font-family: 'Nunito_300Light';
  color: ${colors.regular};
`;

export const Label = styled.Text`
  font-family: 'Nunito_700Bold';
`;

export const Value = styled.Text`
  font-family: 'Nunito_400Regular';
  margin-bottom: 16px;
`;
