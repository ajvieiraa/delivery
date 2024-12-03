import { MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { KeyboardAvoidingView, Modal, Platform } from 'react-native';

import colors from '../../assets/colors';

import rem from '../../utils/rem';

import {
  BackDrop,
  Container,
  ContentContainer,
  Header,
  IconContainer,
  Title,
} from './styles';

type Props = {
  title?: string;

  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const BottomModal: React.FC<Props> = ({
  title,
  children,
  visible,
  setVisible,
}) => {
  if (!visible) return null;

  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="slide"
    >
      <Container>
        <BackDrop onTouchEnd={() => setVisible(false)} />

        <KeyboardAvoidingView behavior={Platform.select({ ios: 'position' })}>
          <Header>
            <Title>{title}</Title>

            <IconContainer onPress={() => setVisible(false)}>
              <MaterialIcons name="close" size={rem(2.4)} color={colors.regular} />
            </IconContainer>
          </Header>
          <ContentContainer>{children}</ContentContainer>
        </KeyboardAvoidingView>
      </Container>
    </Modal>
  );
};

export default BottomModal;
