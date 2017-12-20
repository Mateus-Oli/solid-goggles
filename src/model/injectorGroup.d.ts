import { Injector } from "./injector";
import { Interface } from "./container";

export type InjectorGroupEquivalent = InjectorGroup | BaseInjectorGroup | Set<Injector> | Injector[];

interface BaseInjectorGroup {
  injectors: Set<Injector>;
}

export interface InjectorGroupConstructor {
  new(injectorGroup?: InjectorGroupEquivalent): InjectorGroup;
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
}

export const InjectorGroup: InjectorGroupConstructor;
