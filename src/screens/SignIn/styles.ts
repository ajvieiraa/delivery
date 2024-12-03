import styled from 'styled-components/native';

import colors from '../../assets/colors';
import logo from '../../assets/images/logo.png';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};

  padding: 5%;
`;

export const Text = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({ source: logo, resizeMode: 'contain' })`
  height: 180px;

  margin: 32px 0;
`;

export const ButtonsContainer = styled.View``;

export const Touchable = styled.TouchableOpacity`
  padding: 16px;
`;

export const TouchableText = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};

  text-align: center;
`;

export const TouchableTextDelete = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.error};

  text-align: center;
`;

export const WebViewContainer = styled.View`
  flex: 1;
`;

