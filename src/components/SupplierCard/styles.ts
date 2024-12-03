import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  border-width: 1px;
  border-color: ${colors.line};

  margin-top: 16px;

  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding-bottom: 4px;

  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${colors.primary};
`;

export const CardButton = styled.TouchableOpacity`
  padding: 16px;
`;

export const Name = styled.Text`
  font-family: 'Nunito_600SemiBold';
  font-size: 16px;
  flex: 1;

  align-self: flex-start;
  color: ${colors.primary};
`;

export const Label = styled.Text`
  margin-top: 8px;
  font-family: 'Nunito_400Regular';
  font-size: 12px;

  color: ${colors.muted};
`;

export const Value = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 14px;
`;
