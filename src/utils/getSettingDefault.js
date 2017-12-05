export function getSettingDefault(map, key, defaultV) {
  const value = map.get(key);
  if (!value) {
    map.set(key, defaultV);
  }
  return value || defaultV;
}
