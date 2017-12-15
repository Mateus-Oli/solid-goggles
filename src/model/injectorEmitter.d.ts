import { Implementation, MapEquivalent } from './container';

export type Listener<T = any> = (instance: T, next: (instance: T) => T) => T;

export interface BaseInjectorEmitter {
  set: MapEquivalent<Implementation, Listener>;
  get: MapEquivalent<Implementation, Listener>;
  delete: MapEquivalent<Implementation, Listener>;
  instantiate: MapEquivalent<Implementation, Listener>;
}

export interface InjectorEmitterConstructor {
  new(injectorEmitter?: BaseInjectorEmitter): InjectorEmitter;
}

type ManagedEvents = keyof BaseInjectorEmitter;

export interface InjectorEmitter extends BaseInjectorEmitter {

  onSet<T>(listener: Listener<T>): this;
  onGet<T>(listener: Listener<T>): this;
  onDelete<T>(listener: Listener<T>): this;
  onInstantiate<T>(listener: Listener<T>): this;

  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  on<T>(event: ManagedEvents, listener: Listener<T>): this;
  on<T>(event: ManagedEvents, implementation: Implementation<T>, listener: Listener<T>): this;

  emitGet<T>(instance: T): T;
  emitSet<T>(instance: T): T;
  emitDelete<T>(instance: T): T;
  emitInstantiate<T>(listener: Listener<T>): this;

  emitGet<T>(impelementation: Implementation<T>, instance: T): T;
  emitSet<T>(impelementation: Implementation<T>, instance: T): T;
  emitDelete<T>(impelementation: Implementation<T>, instance: T): T;
  emitInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  emit<T>(event: ManagedEvents, instance: T): T;
  emit<T>(event: ManagedEvents, implementation: Implementation<T>, instance: T): T;

  removeSet<T>(listener: Listener<T>): this;
  removeGet<T>(listener: Listener<T>): this;
  removeDelete<T>(listener: Listener<T>): this;
  removeInstantiate<T>(listener: Listener<T>): this;

  removeSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  removeGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  removeDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  removeInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  remove<T>(event: ManagedEvents, listener: Listener<T>): this;
  remove<T>(event: ManagedEvents, implementation: Implementation<T>, listener: Listener<T>): this;
}

export const InjectorEmitter: InjectorEmitterConstructor;
