import { Implementation, Interface } from '../model/container';

export function defaultCanImplement(implementation: Implementation<T>, interface: Interface<T>): boolean;
export function defaultCanImplement(implementation: any, interface: any): boolean;
