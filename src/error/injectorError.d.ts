import { Implementation, Interface } from '../model/container';

export interface InjectorErrorConstructor {
  readonly GENERETA_ERROR: string;
  readonly LINK_ERROR: string;

  new(interface: Interface, implementation: Implementation): InjectorError;
}

export interface InjectorError extends Error {

  interface: Interface;
  implementation: Implementation;
}

export const InjectorError: InjectorErrorConstructor;
