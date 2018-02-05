export function defaultFactory(implementation, args = []) {
  return getFactory(implementation)(implementation, args);
}

const FACTORY = 1;
const BASIC = [, value => value ];

const getFactory = value => (factories.find(([ validator ]) => validator(value)) || BASIC)[FACTORY];

const isLambda = value => isFunction(value) && !value.prototype;
const isConstructor = value => isFunction(value) && value.prototype;

const isFunction = value => typeof value === 'function';

const factories = [
  [ isLambda, (value, args) => value(...args) ],
  [ isConstructor, (value, args) => new value(...args) ]
];
