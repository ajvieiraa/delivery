import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ActionSheetIOS, Pressable, Text, View } from 'react-native';
import { Container, Label } from '../Input/styles';

interface Props {
  control: Control;
  name: string;
  label?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  error?: string;
  onChange?: (option: { label: string; value: any }) => void;
}

const SelectIOS: React.FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  error,
  options,
  onChange: _onChange,
}) => {
  const [selected, setSelected] = useState<{ label: string; value: any }>();

  const showActionSheet = (onChange: any) => {
    if (!options || options.length === 0) return;

    const optionLabels = options.map((opt) => opt.label);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', ...optionLabels],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          const selectedOption = options[buttonIndex - 1];
          _onChange?.(selectedOption);
          onChange(selectedOption.value);
          setSelected(selectedOption);
        }
      }
    );
  };

  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Pressable
            onPress={() => showActionSheet(onChange)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: error ? '#E74C3C' : '#000',
              borderRadius: 6,
              backgroundColor: '#fff',
            }}
          >
            <View pointerEvents="none">
              <Text
                style={{
                  fontFamily: 'Nunito_400Regular',
                  fontSize: 16,
                  color: selected ? '#000' : '#aaa',
                }}
              >
                {placeholder || selected?.label || 'Toque para selecionar'}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </Container>
  );
};

export default SelectIOS;
