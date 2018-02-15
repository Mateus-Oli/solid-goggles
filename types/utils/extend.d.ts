export function extend<T extends object, K extends object>(target: T, ...extensions: K[]): T & K;
