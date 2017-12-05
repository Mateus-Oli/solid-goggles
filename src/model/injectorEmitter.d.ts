import { Implementation, MapEquivalent } from './container';

export type Listener<T = any> = (instance: T, next: (instance: T) => T) => T;

export interface BaseInjectorEmitter {
  set: MapEquivalent<Implementation, Listener>;
  get: MapEquivalent<Implementation, Listener>;
  delete: MapEquivalent<Implementation, Listener>;
}

export interface InjectorEmitterConstructor {
  new(injectorEvent: InjectorEmitter | BaseInjectorEmitter): InjectorEmitter;
}

type ManagedEvents = 'set' | 'get' | 'delete';

export interface InjectorEmitter {

  on<T>(event: ManagedEvents, listener: Listener<T>): this;

  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  remove<T>(event: ManagedEvents, listener: Listener<T>): this;

  removeSet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  removeGet<T>(implementation: Implementation<T>, listener: Listener<T>): this;
  removeDelete<T>(implementation: Implementation<T>, listener: Listener<T>): this;

  emit<T>(event: ManagedEvents, instance: T): T;

  emitGet<T>(impelementation: Implementation<T>, instance: T): T;
  emitSet<T>(impelementation: Implementation<T>, instance: T): T;
  emitDelete<T>(impelementation: Implementation<T>, instance: T): T;
}

export const InjectorEvent: InjectorEmitterConstructor;
