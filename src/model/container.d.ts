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
  getInteface<T>(instance: any): T;

  getImplementation<T>(interface: Interface<T>): Implementation<T>;
  getImplementation<T>(instance: T): Implementation<T>;
  getImplementation<T>(instance: any): T;

  getInstance<T>(interface: Interface<T>): T;
  getInstance<T>(instance: T): T;
  getInstance<T>(instance: any): T;

  setInterface<T>(interface: Interface<T>, implementation: Implementation<T>): Interface<T>;
  setInterface<T>(interface: T, implementation: any): T;

  setImplementation<T>(implementation: Implementation<T>): Implementation<T>;
  setImplementation<T>(implementation: T): T;

  setInstance<T>(implementation: Implementation<T>, instance: T): T;
  setInstance<T>(implementation: any, instance: T): T;

  deleteInteface<T>(interface: Interface<T>): Interface<T>;
  deleteInteface<T>(instance: T): Interface<T>;
  deleteInteface<T>(instance: any): T;

  deleteImplementation<T>(interface: Interface<T>): Implementation<T>;
  deleteImplementation<T>(instance: T): Implementation<T>;
  deleteImplementation<T>(instance: any): T;

  deleteInstance<T>(interface: Interface<T>): T;
  deleteInstance<T>(instance: T): T;
  deleteInstance<T>(instance: any): T;

  clearInterfaces(): void;
  clearImplementations(): void;
  clearInstances(): void;
}

export const Container: ContainerConstructor;
