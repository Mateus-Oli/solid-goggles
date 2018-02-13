import { findImplementation } from '../providers/symbols';

export const register = impl => inter => {
  Object(inter)[findImplementation] = Object(impl || inter)[findImplementation] = impl || inter;
};
