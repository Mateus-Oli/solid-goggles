import { isClassEquivalent } from '../utils/info';

export function defaultImplements(inter, impl) {
  return isClassEquivalent(inter, impl);
}
