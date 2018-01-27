import { properties, parameters } from '../providers/symbols';

const makeConnect = (hook, returnV) => (target, property, T) => {
  target[hook] = target[hook] || returnV;
  target[hook][property] = T;
};

const connectParameter = makeConnect(parameters, []);
const connectProperty = makeConnect(properties, {});

export const connect = T => (target, property, length) => property ?
  connectProperty(target, property, T) :
  connectParameter(target, length, T);
