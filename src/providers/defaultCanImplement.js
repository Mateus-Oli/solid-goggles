import { isEquivalent } from '../utils/isEquivalent';

export function defaultCanImplement(inter, impl) {
  return isEquivalent(inter, impl);
}
