import { properties, parameters } from '../providers/symbols';

const PARAMETER = 'design:paramtypes';
const PROPERTY = 'design:type';

const isNumber = x => typeof x === 'number';

const getMetadata = (target, property) => {
  if (typeof Reflect === 'undefined' || !Reflect.getMetadata) { return; }

  return isNumber(property) ?
    Reflect.getMetadata(PARAMETER, target)[property] :
    Reflect.getMetadata(PROPERTY, target, property);
};

const makeConnect = (hook, returnV) => (target, property, T) => {
  target[hook] = target[hook] || returnV;
  target[hook][property] = T || getMetadata(target, property);
};

const connectParameter = makeConnect(parameters, []);
const connectProperty = makeConnect(properties, {});

export const connect = T => (target, property, length) => isNumber(length) ?
  connectParameter(target, length, T) :
  connectProperty(target, property, T);
