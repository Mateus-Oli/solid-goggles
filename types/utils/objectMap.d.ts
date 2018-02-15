export function objectMap<T, K>(object: { [index: string]: T}): (map: (x: T, index: string, object: { [index: string]: T }) => K) => { [index: string]: K }
