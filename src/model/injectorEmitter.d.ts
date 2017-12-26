import { Implementation } from './container';

export type Listener<T = any> = (instance: T, next: (instance: T) => T) => T;
export type InjectorEmitterEquivalent = InjectorEmitter | BaseInjectorEmitter | ListenerContext[];

type Event = 'get' | 'set' | 'delete' | 'instantiate';

interface ListenerContext {
  event: Event;
  implementation: Implementation;
  listener: Listener;
}

export interface MapEquivalent<K, V> {
  forEach(func: (value: V, key: K) => any): any;
}

export interface InjectorEmitterConstructor {
  new(injectorEmitter?: InjectorEmitterEquivalent): InjectorEmitter;
  new(
    injectorEmitter?: InjectorEmitterEquivalent,
    MapConstructor?: new<K, V>(map?: Map<K, V>) => Map<K, V>
  ): InjectorEmitter;
}

export interface BaseInjectorEmitter {
  listeners: ListenerContext[];
}

type ManagedEvents = keyof BaseInjectorEmitter;

export interface InjectorEmitter {

  onEvery<T>(listener: Listener<T>): Listener<T>;
  onGet<T>(listener: Listener<T>): Listener<T>;
  onSet<T>(listener: Listener<T>): Listener<T>;
  onDelete<T>(listener: Listener<T>): Listener<T>;
  onInstantiate<T>(listener: Listener<T>): Listener<T>;

  onEvery<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onGet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onSet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onDelete<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  onInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;

  emitEvery<T>(instance: T): T;
  emitGet<T>(instance: T): T;
  emitSet<T>(instance: T): T;
  emitDelete<T>(instance: T): T;
  emitInstantiate<T>(instance: T): T;

  emitEvery<T>(impelementation: Implementation<T>, instance: T): T;
  emitGet<T>(impelementation: Implementation<T>, instance: T): T;
  emitSet<T>(impelementation: Implementation<T>, instance: T): T;
  emitDelete<T>(impelementation: Implementation<T>, instance: T): T;
  emitInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): T;

  removeEvery<T>(listener: Listener<T>): Listener<T>;
  removeGet<T>(listener: Listener<T>): Listener<T>;
  removeSet<T>(listener: Listener<T>): Listener<T>;
  removeDelete<T>(listener: Listener<T>): Listener<T>;
  removeInstantiate<T>(listener: Listener<T>): Listener<T>;

  removeEvery<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  removeGet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  removeSet<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  removeDelete<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
  removeInstantiate<T>(implementation: Implementation<T>, listener: Listener<T>): Listener<T>;
}

export const InjectorEmitter: InjectorEmitterConstructor;
