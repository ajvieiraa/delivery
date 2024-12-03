import styled from 'styled-components/native';
import colors from '../../assets/colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  padding: 32px 0 0;
  border-color: ${colors.line};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: 'Nunito_700Bold';
  font-size: 22px;
`;

export const Description = styled.Text`
  text-align: center;
  font-family: 'Nunito_300Light';
  color: ${colors.regular};
  font-size: 14px;

  margin-top: 8px;
  margin-bottom: 16px;
`;

export const BackContainer = styled.TouchableOpacity`
  /* background-color: red; */
  flex: 1;
`;

export const ItemContainer = styled.TouchableOpacity`
  padding: 16px 0;
`;

export const ItemText = styled.Text`
  text-align: center;
  font-family: 'Nunito_400Regular';
  color: ${colors.regular};
`;

export const SearchContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${colors.line};
`;

export const SearchInput = styled.TextInput<{ ref: any }>`
  text-align: center;
  font-family: 'Nunito_400Regular';

  padding: 8px 32px;

  border-radius: 6px;
  margin: 0px 20px 0px 20px;

  border-width: 1px;
  border-color: ${({ focused, error }) => {
    if (error) return colors.danger;
    if (focused) return colors.primary;
    return '#000'; 
  }};
`;


export const ContainerData = styled.View`
  border-bottom-color: #000;
  border-bottom-width: 1px;
  padding: 5px; 
  margin: 10px; 
`
