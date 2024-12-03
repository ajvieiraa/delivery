import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import colors from '../../assets/colors';

import { Action, Container } from './styles';

type Props = {
  children?: string;
  visible?: boolean;
  hideText?: boolean;
};

const LoadingSpinner: React.FC<Props> = ({ children, visible, hideText }) => {
  if (visible === false) return null;

  return (
    <Modal >
      <Container>
        <ActivityIndicator size="large" color={colors.primary} />
        {!hideText && <Action>{children || 'Carregando'}</Action>}
      </Container>
    </Modal>
  );
};

export default LoadingSpinner;
