import { isClassEquivalent } from '../utils/info';

export function defaultCanImplement(inter, impl) {
  return isClassEquivalent(inter, impl);
}
