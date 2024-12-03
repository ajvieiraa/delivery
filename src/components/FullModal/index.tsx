import { MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import colors from '../../assets/colors';

import rem from '../../utils/rem';

import {
  BackDrop,
  Container,
  contentContainerStyle,
  Header,
  IconContainer,
  Title,
} from './styles';

type Props = {
  title?: string;

  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children?:React.ReactNode;
  footer?: React.ReactNode;
};

const FullModal: React.FC<Props> = ({
  title,
  children,
  visible,
  setVisible,
  footer,
}) => {


  return (
    <Modal
      onRequestClose={() => setVisible(false)} // Altere esta linha
      visible={visible}
      transparent
      animationType="slide"
    >
      <Container>
        <BackDrop onTouchEnd={() => setVisible(false)} />

        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding' })}
          style={{
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Header>
            <Title>{title}</Title>

            <IconContainer onPress={() => setVisible(false)}>
              <MaterialIcons
                name="close"
                size={rem(2.4)}
                color={colors.regular}
              />
            </IconContainer>
          </Header>

          <ScrollView
            contentContainerStyle={contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          <View style={{ backgroundColor: colors.background }}>{footer}</View>
        </KeyboardAvoidingView>
      </Container>
    </Modal>
  );
};

export default FullModal;
