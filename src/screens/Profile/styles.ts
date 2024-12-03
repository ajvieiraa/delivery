import styled from 'styled-components/native';

import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const ContentContainer = styled.View`
  padding: 16px 0;
  flex-grow: 1;
  justify-content: space-between;
`;

export const SubTitle = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 18px;
  color: ${colors.regular};

  padding-bottom: 8px;
  margin-bottom: 12px;
`;
