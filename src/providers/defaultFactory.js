export function defaultFactory(impl) {
  if (typeof impl !== 'function') {
    return impl;
  }
  return new impl;
}
