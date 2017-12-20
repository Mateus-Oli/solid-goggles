import { Implementation } from '../model/container';

export function defaultFactory<T, V extends []>(implementation: Implementation<T, V>, args: V): T;
