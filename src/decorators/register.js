import { getImplementation } from '../providers/symbols';

export const register = impl => inter => {
  inter[getImplementation] = (impl || inter)[getImplementation] = impl || inter;
};
