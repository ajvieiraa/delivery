import { AxiosError, AxiosRequestConfig } from 'axios';

type _Result = unknown;
type Data = unknown;
type Params = unknown;
type Headers = unknown;

export interface Options<R = unknown, D = unknown, P = any, H = any>
  extends AxiosRequestConfig {
  data?: D;
  params?: P;
  headers?: H;
  refetchOnFocus?: boolean;
  disabled?: boolean;
  merge?: (existing: Partial<R>, incoming: R) => R;
  onComplete?: (result: R) => void;
  onError?: (err: AxiosError) => void;
  paginate?: boolean;
}

export type Result<R> = {
  data?: R;
  error?: AxiosError;
  refetch(): void;
  loading: boolean;
  refreshing: boolean;
  endReached?: boolean;
  fetchMore(): void;
  fetchingMore: boolean;
};

export type UseRequest = <R = _Result, D = Data, P = Params, H = Headers>(
  url: string,
  options?: Options<R, D, P, H>,
) => Result<R>;

export type UseLazyRequest = <R = _Result, D = Data, P = Params, H = Headers>(
  url: string,
  options?: Options<R, D, P, H>,
) => [(_url?: string, _options?: Options<R, D, P, H>) => void, Result<R>];
