import React, { useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { display } from '../../utils/date';
import { Container, Error, Label, TextInput } from '../Input/styles';

interface Props {
  control: Control;
  name: string;
  label?: string;
  mode: 'date' | 'time';
  defaultDate?: Date;
  format?: string;
  placeholder?: string;
  error?: { message: string };
}

const DateTimePicker: React.FC<Props> = ({
  control,
  name,
  label,
  mode,
  defaultDate,
  format,
  placeholder = '',
  error,
}) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(defaultDate);

  // Formatando a data
  const formated = useMemo(() => {
    if (!date) return placeholder;
    if (format) return display(date, format);
    return display(date, mode === 'date' ? 'P' : 'p');
  }, [date, format, mode, placeholder]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultDate}
      render={({ field: { onChange, value } }) => (
        <Container>
          {label && <Label>{label}</Label>}

          {/* Pressable com estilo completo e sem borda externa */}
          <Pressable
            onPress={() => setVisible(true)}
            style={{ width: '100%', marginBottom: 15 }}
          >
            <TextInput
              editable={false}
              pointerEvents="none"
              value={formated}
              isPlaceholder={!value}
              error={error?.message}
              style={{
                width: '100%',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: error ? '#E74C3C' : '#000',
                borderRadius: 6,
                backgroundColor: '#fff',
              }}
            />
          </Pressable>

          <DateTimePickerModal
            isVisible={visible}
            mode={mode}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            headerTextIOS="Selecione"
            date={value || defaultDate || new Date()}
            onConfirm={(selectedDate) => {
              setDate(selectedDate);
              onChange(selectedDate);
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          />

          {error && <Error>{error?.message}</Error>}
        </Container>
      )}
    />
  );
};

export default DateTimePicker;
