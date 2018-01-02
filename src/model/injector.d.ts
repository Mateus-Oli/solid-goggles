import { Container, Implementation, Interface, ContainerEquivalent, ContainerConstructor } from './container';
import { InjectorEmitter, Listener, InjectorEmitterEquivalent, InjectorEmitterConstructor } from './injectorEmitter';
import { InjectorErrorConstructor } from '../error/injectorError';

type Factory<T = any, V extends any[] = any> = (implementation: Implementation<T>, args: V, injector: Injector) => T;
type canImplementValidator = <T>(interface: Interface<T>, implementation: Implementation<T>, injector: Injector) => boolean;

export type InjectorEquivalent = Injector | BaseInjector;

interface BaseDependencies {
  baseCanImplement: canImplementValidator;
  baseFactory: Factory;
}

interface BaseInjector extends BaseDependencies {
  container: ContainerEquivalent;
  factories: Map<Implementation, Factory> | [Implementation, Factory][];
  emitter: InjectorEmitterEquivalent;
}

export interface InjectorConstructor extends BaseDependencies {

  new(injector?: InjectorEquivalent): Injector;
  new(
    injector?: InjectorEquivalent,
    ContainerConstructor?: ContainerConstructor,
    EmitterConstructor?: InjectorEmitterConstructor,
    MapConstructor?: new<K, V>(map?: Map<K, V>) => Map<K, V>
  ): Injector;
}

export interface Injector extends BaseDependencies {

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

  onEvery<T>(listener: Listener<T>): this;
  onGet<T>(listener: Listener<T>): this;
  onSet<T>(listener: Listener<T>): this;
  onDelete<T>(listener: Listener<T>): this;
  onInstantiate<T>(listener: Listener<T>): this;

  onEvery<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  generate<T>(implementation: Implementation<T>): T;
  generated<T>(instance: T): T;

  instantiate<T>(implementation: Implementation<T>): T;
  inject<T, V extends any[]>(implementation: Implementation<T, V>): V;

  clear(): this;

  findInterface<T>(implementation: Implementation<T>): Interface<T>;
  findImplementation<T>(interface: Interface<T>): Implementation<T>;
  findInstance<T>(interface: Interface<T>): T;

  canImplement<T>(interface: Interface<T>, implementation: Implementation<T>): boolean;

  getFactory<T, V extends any[]>(implementation?: Implementation<T, V>): Factory<T, V>;
  getCanImplement<T>(interface?: Interface<T>, implementation?: Implementation<T>): canImplementValidator;

  error(interface: Interface): never;
  error(interface: Interface, implementation?: Implementation, message?: string): never;
  error(interface: Interface, implementation?: Implementation, message?: string, ErrorConstructor: InjectorErrorConstructor): never;
}

export const Injector: InjectorConstructor;
