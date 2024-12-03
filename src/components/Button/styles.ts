import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import colors from '../../assets/colors';

export const Container = styled(RectButton)<{
  enabled?: boolean;
  theme: 'primary' | 'secondary' | 'muted';
}>`
  flex-direction: row;

  width: 100%;
  border-radius: 6px;

  background-color: ${({ theme }) => colors[theme]};

  justify-content: center;
  align-items: center;

  margin-bottom: 16px;

  opacity: ${({ enabled }) => (enabled === false ? 0.6 : 1)};
`;

export const Text = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.in_primary};
  padding: 16px;
`;
