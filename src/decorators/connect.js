import { generated, inject } from '../providers/symbols';

const makeConnect = (hook, returnV) => (target, property, T) => {
  target[hook] = target[hook] || returnV;
  target[hook][property] = T;
};

const connectParameter = makeConnect(inject, []);
const connectProperty = makeConnect(generated, {});

export const connect = T => (target, property, length) => property ?
  connectProperty(target, property, T) :
  connectParameter(target, length, T);
