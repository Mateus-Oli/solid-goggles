export type Implementation<T = any, V = any> = new(...args: V[]) => T;
export type Interface<T = any, V = any> = new(...args: V[]) => {[K in keyof T]: T[K]};

export type MapEquivalent<K, V> = Map<K, V> | [K, V][];
export type SetEquivalent<V> = Set<V> | V[];
export type ContainerEquivalent = Container | BaseContainer | Set<Entry> | Entry[];

export interface ContainerConstructor {
  new(container?: ContainerEquivalent): Container;
}

type Entry<T = any> = {
  interface: Interface<T>,
  implementation: Implementation<T>,
  instance: T,
}

interface BaseContainer {
  interface: MapEquivalent<Interface, Implementation>;
  implementation: MapEquivalent<Implementation, Entry>;
  instance: MapEquivalent<any, Implementation>;
}

export interface Container {

  parent: Container;

  readonly size: number;

  getInteface<T>(interface: Interface<T>): Interface<T>;
  getInteface<T>(instance: T): Interface<T>;

  getImplementation<T>(interface: Interface<T>): Implementation<T>;
  getImplementation<T>(instance: T): Implementation<T>;

  getInstance<T>(interface: Interface<T>): T;
  getInstance<T>(instance: T): T;

  setInterface<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;
  setImplementation<T>(implementation: Implementation<T>): Implementation<T>;
  setInstance<T>(implementation: Implementation<T>, instance: T): T;

  deleteInteface<T>(interface: Interface<T>): boolean;
  deleteInteface<T>(instance: T): boolean;

  deleteImplementation<T>(interface: Interface<T>): boolean;
  deleteImplementation<T>(instance: T): boolean;

  deleteInstance<T>(interface: Interface<T>): boolean;
  deleteInstance<T>(instance: T): boolean;

  clearInterfaces(): void;
  clearImplementations(): void;
  clearInstances(): void;

  findReturn<T, R>(func: (entry: [Interface<T>, Implementation<T>, T]) => R): R;
  forEach<T>(func: (entry: [Interface<T>, Implementation<T>, T]) => any): void;
}

export const Container: ContainerConstructor;
