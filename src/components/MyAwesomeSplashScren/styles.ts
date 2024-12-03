import styled from 'styled-components/native';

import colors from '../../assets/colors';
import logo from '../../assets/images/logo.png';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 5%;
`;

export const Text = styled.Text`
  color: ${colors.regular};
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({ source: logo, resizeMode: 'contain' })`
  height: 130px;
  margin: 32px 0;
`;
