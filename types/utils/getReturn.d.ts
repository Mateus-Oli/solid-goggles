export function getReturn<T>(x: T): (...args: any[]) => T;
export function getReturn<T, K extends (...args: any[]) => T>(f: K): K;
