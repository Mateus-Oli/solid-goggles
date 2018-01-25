import { Implementation } from '../models/container';

export function defaultFactory<T, V extends any[]>(implementation: Implementation<T, V>, args: V): T;
export function defaultFactory<T, V extends any[]>(implementation: any, args: V): T;
