export function asFunc<T>(x: T): (...args: any[]) => T;
export function asFunc<T, K extends (...args: any[]) => T>(f: K): K;
