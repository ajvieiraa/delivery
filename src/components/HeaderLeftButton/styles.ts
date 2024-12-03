import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 32px;
  overflow: hidden;

  width: 48px;
  height: 48px;

  margin-left: 4px;
`;

export const Button = styled(RectButton)`
  padding: 8px;
`;
