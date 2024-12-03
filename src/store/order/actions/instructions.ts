import { SetOrder } from '../types';

export default function (setOrder: SetOrder, instructions?: string) {
  setOrder((cur) => ({ ...cur, instructions }));
}
