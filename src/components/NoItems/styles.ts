import styled from 'styled-components/native';
import { Text as RNText } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const Text = styled(RNText)`
  font-family: 'Nunito_400Regular';
  text-align: center;

  margin-top: 25%;
  margin-bottom: 10%;
`;
