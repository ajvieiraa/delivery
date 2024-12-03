import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import colors from '../../assets/colors';
import ImageWithLoading from '../ImageWithLoading';

export const Wrapper = styled.View`
  border: 1px ${colors.line};
  padding: 16px 4px;
  border-radius: 8px;
  margin-top: 16px;
`;

export const Container = styled.View`
  flex-direction: row;
`;

export const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  margin-right: 8px;
`;

export const Image = styled(ImageWithLoading)`
  width: 80px;
  height: 80px;
`;

export const InfoContainer = styled.View`
  justify-content: space-between;
  flex: 1;

  margin-right: -4px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-right: -16px;
`;

export const Name = styled.Text`
  font-family: 'Nunito_700Bold';
  color: ${colors.regular};
`;

export const Description = styled.Text`
  font-family: 'Nunito_300Light';
  margin-top: 4px;
  color: ${colors.regular};
`;

export const Price = styled.Text`
  font-size: 16px;
  font-family: 'Nunito_700Bold';
  margin-top: 8px;
  color: ${colors.regular};
`;

export const ActionsContainer = styled.View`
  width: 120px;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin-right: -6px;
`;

export const Quantity = styled.Text`
  /* height: 48px; */
  width: 48px;

  font-size: 16px;

  text-align: center;

  font-family: 'Nunito_400Regular';
`;

export const IconContainer = styled.TouchableOpacity`
  border: 2px ${colors.regular};

  height: 28px;
  width: 28px;
  border-radius: 14px;

  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Icon = styled(MaterialIcons)``;

export const Supplier = styled.Text`
  font-family: 'Nunito_300Light';
  font-size: 10px;
  color: ${colors.regular};

  margin-top: 8px;
`;

export const RedirectButtonContainer = styled.TouchableOpacity``;

export const RedirectButton = styled.Text`
  font-family: 'Nunito_600SemiBold';
  color: ${colors.primary};
  font-size: 14px;

  margin-right: 8px;
`;
