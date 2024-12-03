import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.overlay};
`;

export const BackDrop = styled.View`
  background-color: transparent;
  height: 10%;
`;

export const ContentContainer = styled.View`
  padding: 0 16px;
  background-color: ${colors.background};
  flex-grow: 1;
`;

export const contentContainerStyle = {
  paddingHorizontal: 16,
  backgroundColor: colors.background,
  flexGrow: 1,
}

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  padding-bottom: 24px;
  background-color: ${colors.background};

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  border-bottom-width: 1px;
  border-color: ${colors.line};
`;

export const IconContainer = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 18px;
  color: ${colors.regular};
`;
