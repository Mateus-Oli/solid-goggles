import { Container, Implementation, Interface, BaseContainer, MapEquivalent } from './container';
import { InjectorEmitter, Listener, BaseInjectorEmitter } from './injectorEmitter';

export interface BaseInjector {
  container: Container | BaseContainer;
  factories: MapEquivalent<Implementation, Listener>;
  emitter: InjectorEmitter | BaseInjectorEmitter;
}

export interface InjectorConstructor {

  implements: <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;
  baseFactory: <T>(implementation: Implementation<T>) => T;

  new(injector: Injector | BaseInjector): Injector;
}

export interface Injector {

  implements: <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;
  baseFactory: <T>(implementation: Implementation<T>) => T;

  factory<T>(implementation: Implementation<T>, fn: (implementation: Implementation<T>) => T): this;

  setImplementation<T>(implementation: Implementation<T>): this;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): this;
  unlink<T>(interface: Interface<T>): this;

  findInterface<T>(implementation: Implementation<T>): Interface<T>;
  findImplementation<T>(interface: Interface<T>): Implementation<T>;

  findInstance<T>(interface: Interface<T>): T;
  findInstance<T>(implementation: Implementation<T>): T;

  generate<T>(implementation: Implementation<T>): T;

  get<T>(interface: Interface<T>): T;
  set<T>(implementation: Implementation<T>, instance: T): this;
  delete<T>(implementation: Implementation<T>): this;

  clear(): this;

  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
}

export const Injector: InjectorConstructor;
