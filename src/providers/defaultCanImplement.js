import { isEquivalent, isPrimitive } from '../utils/isEquivalent';

export function defaultCanImplement(inter, impl) {
  return isPrimitive(inter) ? inter === impl : isEquivalent(inter, impl);
}
