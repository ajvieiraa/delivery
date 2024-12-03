import React, { useCallback, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

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
  error?: { message?: string };
  maskType: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
};

type RefProps = TextInputMask & {
  getRawValue(): string;
};

const MaskedInput: React.FC<Props> = ({
  control,
  name,
  label,
  rules,
  defaultValue,
  inputProps,
  error,
  maskType,
  maskOptions,
}) => {
  const [focused, setFocused] = useState(false);

  const input = useRef<RefProps>(null);
  const [maskedValue, setMaskedValue] = useState<string | undefined>(
    defaultValue,
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback((onBlur: () => void) => {
    setFocused(false);
    onBlur();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Container>
          {label && <Label>{label}</Label>}
          <TextInput
            {...inputProps}
            ref={input}
            onBlur={(e) => {
              handleBlur(onBlur);
              inputProps?.onBlur?.(e);
            }}
            onFocus={(e) => {
              handleFocus();
              inputProps?.onFocus?.(e);
            }}
            includeRawValueInChangeText
            onChangeText={(text, rawText) => {
              setMaskedValue(text);

              const raw = Array.isArray(rawText) ? rawText.join('') : rawText;
              onChange(raw);
              if (inputProps?.onChangeText && raw) inputProps.onChangeText(raw);
            }}
            value={maskedValue}
            selectionColor={colors.primary}
            focused={focused}
            type={maskType}
            options={maskOptions}
            error={error?.message}
          />
          <Error>{error?.message}</Error>
        </Container>
      )}
      rules={rules}
      defaultValue={defaultValue || ''}
    />
  );
};

export default MaskedInput;
