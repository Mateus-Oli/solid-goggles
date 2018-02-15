import { isFunction } from './is';

export function asFunc(f) {
  return isFunction(f) ? f : () => f;
}
