export function defaultFactory(implementation, args = []) {
  return getFactory(implementation)(implementation, args);
}

const getFactory = value => (factories.find(([ validator ]) => validator(value)) || basic )[1];

const isLambda = value => isFunction(value) && !value.prototype;
const isConstructor = value => isFunction(value) && value.prototype;

const isFunction = value => typeof value === 'function';

const factories = [
  [isLambda, (value, args) => value(...args)],
  [isConstructor, (value, args) => new value(...args)]
];
const basic = [, value => value];
