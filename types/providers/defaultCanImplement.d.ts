import { Implementation, Interface } from '../models/container';

export function defaultCanImplement(implementation: Implementation<T>, interface: Interface<T>): boolean;
export function defaultCanImplement(implementation: any, interface: any): boolean;
