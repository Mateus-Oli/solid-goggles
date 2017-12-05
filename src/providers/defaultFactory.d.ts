import { Implementation } from '../model/container';

export function defaultFactory<T>(implementation: Implementation<T>): T;
