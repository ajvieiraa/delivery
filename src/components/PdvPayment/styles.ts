import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  /* flex: 1; */
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.muted};
`;

export const SubTitle = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 12px;
  color: ${colors.muted};
  padding-left: 36px;
`;

export const Text = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const CopyButtonContainer = styled.TouchableOpacity`
  padding: 8px 36px;
`;

export const CopyButton = styled.Text`
  color: ${colors.primary};
  font-family: 'Nunito_400Regular';
  font-size: 12px;
`;
