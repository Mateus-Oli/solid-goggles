export function getKeys(obj = null) {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }
  return Object.getOwnPropertyNames(obj);
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

export function isObjectMethodEquivalent(first, second) {
  return first === second || getMethods(first).every(method => isFunctionEquivalent(first[method], (second || {})[method]));
}

export function isClassEquivalent(first, second) {
  first = typeof first === 'function' ? first.prototype : first;
  second = typeof second === 'function' ? second.prototype : second;

  return isObjectMethodEquivalent(first, second);
}

export function isEquivalent(first, second) {
  return isClassEquivalent(first, second);
}
