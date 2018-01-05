export function getKeys(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }
  return typeof Reflect !== 'undefined' && Reflect.ownKeys
    ? Reflect.ownKeys(obj)
    : Object.getOwnPropertyNames(obj);
}

export function getAllKeys(obj) {
  let keys = [];
  do {
    keys = keys.concat(getKeys(obj));
  } while(obj = obj && Object.getPrototypeOf(obj));

  return keys;
}

export function getMethods(obj) {
  return getAllKeys(obj).filter(v => v !== 'constructor' && typeof obj[v] === 'function');
}

export function isFunctionEquivalent(first, second) {
  const type = typeof first;
  return type === 'function' && type === typeof second && first.length === second.length;
}

export function isMethodEquivalent(first, second) {
  return isFunctionEquivalent(first, second) && first.name === second.name;
}

export function isObjectMethodEquivalent(first, second) {
  return getMethods(first).every(method => isMethodEquivalent(first[method], second[method]));
}

export function isClassEquivalent(first, second) {
  first = typeof first === 'function' ? first.prototype : first;
  second = typeof second === 'function' ? second.prototype : second;

  return isObjectMethodEquivalent(first, second);
}

export function isPrimitive(value) {
  const type = typeof value;
  return type !== 'object' && type !== 'function';
}

export function isEquivalent(first, second) {
  return isPrimitive(first) ? first === second : isClassEquivalent(first, second);
}
