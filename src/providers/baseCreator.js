export function baseCreator(base) {
  return (value = base) => {
    const clone = {};
    for (const key in base) {
      clone[key] = new base[key].constructor(value[key]);
    }
    return Object.assign({}, value, clone);
  };
}
