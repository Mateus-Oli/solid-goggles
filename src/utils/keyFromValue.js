export function keyFromValue(map, value) {
  for (const [k, v] of map.entries()) {
    if (value === v) {
      return k;
    }
  }
}
