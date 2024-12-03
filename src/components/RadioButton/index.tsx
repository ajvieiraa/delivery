import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Circle, Container, Label, Wrapper } from './styles';

type Props = {
  control: Control;
  name: string;
  defaultValue?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
  noUncheck?: boolean;
};

const RadioButton: React.FC<Props> = ({
  control,
  name,
  defaultValue,
  label,
  onChange: _onChange,
  noUncheck,
}) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange } }) => (
        <Wrapper
          onPress={() => {
            if (value && noUncheck) return;

            const newValue = !value;
            setValue(newValue);
            onChange(newValue);
            _onChange?.(newValue);
          }}
        >
          <Container active={value}>{value && <Circle />}</Container>
          {!!label && <Label>{label}</Label>}
        </Wrapper>
      )}
    />
  );
};

export default RadioButton;
