import { Injector } from "./injector";
import { Interface } from "./container";


export interface BaseInjectorGroup {
  injectors: Set<Injector>;
}

export interface InjectorGroupConstructor {
  new(injectorGroup?: BaseInjectorGroup): InjectorGroup;
}

export interface InjectorGroup extends BaseInjectorGroup {

  readonly size: number;

  get<T>(interface: Interface<T>): T;
  getInstance<T>(interface: Interface<T>): T;

  getInjector<T>(instance: T): Injector;
  setInjector(injector: Injector): this;
  deleteInjector(injector: Injector): this;

  hasInjector(injector: Injector): boolean;

  clear(): this;

  find(func: (injector: Injector) => any): Injector;
  findReturn<T>(func: (injector: Injector) => T): T;

  forEach(func: (injector: Injector) => any): this;
}

export const InjectorGroup: InjectorGroupConstructor;
