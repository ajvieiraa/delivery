import styled from 'styled-components/native';
import colors from '../../assets/colors';
import ImageWithLoading from '../ImageWithLoading';

export const CategoryCardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  margin-right: -4px;
  margin-top: 8px;
`;

export const CardContainer = styled.View`
  width: 48%;
  align-items: center;

  border: 1px ${colors.line};
  border-radius: 8px;

  margin-right: 4px;
  margin-bottom: 16px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;

  padding: 8px;
`;

export const Image = styled(ImageWithLoading).attrs({ resizeMode: 'cover' })`
  height: 120px;
  width: 100%;
`;

export const Name = styled.Text`
  text-align: center;
  margin-top: 8px;
  color: ${colors.regular};
  font-family: 'Nunito_400Regular';
`;
