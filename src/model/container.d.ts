export type Implementation<T = any, V = any> = new(...args: V[]) => T;
export type Interface<T = any, V = any> = new(...args: V[]) => {[K in keyof T]: T[K]};

export type MapEquivalent<K, V> = Map<K, V> | [K, V][];
export type SetEquivalent<V> = Set<V> | V[];

type Entry<T = any> = [Interface<T>, Implementation<T>, T];

export interface BaseContainer {
  entries: Entry[];
}

export interface ContainerConstructor {

  readonly INTERFACE: 0;
  readonly IMPLEMENTATION: 1;
  readonly INSTANCE: 2;

  new(container?: BaseContainer | Set<Entry> | Entry[]): Container;
}

export interface Container extends BaseContainer {

  readonly size: number;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): this;
  addImplementation<T>(implementation: Implementation<T>): this;
  setInstance<T>(implementation: Implementation<T>, instance: T): this;

  getInteface<T>(interface: Interface<T>): Interface<T>;
  getInteface<T>(instance: T): Interface<T>;

  getImplementation<T>(interface: Interface<T>): Implementation<T>;
  getImplementation<T>(instance: T): Implementation<T>;

  getInstance<T>(interface: Interface<T>): T;
  getInstance<T>(instance: T): T;

  deleteInteface<T>(interface: Interface<T>): this;
  deleteInteface<T>(instance: T): Interface<T>;

  deleteImplementation<T>(interface: Interface<T>): this;
  deleteImplementation<T>(instance: T): this;

  deleteInstance<T>(interface: Interface<T>): this;
  deleteInstance<T>(instance: T): this;

  clearInterface(): this;
  clearIImplementation(): this;
  clearInstance(): this;

  clear(): this;

  find<T>(func: (entry: Entry<T>) => any): Entry<T>;
  findReturn<T, V>(func: (entry: Entry<T>) => V): V;

  forEach<T>(func: (entry: Entry<T>) => any): this;
}

export const Container: ContainerConstructor;
