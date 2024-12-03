import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View<{ active?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  background-color: ${colors.background};

  border-width: 1px;
  border-color: ${({ active }) => (active ? colors.primary : colors.line_strong)};
`;

export const Circle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;

  background-color: ${colors.primary};
`;

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;

  padding: 8px 0;
`;

export const Label = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.muted};
  font-size: 14px;

  padding-left: 6px;
`;
