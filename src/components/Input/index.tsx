import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import {
  NativeSyntheticEvent,
  TextInput as TInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import colors from '../../assets/colors';

import { Container, Label, TextInput, Error } from './styles'; 

type Rules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

type Props = {
  control?: Control;
  name: string;
  label?: string;
  rules?: Rules;
  defaultValue?: string;
  inputProps?: TextInputProps;
  autoComplete?: TextInputProps;
  error?: { message?: string };
  setValue?: (name: string, value: any, config?: object) => void;
};

type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

const Input: React.FC<Props> = ({
  control,
  name,
  label,
  rules,
  defaultValue,
  inputProps,
  error,
  setValue,
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<TInput>(null);

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      console.log('handleFocus');
      setFocused(true);
      inputProps?.onFocus && inputProps.onFocus(e);
    },
    [inputProps],
  );

  const handleBlur = useCallback(
    (e: FocusEvent, onBlur?: () => void) => {
      console.log('handleBlur');
      setFocused(false);
      onBlur && onBlur();
      inputProps?.onBlur && inputProps.onBlur(e);
    },
    [inputProps],
  );
  useEffect(() => {
    console.log('useEffect - defaultValue:', defaultValue);
    console.log('setValue:', setValue); 
    if (defaultValue && typeof setValue === 'function') {
      setValue(name, defaultValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [defaultValue, setValue, name]);

  useEffect(() => {
    console.log('useEffect - inputProps', inputProps);
    if (inputProps?.autoFocus)
      setTimeout(() => {
        ref.current?.focus();
      }, 10);
  }, [inputProps]);

  const renderInput = ({ field: { onChange, onBlur, value } }) => (
    <Container>
      {label && <Label>{label}</Label>}
      <TextInput
        {...inputProps}
        ref={ref}
        onBlur={(e) => handleBlur(e, onBlur)}
        onFocus={handleFocus}
        onChangeText={(text) => {
          console.log('onChangeText', text);
          onChange(text);
        }}
        value={value}
        selectionColor={colors.primary}
        focused={focused}
        error={error?.message}
        accessibilityLabel={label}
        placeholder={label}
        accessible={true}
      />
      {error && <Error>{error.message}</Error>}
    </Container>
  );

  if (control) {
    return (
      <Controller
        control={control}
        name={name}
        render={renderInput}
        rules={rules}
        defaultValue={defaultValue || ''}
      />
    );
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <TextInput
        {...inputProps}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => {
          console.log('onChangeText', text);
        }}
        focused={focused}
      />
      {error && <Error>{error.message}</Error>}
    </Container>
  );
};

export default Input;
