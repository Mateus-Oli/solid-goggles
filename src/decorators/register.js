import { findImplementation } from '../providers/symbols';

export const register = impl => inter => {
  inter[findImplementation] = (impl || inter)[findImplementation] = impl || inter;
};
