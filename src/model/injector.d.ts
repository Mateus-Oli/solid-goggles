import { Container, Implementation, Interface, MapEquivalent, ContainerEquivalent } from './container';
import { InjectorEmitter, Listener, InjectorEmitterEquivalent } from './injectorEmitter';

type Factory<T = any, V extends any[] = any> = (implementation: Implementation<T>, args: V, injector: Injector) => T;
type implementsValidator = <T>(interface: Interface<T>, implementation: Implementation<T>) => boolean;

export type InjectorEquivalent = Injector | BaseInjector;

interface BaseInjector {

  baseImplements: implementsValidator;
  baseFactory: Factory;

  container: ContainerEquivalent;
  factories: MapEquivalent<Implementation, Factory>;
  emitter: InjectorEmitterEquivalent;
}

export interface InjectorConstructor {

  baseImplements: implementsValidator;
  baseFactory: Factory;

  new(injector?: InjectorEquivalent): Injector;
}

export interface Injector {

  baseImplements: implementsValidator;
  baseFactory: Factory;

  container: Container;
  factories: Map<Implementation, Factory>;
  emitter: InjectorEmitter;

  get<T>(interface: Interface<T>): T;
  set<T>(implementation: Implementation<T>, instance: T): T;
  delete<T>(implementation: Implementation<T>): Implementation<T>;

  getInstance<T>(interface: Interface<T>): T;
  setImplementation<T>(implementation: Implementation<T>): Implementation<T>;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;

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
  inject<T, V extends any[]>(implementation: Implementation<T, V>): V;

  clear(): this;

  findInterface<T>(implementation: Implementation<T>): Interface<T>;
  findImplementation<T>(interface: Interface<T>): Implementation<T>;
  findInstance<T>(interface: Interface<T>): T;

  canImplement<T>(interface: Interface<T>, implementation: Implementation<T>): boolean;

  getFactory<T, V extends any[]>(implementation?: Implementation<T, V>): Factory<T, V>;
  getImplements<T>(interface?: Interface<T>, implementation?: Implementation<T>): implementsValidator;
}

export const Injector: InjectorConstructor;
