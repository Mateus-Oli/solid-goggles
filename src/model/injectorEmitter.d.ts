import { Implementation, MapEquivalent } from './container';

export type Listener<T = any> = (instance: T, next: (instance: T) => T) => T;
export type InjectorEmitterEquivalent = InjectorEmitter | BaseInjectorEmitter;

export interface InjectorEmitterConstructor {
  new(injectorEmitter?: InjectorEmitterEquivalent): InjectorEmitter;
}

export interface BaseInjectorEmitter {
  set: MapEquivalent<Implementation, Listener[]>;
  get: MapEquivalent<Implementation, Listener[]>;
  delete: MapEquivalent<Implementation, Listener[]>;
  instantiate: MapEquivalent<Implementation, Listener[]>;
}

type ManagedEvents = keyof BaseInjectorEmitter;

export interface InjectorEmitter {

  onGet<T>(listener: Listener<T>): Listener<T>;
  onSet<T>(listener: Listener<T>): Listener<T>;
  onDelete<T>(listener: Listener<T>): Listener<T>;
  onInstantiate<T>(listener: Listener<T>): Listener<T>;

  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;

  emitGet<T>(instance: T): T;
  emitSet<T>(instance: T): T;
  emitDelete<T>(instance: T): T;
  emitInstantiate<T>(instance: T): T;

  emitGet<T>(impelementation: Implementation<T>, instance: T): T;
  emitSet<T>(impelementation: Implementation<T>, instance: T): T;
  emitDelete<T>(impelementation: Implementation<T>, instance: T): T;
  emitInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): T;

  removeGet<T>(listener: Listener<T>): boolean;
  removeSet<T>(listener: Listener<T>): boolean;
  removeDelete<T>(listener: Listener<T>): boolean;
  removeInstantiate<T>(listener: Listener<T>): boolean;

  removeGet<T>(implementation: Implementation<T>, listener: Listener<T>): boolean;
  removeSet<T>(implementation: Implementation<T>, listener: Listener<T>): boolean;
  removeDelete<T>(implementation: Implementation<T>, listener: Listener<T>): boolean;
  removeInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): boolean;
}

export const InjectorEmitter: InjectorEmitterConstructor;
