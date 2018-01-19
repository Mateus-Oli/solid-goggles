export type Implementation<T = any, V = any> = new (...args: V[]) => T;
export type Interface<T = any, V = any> = new (...args: V[]) => {
  [K in keyof T]: T[K]
};

export interface ContainerConstructor {
  new (container?: ContainerEquivalent): Container;
  new (container?: ContainerEquivalent, MapConstructor?: new <K, V>(map?: Map<K, V>) => Map<K, V>): Container;
}

export interface ContainerEquivalent {
  forEach(func: <T>(entry: [Interface<T>, Implementation<T>, T]) => any): any;
}

export interface Container {
  parent: Container;

  readonly size: number;

  getInterface<T>(interface: Interface<T>): Interface<T>;
  getInterface<T>(instance: T): Interface<T>;
  getInterface<T>(instance: any): T;

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

  deleteInterface<T>(interface: Interface<T>): Interface<T>;
  deleteInterface<T>(instance: T): Interface<T>;
  deleteInterface<T>(instance: any): T;

  deleteImplementation<T>(interface: Interface<T>): Implementation<T>;
  deleteImplementation<T>(instance: T): Implementation<T>;
  deleteImplementation<T>(instance: any): T;

  deleteInstance<T>(interface: Interface<T>): T;
  deleteInstance<T>(instance: T): T;
  deleteInstance<T>(instance: any): T;

  clearInterfaces(): void;
  clearImplementations(): void;
  clearInstances(): void;

  findReturn<T>(func: (entry: [Interface, Implementation, any]) => T): T;
  findReturn<T>(func: (entry: [any, any, any]) => T): T;

  forEach(func: (entry: [Interface, Implementation, any]) => any): void;
  forEach(func: (entry: [any, any, any]) => any): void;
}

export const Container: ContainerConstructor;
