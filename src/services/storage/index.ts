import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, Location } from '../../store/auth';
import { Endereco } from '../api';

enum Key {
  AUTH = '@CSF:AUTH',
  ADDRESS = '@CSF:ADDRESS',
  LOCATION = '@CSF:LOCATION',
}

export type Address = {
  userId: number;
  address: Endereco;
};

async function setAuth (data: Auth) {
  await AsyncStorage.setItem(Key.AUTH, JSON.stringify(data));
}

async function getAuth (): Promise<Auth | null> {
  try {
    const str = await AsyncStorage.getItem(Key.AUTH);
    if (str) return JSON.parse(str);

    return null;
  } catch (err) {
    return null;
  }
}

async function clearAuth () {
  await AsyncStorage.removeItem(Key.AUTH);
}

async function storeAddress (userId: number, address: Endereco) {
  try {
    const str = await AsyncStorage.getItem(Key.ADDRESS);
    const addresses: Address[] = str ? JSON.parse(str) : [];

    const index = addresses.findIndex((_address) => _address.userId === userId);

    const newAddress: Address = { userId, address };

    const updatedAddresses: Address[] =
      index === -1
        ? [...addresses, newAddress]
        : [
            ...[...addresses].splice(0, index),
            newAddress,
            ...[...addresses].splice(index + 1),
          ];

    AsyncStorage.setItem(Key.ADDRESS, JSON.stringify(updatedAddresses));
  } catch (err) {
    AsyncStorage.setItem(Key.ADDRESS, JSON.stringify([]));
  }
}

async function getAddress (userId: number) {
  try {
    const str = await AsyncStorage.getItem(Key.ADDRESS);
    const addresses: Address[] = str ? JSON.parse(str) : [];

    const address: Address | undefined = addresses.find(
      (_address) => _address.userId === userId,
    );

    return address;
  } catch (err) {
    AsyncStorage.setItem(Key.ADDRESS, JSON.stringify([]));
    return undefined;
  }
}

async function storeLocation (userId: number, location: Location) {
  try {
    AsyncStorage.setItem(`${Key.LOCATION}_${userId}`, JSON.stringify(location));
  } catch (err) {}
}

async function getLocation (userId: number) {
  try {
    const str = await AsyncStorage.getItem(`${Key.LOCATION}_${userId}`);
    const location: Location = str ? JSON.parse(str) : undefined;

    return location;
  } catch (err) {
    await AsyncStorage.removeItem(`${Key.LOCATION}_${userId}`);
    return undefined;
  }
}

const Storage = {
  setAuth,
  getAuth,
  clearAuth,
  storeAddress,
  getAddress,
  storeLocation,
  getLocation,
};

export default Storage;
