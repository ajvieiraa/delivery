import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.TouchableOpacity`
  padding: 24px 8px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};
`;

export const Location = styled.Text`
  font-size: 14px;
  font-family: 'Nunito_300Light';
  color: ${colors.regular};

  margin-top: 8px;
`;
