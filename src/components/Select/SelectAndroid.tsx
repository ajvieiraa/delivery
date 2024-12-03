import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import BottomModal from '../BottomModal';
import { Container, Label, TextInput } from '../Input/styles';
import { Option, OptionLabel, Separator } from './styles';

interface Props {
  control: Control;
  name: string;
  label?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  error?: string;
  onChange?: (option: { label: string; value: any }) => void;
}

const SelectAndroid: React.FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  error,
  options,
  onChange: _onChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: any }>();

  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextInput isPlaceholder={!selected} error={error} editable={false}>
          {placeholder || selected?.label || 'Toque para selecionar'}
        </TextInput>
      </TouchableOpacity>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <BottomModal visible={visible} setVisible={setVisible} title="Selecione">
            <FlatList
              data={options}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ marginTop: -16 }}
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({ item }) => (
                <Option
                  onPress={() => {
                    _onChange?.(item);
                    onChange(item.value);
                    setSelected(item);
                    setVisible(false);
                  }}
                >
                  <OptionLabel>{item.label}</OptionLabel>
                </Option>
              )}
            />
          </BottomModal>
        )}
      />
    </Container>
  );
};

export default SelectAndroid;
