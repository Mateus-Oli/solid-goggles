export function defaultFactory(implementation, args = []) {
  if (typeof implementation !== 'function') {
    return implementation;
  }
  if (!implementation.prototype) {
    return implementation(...args);
  }
  return new implementation(...args);
}
