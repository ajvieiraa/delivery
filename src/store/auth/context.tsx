import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Notifications from 'expo-notifications';
import api, {
  clearToken,
  Endereco,
  LoginResponse,
  UsuarioTipo,
} from '../../services/api';
import { useRequestConfig } from '../../services/api/store/hook';
import Storage from '../../services/storage';
import { Auth, AuthContextProps, Location, Update } from './types';

const AuthContext = React.createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>();
  const [address, setAddress] = useState<Endereco>();
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const { setToken } = useRequestConfig();

  useEffect(() => {
    (async () => {
      const stored = await Storage.getAuth();

      if (stored) {
        setAuth(stored);
        setToken(stored.access_token);
      } else {
        setAuth(null);
      }

      const storedAddress = await (async () => {
        if (stored?.user.id) {
          const userAddress = await Storage.getAddress(stored?.user.id);
          if (userAddress) return userAddress;
        }
        return Storage.getAddress(-1);
      })();

      if (storedAddress) setAddress(storedAddress.address);

      const storedLocation = await (async () => {
        if (stored?.user.id) {
          const userLocation = await Storage.getLocation(stored?.user.id);
          if (userLocation) return userLocation;
        }
        return Storage.getLocation(-1);
      })();

      if (storedLocation) setLocation(storedLocation);
      else setLocation(null);

      setLoading(false); // Carregamento completo
    })();
  }, [setToken]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, address, setAddress, location, setLocation, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

export const useAuth = () => {
  const {
    auth,
    setAuth,
    address,
    setAddress,
    location,
    setLocation,
    loading,
  } = React.useContext(AuthContext);
  const { setToken } = useRequestConfig();

  const login = async (data: LoginResponse) => {
    const parsed = {
      access_token: data.access_token,
      expires_at: new Date(new Date().valueOf() + 1000 * data.expires_in),
      user: data.user,
    };

    setToken(data.access_token);
    await Storage.setAuth(parsed);

    setAuth(parsed);

    const storedAddress = await Storage.getAddress(parsed.user.id || -1);
    if (storedAddress) setAddress(storedAddress.address);
  };

  const registerAddress = async (_address: Endereco) => {
    setAddress(_address);
    await Storage.storeAddress(auth?.user.id || -1, _address);
  };

  const registerLocation = useCallback(
    async (_location: Location) => {
      setLocation(_location);
      await Storage.storeLocation(auth?.user.id || -1, _location);
    },
    [auth, setLocation],
  );

  const logout = async () => {
    await Storage.clearAuth();
    clearToken();
    setAuth(null);
    const storedAddress = await Storage.getAddress(-1);
    setAddress(storedAddress?.address);
  };

  const isClient = useMemo(
    () =>
      auth?.user.tipo === UsuarioTipo.CLIENTE ||
      auth?.user.tipo === UsuarioTipo.ADMINISTRADOR,
    [auth],
  );

  const isPdv = useMemo(
    () => auth?.user.tipo === UsuarioTipo.PONTO_DE_VENDA,
    [auth],
  );

  return {
    auth,
    setAuth,
    address,
    setAddress,
    location,
    setLocation,
    registerAddress,
    registerLocation,
    login,
    logout,
    isClient,
    isPdv,
    loading,
  };
};

