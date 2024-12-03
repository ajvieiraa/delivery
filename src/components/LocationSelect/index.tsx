import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Platform, TextInput, View } from 'react-native';

import { Cidade, Estado } from '../../services/api';
import useRequest from '../../services/api/store/hook';
import Storage from '../../services/storage';

import { useAuth } from '../../store/auth';
import { showMessage } from '../../utils/message';

import rem from '../../utils/rem';
import { has } from '../../utils/string';

import Spacer from '../Spacer';

import {
  BackContainer,
  Container,
  ContainerData,
  Description,
  Header,
  HeaderRow,
  ItemContainer,
  ItemText,
  SearchContainer,
  SearchInput,
  Title,
} from './styles';

interface CityItemProps {
  item: Cidade;
  onPress(item: Cidade): void;
}

interface StateItemProps {
  item: Estado;
  onPress(item: Estado): void;
}

type ItemProps = CityItemProps | StateItemProps;

const ItemComponent: React.FC<ItemProps> = ({ item, onPress }) => {
  return (
    <ItemContainer
      key={item.id.toString()}
      onPress={() => onPress(item as any)}
    >
      <ItemText>{item.nome}</ItemText>
    </ItemContainer>
  );
};

const Item = memo(ItemComponent);

const LocationSelect: React.FC = () => {
  const { registerLocation, auth } = useAuth();

  const [state, setState] = useState<Estado>();
  // const [city, setCity] = useState<Cidade>();
  const [filtered, setFiltered] = useState<Estado[] | Cidade[]>();

  const [hasPrevious, setHasPrevious] = useState(false);

  const input = useRef<TextInput>(null);

  const { data: states } = useRequest<{
    data: Estado[];
  }>('/localizacao/estado');

  // const { data: cities } = useRequest<{
  //   data: Cidade[];
  // }>(`/localizacao/estado/${state?.id}`, { disabled: !state });

  const { data: attendanceCities } = useRequest<{ data: Cidade[] }>(
    '/localizacao/atendimento/cidade',
  );

  const handleChangeText = useCallback(
    (text: string) => {
      if (text.length === 0) return setFiltered(undefined);

      // const toSearch = !state ? states : cities;
      const toSearch = attendanceCities;
      setFiltered(toSearch?.data.filter((item) => has(item.nome, text)));
    },
    [attendanceCities],
  );

  useEffect(() => {
    setFiltered(undefined);
    input.current?.setNativeProps({ text: '' });

    // if (city && state) registerLocation({ city, state });
  }, [state, registerLocation]);

  const handleRequestClose = useCallback(async () => {
    if (state) setState(undefined);
    else if (auth?.user.id) {
      const previousLocation = await Storage.getLocation(auth?.user.id);
      if (previousLocation) registerLocation(previousLocation);
    }
  }, [state, auth, registerLocation]);

  const handlePressAttendanceCity = useCallback(
    (_city: Cidade) => {
      const uf = states?.data.find((_state) => _state.uf === _city.uf);
      registerLocation({
        city: {
          ..._city,
          nome: _city.nome.substring(0, _city.nome.indexOf(',')),
        },
        state: uf,
      });

      showMessage('Localização alterada!');
    },
    [registerLocation, states],
  );

  useEffect(() => {
    (async () => {
      if (!auth?.user.id) return;

      const previousLocation = await Storage.getLocation(auth?.user.id);
      if (previousLocation) setHasPrevious(true);
    })();
  }, [auth]);

  return (
    <Modal transparent onRequestClose={handleRequestClose} animationType="fade">
      <Container behavior={Platform.select({ ios: 'padding' })}>
        <Header>
          <HeaderRow>
            <BackContainer onPress={handleRequestClose}>
              {hasPrevious && <Ionicons name="arrow-back" size={rem(3)} />}
            </BackContainer>

            <Title>
              {/* {!state ? 'Selecione o seu estado' : 'Selecione a sua cidade'} */}
              Selecione a cidade
            </Title>

            <BackContainer />
          </HeaderRow>
          <Description>Essas são as cidades com atendimento.</Description>
          <SearchContainer>
            <SearchInput
              ref={input}
              onChangeText={handleChangeText}
              placeholder="Buscar"
            />
          </SearchContainer>
        </Header>

        <ContainerData>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={(filtered as Cidade[] | undefined) || attendanceCities?.data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer height={0.1} separator />}
            renderItem={({ item }) => (
              <Item
                item={{ ...item, nome: `${item.nome}, ${item.uf}` }}
                onPress={handlePressAttendanceCity}
              />
            )}
          />
        </ContainerData>
        {/* {!state && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={(filtered as Estado[] | undefined) || states?.data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer height={0.1} separator />}
            renderItem={({ item }) => <Item item={item} onPress={setState} />}
          />
        )}

        {state && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filtered || cities?.data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer height={0.1} separator />}
            renderItem={({ item }) => <Item item={item} onPress={setCity} />}
          />
        )} */}
      </Container>
    </Modal>
  );
};

export default LocationSelect;
