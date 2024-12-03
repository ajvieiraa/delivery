import { useFocusEffect } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { equals } from '../../../utils/object';
import { Pagination } from '../types';

import { Context } from './context';

import { Options, Result, UseLazyRequest, UseRequest } from './types';

function normalizeUrl(url: string) {
  if (url.charAt(0) === '/') return url.substr(1);
  return url;
}

const defaultOptions: Options<any, any, any, any> = {
  refetchOnFocus: false,
  disabled: false,
};

const useRequest: UseRequest = (url, options = defaultOptions) => {
  const { baseUrl, token } = useContext(Context);

  console.log('T:', token)

  const isReady = useRef(true);
  const initialLoaded = useRef(false);
  const previousOptions = useRef(options);
  const isRefetching = useRef(false);
  const canFocusRefetch = useRef(false);

  const page = useRef(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  const [data, setData] = useState<any>();
  const [error, setError] = useState<AxiosError>();
  const [endReached, setEndReached] = useState<boolean>(!options.paginate);

  const request = useCallback(
    (setState: (state: boolean) => void) => {
      if (!isReady.current) return;
      isReady.current = false;

      const finalUrl = baseUrl ? `${baseUrl}${normalizeUrl(url)}` : url;
      console.log(finalUrl)

      setState(true);

      axios
        .request({
          ...options,
          params: options.paginate
            ? {
                ...options.params,
                page: page.current,
              }
            : options.params,
          url: finalUrl,
          headers: { ...options.headers, Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (options.merge && !isRefetching.current) {

            setData((cur: any) => options.merge?.(cur, response.data));
          } else {
            isRefetching.current = false;
            setData(response.data);
          }


          if (response.data.data?.pagination && options.paginate) {
            const pagination = response.data.data.pagination as Pagination;

            // console.log(pagination);

            if (pagination.current_page >= pagination.last_page)
              setEndReached(true);
          }

          setError(undefined);
          setState(false);

          isReady.current = true;
        })
        .catch((err) => {
          setError(err);
          setData(undefined);
          setState(false);

          isReady.current = true;
        });
    },
    [baseUrl, options, url, token],
  );

  /** Calls request when options changes */
  useEffect(() => {
    if (!isReady.current) return;
    if (equals(previousOptions.current as any, options as any)) return;

    previousOptions.current = options;

    // console.log('options changed');
    request(setLoading);
  }, [options, request]);

  const refetch = useCallback(() => {
    if (!isReady.current) return;
    isRefetching.current = true;

    // Reset pagination
    page.current = 1;
    setEndReached(false);

    request(setRefreshing);
  }, [request]);

  const fetchMore = useCallback(() => {
    if (!options.paginate)
      return console.warn(
        'Can\'t fetch more without "paginated: true" on options.',
      );

    // If end reached, fetchMore will not work
    if (endReached) return;

    page.current += 1;
    request(setFetchingMore);
  }, [endReached, options.paginate, request]);

  useFocusEffect(
    useCallback(() => {
      // console.log('focus with options callback');

      if (!options.refetchOnFocus) return;
      if (!canFocusRefetch.current) return;

      refetch();
      canFocusRefetch.current = false;
    }, [options.refetchOnFocus, refetch]),
  );

  useFocusEffect(
    useCallback(() => {
      // console.log('focus callback');

      // console.log('focus');
      if (initialLoaded.current) canFocusRefetch.current = true;
    }, []),
  );

  /** Initial load on component mount */
  useEffect(() => {
    // console.log('initial load effect');

    if (initialLoaded.current) return;
    canFocusRefetch.current = false;
    initialLoaded.current = true;
    // canFocusRefetch.current = true;

    request(setLoading);
  }, [request]);

  return {
    data,
    error,
    refetch,
    loading,
    refreshing,
    endReached,
    fetchMore,
    fetchingMore,
  };
};

export const useLazyRequest: UseLazyRequest = (url, options) => {
  const { baseUrl, token } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<Result<unknown>>({
    loading: false,
    refreshing: false,
    fetchingMore: false,
    refetch: () => null,
    fetchMore: () => null,
  });

  const request = useCallback(
    (_url?: string, _options?: Options) => {
      const curOptions =
        (_options ? { ...options, ..._options } : options) || defaultOptions;

      if (curOptions.disabled) return;

      const curUrl = _url || url;

      const finalUrl = baseUrl ? `${baseUrl}${normalizeUrl(curUrl)}` : curUrl;

      setLoading(true);

      axios
        .request({
          ...curOptions,
          url: finalUrl,
          headers: { ...curOptions.headers, Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          curOptions.onComplete?.(response.data);

          setResult((cur) => ({
            ...cur,
            loading: false,
            refreshing: false,
            error: undefined,
            data: response.data,
          }));

          setLoading(false);
        })
        .catch((err) => {
          curOptions.onError?.(err);

          setResult({
            error: err,
            loading: false,
            refreshing: false,
            refetch: () => null,
            fetchingMore: false,
            fetchMore: () => null,
          });

          setLoading(false);
        });
    },
    [baseUrl, options, token, url],
  );

  return [request, { ...result, loading }];
};

export const useRequestConfig = () => {
  const { setToken } = useContext(Context);
  return { setToken };
};

export default useRequest;
