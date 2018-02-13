export function isEquivalent(first, second) {
  return methodEquivalence(getObject(first), getObject(second));
}

function getObject(func) {
  return typeof func === 'function' ? func.prototype : func;
}

function methodEquivalence(first, second) {
  return first === second || getMethods(first).every(method => functionEquivalence(first[method], (second || {})[method]));
}

function functionEquivalence(first, second) {
  return typeof first === 'function' && typeof second === 'function' && first.length === second.length;
}

function getMethods(object) {
  return getAllKeys(object).filter(v => v !== 'constructor' && typeof object[v] === 'function');
}

function getAllKeys(object) {
  let keys = [];
  do {
    keys = keys.concat(getKeys(object));
  } while(object = object && Object.getPrototypeOf(object));

  return keys;
}

function getKeys(object) {
  return isObject(object) ? Object.getOwnPropertyNames(object) : [];
}

function isObject(object) {
  return object && typeof object === 'object';
}
