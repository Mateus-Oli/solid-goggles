export function findSet(set, fn) {
  for (const v of set) {
    if (fn(v)) {
      return v;
    }
  }
}
