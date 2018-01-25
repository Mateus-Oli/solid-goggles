export function getReturn<T>(x: T): () => T;
export function getReturn<T, P>(f: (...args: P[]) => T): (...args: P[]) => T;
