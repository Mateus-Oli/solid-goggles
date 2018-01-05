export function findReturn(iterator, func) {
  for (const value of iterator) {
    const result = func(value);
    if (result) {
      return result;
    }
  }
}
