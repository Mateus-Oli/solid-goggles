export type Implementation<T = any, V = any> = new(...args: V[]) => T;
export type Interface<T = any, V = any> = new(...args: V[]) => {[K in keyof T]: T[K]};

export interface ContainerConstructor {
  new(container?: ContainerEquivalent): Container;
  new(
    container?: ContainerEquivalent,
    MapConstructor?: new<K, V>(map?: Map<K, V>) => Map<K, V>
  ): Container;
}

export interface ContainerEquivalent {
  forEach(func: <T>(entry: [Interface<T>, Implementation<T>, T]) => any): any;
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

  deleteInteface<T>(interface: Interface<T>): Interface<T>;
  deleteInteface<T>(instance: T): Interface<T>;

  deleteImplementation<T>(interface: Interface<T>): boolean;
  deleteImplementation<T>(instance: T): boolean;

  deleteInstance<T>(interface: Interface<T>): boolean;
  deleteInstance<T>(instance: T): boolean;

  clearInterfaces(): void;
  clearImplementations(): void;
  clearInstances(): void;

  findReturn<R>(func: <T>(entry: [Interface<T>, Implementation<T>, T], container: Container) => R): R;
  forEach(func: <T>(entry: [Interface<T>, Implementation<T>, T], container: Container) => any): void;
}

export const Container: ContainerConstructor;
