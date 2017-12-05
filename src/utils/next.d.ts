export function next<T>(baseArg: T, functions: ((arg: T, next: (arg: T) => T) => T)[]): T;
