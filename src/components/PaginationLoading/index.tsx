import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../../assets/colors';

interface Props {
  loading: boolean;
}

const PaginationLoading: React.FC<Props> = ({ loading }) => {
  return loading ? (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={{ paddingVertical: 32 }}
    />
  ) : null;
};

export default PaginationLoading;
