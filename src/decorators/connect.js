import { methods, parameters, properties } from '../providers/symbols';
import { isFunction, isNumber, isString } from '../utils/is';

const PARAMETER = 'design:paramtypes';
const PROPERTY = 'design:type';

const CONNECT = 1;

const METADATA = () => typeof Reflect !== 'undefined' && isFunction(Reflect.getMetadata);

const getMetadata = (target, property, length) => {
  if (!METADATA()) { return; }

  return isNumber(length) ?
    (Reflect.getMetadata(PARAMETER, target, property) || [])[length] :
    Reflect.getMetadata(PROPERTY, target, property);
};

export const connect = type =>
  (target, property, length) =>
    getConnect(target, property, length)(type || getMetadata(target, property, length));

const getConnect = (target, property, length) => connectTypes
  .find(([ validator ]) => validator(property, length))[CONNECT](target, property, length);

const decorateParameters = (property, length) => property === undefined && isNumber(length);
const decorateProperties = (property, length) => isString(property) && !isNumber(length);
const decorateMethods = (property, length) => isString(property) && isNumber(length);

const connectTypes = [
  [decorateParameters, (target, _, length) => type => {
    target[parameters] = Object.assign(target[parameters] || [], { [length]: type });
  }],
  [decorateProperties, (target, property) => type => {
    target[properties] = Object.assign(target[properties] || {}, { [property]: type });
  }],
  [decorateMethods, (target, property, length) => type => {
    target[methods] = target[methods] || {};
    target[methods][property] = Object.assign(target[methods][property] || [], { [length]: type });
  }]
];
