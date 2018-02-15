export const is = type => value => typeof value === type;

export const isPrimitive = primitive => !isObject(primitive) && !isFunction(primitive);
export const isComposite = composite => isObject(composite) || isFunction(composite);

export const isObject = obj => isNullableObject(obj) && !isNull(obj);
export const isNullableObject = is('object');
export const isFunction = is('function');

export const isSymbol =  is('symbol');
export const isString = is('string');
export const isNumber = is('number');
export const isBoolean = is('boolean');

export const isUndefined = is('undefined');

export const isEmpty = empty => isNull(empty) || isUndefined(empty);
export const isNull = nil => nil === null;

