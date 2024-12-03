import styled from 'styled-components/native';

import colors from '../../assets/colors';

export const BannerContainer = styled.View`
  width: 112%;
  max-height: 200px;

  margin: 0 -6% 24px;

  position: relative;
`;

export const Banner = styled.Image.attrs({ resizeMode: 'cover' })`
  width: 100%;
  height: 100%;
`;

export const BannerTitleContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;

  padding: 8px;
  padding-left: 12px;
`;

export const BannerTitle = styled.Text`
  color: #fff;
  font-family: 'Nunito_600SemiBold';
  font-size: 18px;
`;

export const Cards = styled.View`
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
  margin-bottom: 4px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  padding: 8px;
`;

export const Image = styled.Image.attrs({ resizeMode: 'cover' })`
  height: 120px;
  width: 100%;
`;

export const Name = styled.Text`
  text-align: center;
  margin-top: 8px;
  color: ${colors.regular};
  font-family: 'Nunito_400Regular';
`;

export const ButtonContainer = styled.View`
  padding: 0 5%;
  background-color: ${colors.background};
`;
