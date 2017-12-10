import { Container, Implementation, Interface, BaseContainer, MapEquivalent } from './container';
import { InjectorEmitter, Listener, BaseInjectorEmitter } from './injectorEmitter';

export interface BaseInjector {

  baseImplements: <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;
  baseFactory: <T>(implementation: Implementation<T>) => T;

  container: BaseContainer;
  factories: MapEquivalent<Implementation, Listener>;
  emitter: BaseInjectorEmitter;
}

export interface InjectorConstructor {

  baseImplements: <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;
  baseFactory: <T>(implementation: Implementation<T>) => T;

  new(injector?: BaseInjector): Injector;
}

export interface Injector extends BaseInjector {

  get<T>(interface: Interface<T>): T;
  get<T>(interface: any): T;

  set<T>(implementation: Implementation<T>, instance: T): T;
  delete<T>(implementation: Implementation<T>): this;

  setImplementation(implementation: any): this;
  setImplementation<T>(implementation: Implementation<T>): this;

  link<T, K extends T>(interface: Interface<T>, implementation: Implementation<K>): this;
  unlink<T>(interface: Interface<T>): this;

  factory<T>(implementation: Implementation<T>, fn: (implementation: Implementation<T>) => T): this;

  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  generate<T>(implementation: Implementation<T>): T;
  instantiate<T>(implementation: Implementation<T>): T;
  inject<T>(instance: T): T;

  clear(): this;

  findInterface<T>(implementation: Implementation<T>): Interface<T>;
  findImplementation<T>(interface: Interface<T>): Implementation<T>;
  findInstance<T>(interface: Interface<T>): T;

  canImplement<T>(interface: Interface<T>, implementation: Implementation<T>): boolean;
}

export const Injector: InjectorConstructor;
