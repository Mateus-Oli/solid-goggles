export function getReturn<T>(x: T): (...args: any[]) => T;
export function getReturn<T, P, K extends (...args: P[]) => T>(f: K): K;
