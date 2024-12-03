import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  /* flex: 1; */
`;

export const ModalContentContainer = styled.View`
  padding-top: 16px;
  flex: 1;
  justify-content: space-between;
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const Text = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 16px;
  color: ${colors.regular};

  padding-right: 8px;

  width: 90%;
`;

export const IconContainer = styled.View``;

export const LocationLabel = styled.Text`
  font-family: 'Nunito_300Light';
  color: ${colors.regular};
  text-align: center;
  font-size: 14px;
`;

export const Location = styled.Text`
  font-family: 'Nunito_600SemiBold';
  color: ${colors.regular};
  text-align: center;
  font-size: 18px;

  margin-bottom: 12px;
`;

export const TouchableText = styled.Text`
  font-family: 'Nunito_400Regular';
  color: ${colors.primary};
  text-align: center;
  font-size: 14px;

  margin-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  /* padding: 0 16px; */
`;
