import { getImplementation } from '../providers/symbols';

export const register = impl => target => { target[getImplementation] = impl || target; };
