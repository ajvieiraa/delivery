import React, { Dispatch, SetStateAction, useState } from 'react';

type ContextProps = {
  baseUrl: string | undefined;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

export const Context = React.createContext<ContextProps>({
  baseUrl: undefined,
  token: undefined,
  setToken: () => null,
});

type Props = {
  baseUrl?: string;
};

function normalizeBaseUrl (url?: string) {
  if (!url) return undefined;

  if (url.charAt(url.length - 1) !== '/') return `${url}/`;

  return url;
}

const RequestProvider: React.FC<Props> = ({ children, baseUrl }) => {
  const [token, setToken] = useState<string>();

  return (
    <Context.Provider
      value={{ baseUrl: normalizeBaseUrl(baseUrl), token, setToken }}
    >
      {children}
    </Context.Provider>
  );
};

export default RequestProvider;
