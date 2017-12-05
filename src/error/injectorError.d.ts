import { Implementation, Interface } from '../model/container';

export interface InjectorErrorConstructor {
  readonly GENERETA_ERROR: string;
  readonly LINK_ERROR: string;

  new<T>(interface: Interface<T>, implementation: Implementation<T>): InjectorError<T>;
}

export interface InjectorError<T> extends Error {

  interface: Interface<T>;
  implementation: Implementation<T>;
}

export const InjectorError: InjectorErrorConstructor;
