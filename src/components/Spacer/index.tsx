import React from 'react';
import { View } from 'react-native';

import colors from '../../assets/colors';

import rem from '../../utils/rem';

interface Props {
  width?: number | string;
  height?: number | string;
  separator?: boolean;
}

const Spacer: React.FC<Props> = ({ width = '100%', height = 0, separator }) => {
  return (
    <View
      style={{
        width: typeof width === 'string' ? width : rem(width),
        height: typeof height === 'string' ? height : rem(height),
        backgroundColor: separator ? colors.line : undefined,
      }}
    />
  );
};

export default Spacer;
