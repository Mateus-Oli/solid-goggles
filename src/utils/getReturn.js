export function getReturn(f) {
  return (...args) => typeof f === 'function' ? f(...args) : f;
}
