import { ParamListBase, RouteProp } from '@react-navigation/native';

export type ParamList<T> = RouteProp<
  ParamListBase & { params?: Partial<T> },
  'params'
>;
