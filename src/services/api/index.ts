import axios from 'axios';

// export const baseURL = 'http://192.168.0.105:8000/api'; // LOCAL
export const baseURL = 'http://137.184.117.63/api'; // PROD
// export const baseURL = 'http://147.182.180.254/api'; // STAGE

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export function setToken (token: string) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function clearToken () {
  api.defaults.headers.Authorization = undefined;
}

export function getImage (path: string) {
  return `${baseURL.replace('api', '')}storage/${path}`;
}

export * from './types';
