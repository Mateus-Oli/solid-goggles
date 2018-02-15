import { properties, parameters, methods } from '../providers/symbols';

const PARAMETER = 'design:paramtypes';
const PROPERTY = 'design:type';

const CONNECT = 1;

const isNumber = x => typeof x === 'number';
const isString = x => typeof x === 'string';

const getMetadata = (target, property, length) => {
  if (typeof Reflect === 'undefined' || !Reflect.getMetadata) { return; }

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
