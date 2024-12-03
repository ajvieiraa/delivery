import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  margin-top: 24px;
`;

export const Expandable = styled.TouchableOpacity`
  padding: 16px 0;
  flex-direction: row;
`;

export const ExpandableText = styled.Text<{ isSelected: boolean }>`
  font-family: ${({ isSelected }) => (isSelected ? 'Nunito_700Bold' : 'Nunito_400Regular')};
  color: ${colors.muted};
  font-size: 18px;
`;

export const MethodContainer = styled.View``;

export const Icon = styled(MaterialIcons)`
  margin-right: 8px;
`;
