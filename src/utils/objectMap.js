export const objectMap = object => mapper => {
  const map = Object.create(Object.getPrototypeOf(object));
  for (const index in object) { map[index] = mapper(object[index], index, object); }

  return map;
};
