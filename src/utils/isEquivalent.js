export function isEquivalent(first, second) {
  return isClassEquivalent(first, second);
}

function isClassEquivalent(first, second) {
  return isObjectMethodEquivalent(getFuncPrototype(first), getFuncPrototype(second));
}

function getFuncPrototype(func) {
  return typeof func === 'function' ? func.prototype : func;
}

function isObjectMethodEquivalent(first, second) {
  return first === second || getMethods(first).every(method => isFunctionEquivalent(first[method], (second || {})[method]));
}

function isFunctionEquivalent(first, second) {
  return typeof first === 'function' && typeof second === 'function' && first.length === second.length;
}

function getMethods(obj) {
  return getAllKeys(obj).filter(v => v !== 'constructor' && typeof obj[v] === 'function');
}

function getAllKeys(obj) {
  let keys = [];
  do {
    keys = keys.concat(getKeys(obj));
  } while(obj = obj && Object.getPrototypeOf(obj));

  return keys;
}

function getKeys(obj) {
  return isObject(obj) ? Object.getOwnPropertyNames(obj) : [];
}

function isObject(object) {
  return object && typeof object === 'object';
}
