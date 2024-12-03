/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';

type Data = {
  cep?: '18087-315';
  logradouro?: 'Estrada Dom José Melhado Campos';
  bairro?: 'Jardim Josane';
  localidade?: 'Sorocaba';
  uf?: 'SP';
};

export const get = async (cep?: string) => {
  const data: Data = {};

  if (!cep) return data;

  const formatted = cep.replace(/\D/g, '');

  if (formatted.length !== '12345678'.length) {
    console.warn('Invalid CEP length');
    return data;
  }

  const url = `https://viacep.com.br/ws/${formatted}/json/`;
  try {
    const response = await axios.get<Data>(url);
    return {
      ...response.data,
    };
  } catch (err: any) {
    console.warn('Error on getting cep info:');
    console.warn(err?.response?.data || err.message);
    return data;
  }
};

export const useCep = () => {
  const [cep, setCep] = useState('');
  const [data, setData] = useState<Data>({});

  useEffect(() => {
    (async () => {
      if (cep.length !== 8 && cep.length !== 9) {
        if (Object.keys(data).length > 0) setData({});
        return;
      }

      const result = await get(cep);
      setData(result);
    })();
  }, [cep]);

  return { cep, setCep, data };
};
