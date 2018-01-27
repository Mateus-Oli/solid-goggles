import { Container, Implementation, Interface, ContainerEquivalent, ContainerConstructor } from './container';
import { InjectorEmitter, Listener, InjectorEmitterEquivalent, InjectorEmitterConstructor } from './injectorEmitter';
import { InjectorErrorConstructor } from '../errors/injectorError';

interface Factory<T = any, V extends any[] = any> {
  (implementation: Implementation<T>, args: V, injector: Injector): T;
  (implementation: any, args: V, injector: Injector): T;
}

interface canImplementValidator<T = any> {
  (interface: Interface<T>, implementation: Implementation<T>, injector: Injector): boolean;
  (interface: any, implementation: any, injector: Injector): boolean;
}

export type InjectorEquivalent = Injector | BaseInjector;

interface BaseDependencies {
  baseCanImplement: canImplementValidator;
  baseFactory: Factory;
}

interface BaseInjector extends BaseDependencies {
  container: ContainerEquivalent;
  factories: Map<any, Factory> | [any, Factory][];
  emitter: InjectorEmitterEquivalent;
}

export interface InjectorConstructor extends BaseDependencies {

  of(...implementations: Implementation[]): Injector;
  of(...implementations: any[]): Injector;

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
  get<T>(interface: any): T;

  tryGet<T>(interface: Interface<T>): T;
  tryGet<T>(interface: any): T;

  set<T>(implementation: Implementation<T>, instance: T): T;
  set<T>(implementation: any, instance: T): T;

  delete<T>(implementation: Implementation<T>): Implementation<T>;
  delete<T>(implementation: T): T;

  setImplementation<T>(implementation: Implementation<T>): Implementation<T>;
  setImplementation<T>(implementation: T): T;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;
  link<T>(interface: T, implementation: any): T;

  tryLink<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;
  tryLink<T>(interface: T, implementation: any): T;

  factory<T>(factory: Factory<T>): Factory<T>;
  factory<T>(implementation: Implementation<T>, factory: Factory<T>): Factory<T>;
  factory<T>(implementation: any, factory: Factory<T>): Factory<T>;

  onEvery<T>(listener: Listener<T>): this;
  onEvery<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onEvery<T>(implementation: any, listener: Listener<T>): this;

  onGet<T>(listener: Listener<T>): this;
  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onGet<T>(implementation: any, listener: Listener<T>): this;

  onSet<T>(listener: Listener<T>): this;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onSet<T>(implementation: any, listener: Listener<T>): this;

  onDelete<T>(listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: any, listener: Listener<T>): this;

  onInstantiate<T>(listener: Listener<T>): this;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onInstantiate<T>(implementation: any, listener: Listener<T>): this;

  generate<T>(implementation: Implementation<T>): T;

  properties<T>(instance: T): T;
  properties<T>(instance: any): T;

  instantiate<T>(implementation: Implementation<T>): T;
  instantiate<T>(implementation: any): T;

  parameters<T, V extends any[]>(implementation: Implementation<T, V>): V;
  parameters<V extends any[]>(implementation: any): V;

  clear(): this;

  findInterface<T>(implementation: Implementation<T>): Interface<T>;
  findInterface<T>(implementation: any): T;

  findImplementation<T>(interface: Interface<T>): Implementation<T>;
  findImplementation<T>(interface: any): T;

  findInstance<T>(interface: Interface<T>): T;
  findInstance<T>(interface: Interface<T>): T;

  canImplement<T>(interface: Interface<T>, implementation: Implementation<T>): boolean;
  canImplement<T>(interface: any, implementation: Implementation<T>): boolean;

  getFactory<T, V extends any[]>(implementation?: Implementation<T, V>): Factory<T, V>;
  getFactory<T, V extends any[]>(implementation?: any): Factory<T, V>;

  getCanImplement<T>(interface?: Interface<T>, implementation?: Implementation<T>): canImplementValidator;
  getCanImplement<T>(interface?: any, implementation?: any): canImplementValidator;
}

export const Injector: InjectorConstructor;
