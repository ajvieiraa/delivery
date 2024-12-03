import React from 'react';

import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { keyboardAvoidingViewProps } from '../../utils/platform';

import { Container } from './styles';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
} & ScrollViewProps;

const WrappedScroll: React.FC<Props> = ({
  children,
  contentContainerStyle,
  keyboardVerticalOffset,
  ...props
}) => {
  return (
    <Container
      behavior={keyboardAvoidingViewProps.behavior}
      keyboardVerticalOffset={
        keyboardVerticalOffset !== undefined
          ? keyboardVerticalOffset
          : keyboardAvoidingViewProps.keyboardVerticalOffset
      }
    >
      <ScrollView
        {...props}
        contentContainerStyle={[contentContainerStyle, styles.contentContainer]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: '5%',
  },
});

export default WrappedScroll;
