import { Injector } from "./injector";
import { Interface, Implementation } from "./container";
import { InjectorErrorConstructor } from "../error/injectorError";

export interface InjectorGroupConstructor {
  new(injectorGroup?: InjectorGroupEquivalent): InjectorGroup;
  new(
    injectorGroup?: InjectorGroupEquivalent,
    SetConstructor?: new<T>(set?: Set<T>) => Set<T>
  ): InjectorGroup;
}

export interface InjectorGroupEquivalent {
  forEach(func: (injector: Injector) => any): any;
}

export interface InjectorGroup {

  readonly size: number;

  get<T>(interface: Interface<T>): T;
  getInstance<T>(interface: Interface<T>): T;

  getInjector<T>(instance: T): Injector;
  setInjector(injector: Injector): this;
  deleteInjector(injector: Injector): this;

  hasInjector(injector: Injector): Injector;

  clear(): this;

  find(func: (injector: Injector) => any): Injector;
  findReturn<T>(func: (injector: Injector) => T): T;

  forEach(func: (injector: Injector) => any): this;

  error(interface: Interface): never;
  error(interface: Interface, implementation?: Implementation, message?: string): never;
  error(interface: Interface, implementation?: Implementation, message?: string, ErrorConstructor: InjectorErrorConstructor): never;
}

export const InjectorGroup: InjectorGroupConstructor;
