import { Implementation } from '../models/container';

export function defaultFactory<T>(implementation: Implementation<T>, args: any[]): T;
export function defaultFactory<T>(implementation: T, args: any[]): T;
export function defaultFactory<T>(implementation: any, args: any[]): T;
