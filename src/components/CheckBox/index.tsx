import React, { useEffect, useState } from 'react';
import Check from 'expo-checkbox';
import { Control, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { Container } from './styles';

import colors from '../../assets/colors';

import { isIOS } from '../../utils/platform';
import rem from '../../utils/rem';

type Props = {
  control: Control;
  name: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  value?: boolean;
  allowUncheck?: boolean;
};

const CheckBox: React.FC<Props> = ({
  control,
  name,
  defaultValue = false,
  onChange: handleChange,
  value: _value,
  allowUncheck = true,
}) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    if (_value !== undefined) setChecked(_value);
  }, [_value]);

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: {onChange} }) =>
          isIOS ? (
            <Container
              onPress={() => {
                const value = !checked;

                if (!allowUncheck && value === false) return;

                onChange(value);
                setChecked(value);
                handleChange?.(value);
              }}
            >
              {checked ? (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={rem(2.4)}
                  color={colors.primary}
                />
              ) : (
                <Ionicons
                  name="ellipse-outline"
                  size={rem(2.4)}
                  color={colors.muted}
                />
              )}
            </Container>
          ) : (
            <Check
              value={checked}
              disabled={!allowUncheck && checked}
              onValueChange={(value) => {
                onChange(value);
                setChecked(value);

                if (handleChange) handleChange(value);
              }}
              color={checked ? colors.primary : colors.muted}
            />
          )
        }
      />
    </Container>
  );
};

export default CheckBox;
