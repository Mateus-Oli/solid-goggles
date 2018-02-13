export function asFunc(f) {
  return typeof f === 'function' ? f : () => f;
}
