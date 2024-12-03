import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  background-color: ${colors.background};
  /* flex: 1; */
  min-height: 40px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  /* flex: 1; */
`;

export const TabContainer = styled.TouchableOpacity<{ active?: boolean }>`
  border-bottom-width: 1px;
  flex: 1;

  ${({ active }) =>
    !active
      ? `border-color: ${colors.line}`
      : `border-color: ${colors.primary}`}
`;

export const TabLabel = styled.Text<{ active?: boolean }>`
  padding: 12px 8px 16px;
  /* flex: 1; */
  text-align: center;

  font-family: 'Nunito_400Regular';

  ${({ active }) =>
    !active
      ? `opacity: 0.6; color: ${colors.regular};`
      : `color: ${colors.primary};`}
`;
