import { Container, Implementation, Interface, BaseContainer, MapEquivalent } from './container';
import { InjectorEmitter, Listener, BaseInjectorEmitter } from './injectorEmitter';

type Factory<T = any> = (implementation: Implementation<T>) => T;
type implementsValidator = <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;

export interface BaseInjector {

  baseImplements: implementsValidator;
  baseFactory: Factory;

  container: BaseContainer;
  factories: MapEquivalent<Implementation, Factory>;
  emitter: BaseInjectorEmitter;
}

export interface InjectorConstructor {

  baseImplements: implementsValidator;
  baseFactory: Factory;

  new(injector?: BaseInjector): Injector;
}

export interface Injector extends BaseInjector {

  container: Container;
  factories: Map<Implementation, Factory>;
  emitter: InjectorEmitter;

  get<T>(interface: Interface<T>): T;
  set<T>(implementation: Implementation<T>, instance: T): T;
  delete<T>(implementation: Implementation<T>): boolean;

  getInstance<T>(interface: Interface<T>): T;
  setImplementation<T>(implementation: Implementation<T>): Implementation<T>;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;
  unlink<T>(interface: Interface<T>): boolean;

  factory<T>(implementation: Implementation<T>, factory: Factory<T>): Factory<T>;

  onGet<T>(listener: Listener<T>): this;
  onSet<T>(listener: Listener<T>): this;
  onDelete<T>(listener: Listener<T>): this;
  onInstantiate<T>(listener: Listener<T>): this;

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

  getFactory<T>(implementation?: Implementation<T>): Factory<T>;
  getImplements<T>(interface?: Interface<T>, implementation?: Implementation<T>): implementsValidator;
}

export const Injector: InjectorConstructor;
