import { Implementation, Interface } from '../models/container';

export interface InjectorErrorConstructor {
  readonly GENERETA_ERROR: string;
  readonly LINK_ERROR: string;

  new(interface: Interface, implementation: Implementation): InjectorError;
  new(interface: any, implementation: any): InjectorError;
}

export interface InjectorError extends Error {

  interface: Interface | any;
  implementation: Implementation | any;
}

export const InjectorError: InjectorErrorConstructor;
