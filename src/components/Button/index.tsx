import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../../assets/colors';

import { Container, Text } from './styles';

type Props = {
  children?: string;
  onPress(): void;
  enabled?: boolean;
  disabled?: boolean;
  theme?: keyof typeof colors;
  loading?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onPress,
  disabled,
  enabled = true,
  theme = 'primary',
  loading,
}) => {
  return (
    <View onTouchEnd={() => !!enabled && !loading && onPress()}>
      <Container theme={theme} enabled={!!enabled && !loading}>
        <Text>{children}</Text>
        {loading && <ActivityIndicator color={colors.in_primary} />}
      </Container>
    </View>
  );
};

export default Button;
