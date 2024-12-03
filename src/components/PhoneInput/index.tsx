import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import {
  NativeSyntheticEvent,
  TextInput as TInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import colors from '../../assets/colors';
import { Container, Label, StyledMaskedInput, Error } from './styles';

type Rules = Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;

type Props = {
  control?: Control;
  name: string;
  label?: string;
  rules?: Rules;
  defaultValue?: string;
  inputProps?: TextInputProps;
  error?: { message?: string };
  setValue?: (name: string, value: any, config?: object) => void;
};

type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

const PhoneInput: React.FC<Props> = ({
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

  const handleFocus = useCallback((e: FocusEvent) => {
    setFocused(true);
    inputProps?.onFocus && inputProps.onFocus(e);
  }, [inputProps]);

  const handleBlur = useCallback((e: FocusEvent, onBlur?: () => void) => {
    setFocused(false);
    onBlur && onBlur();
    inputProps?.onBlur && inputProps.onBlur(e);
  }, [inputProps]);

  useEffect(() => {
    if (defaultValue && typeof setValue === 'function') {
      setValue(name, defaultValue, { shouldValidate: true, shouldDirty: true });
    }
  }, [defaultValue, setValue, name]);

  const renderInput = ({ field: { onChange, onBlur, value } }) => (
    <Container>
      {label && <Label>{label}</Label>}
      <StyledMaskedInput
        {...inputProps}
        ref={ref}
        onBlur={(e) => handleBlur(e, onBlur)}
        onFocus={handleFocus}
        onChangeText={(text) => onChange(text)}
        value={value}
        mask="(99) 99999-9999"
        placeholder={inputProps?.placeholder || 'Telefone para Contato'}
        keyboardType="phone-pad"
        focused={focused}
        error={error?.message}
        isPlaceholder={!value}
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
      <StyledMaskedInput
        {...inputProps}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => setValue && setValue(name, text)}
        mask="(99) 99999-9999"
        placeholder={inputProps?.placeholder || 'Telefone para Contato'}
        keyboardType="phone-pad"
        focused={focused}
        isPlaceholder={!inputProps?.value}
      />
      {error && <Error>{error.message}</Error>}
    </Container>
  );
};

export default PhoneInput;
