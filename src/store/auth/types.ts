import { Dispatch, SetStateAction } from 'react';
import { Cidade, Endereco, Estado } from '../../services/api';

export type Auth = {
  access_token: string;
  expires_at: Date;
  user: {
    id: number;
    name: string;
    tipo: string;
  };
};

export type AuthContextProps = {
  auth: Auth | null | undefined;
  setAuth: Dispatch<SetStateAction<Auth | undefined | null>>;
  address: Endereco | undefined;
  setAddress: Dispatch<SetStateAction<Endereco | undefined>>;
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
  loading: boolean;  
};

export type Location =
  | {
      state?: Estado;
      city?: Cidade;
    }
  | undefined
  | null;

export type Update = (data: { email: string; name: string }) => void;
