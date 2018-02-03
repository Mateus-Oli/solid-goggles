import { getImplementation } from '../providers/symbols';

export const implementation = impl => target => { target[getImplementation] = impl; };
