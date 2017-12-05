export type Implementation<T = any, V = any> = new(...args: V[]) => T;
export type Interface<T = any, V = any> = new(...args: V[]) => {[K in keyof T]: T[K]};

export type MapEquivalent<K, V> = Map<K, V> | [K, V][];
export type SetEquivalent<V> = Set<V> | V[];

export interface BaseContainer {
  interfaces: SetEquivalent<Interface>;
  implementations: SetEquivalent<Implementation>;
  links: MapEquivalent<Interface, Implementation>;
  instances: MapEquivalent<Implementation, {[k: string]: any}>;
}

export interface ContainerConstructor {
  new(container?: Container | BaseContainer): Container;
}

export interface Container {

  setInterface<T>(interface: Interface<T>): this ;
  setImplementation<T>(implementation: Implementation<T>): this;
  setInstance<T>(instance: T, implementation?: Implementation<T>): this;

  link<T>(interface: Interface<T>, implementation: Implementation<T>): this;

  isInterface<T>(interface: Interface<T>): boolean;
  isImplementation<T>(implementation: Implementation<T>): boolean;
  isInstance<T>(instance: T): boolean;

  getInterface<T>(implementation: Implementation<T>): Interface<T>;
  getImplementation<T>(interface: Interface<T>): Implementation<T>;

  getImplementationFromInstance<T>(instance: T): Implementation<T>;

  getInstance<T>(implementation: Implementation<T>): T;

  deleteInterface<T>(interface: Interface<T>): this;
  deleteImplementation<T>(implementation: Implementation<T>): this;
  deleteInstance<T>(instance: T): this;

  unlink<T>(interface: Interface<T>, implementation: Implementation<T>): this;

  clearInterfaces(): this;
  clearImplementations(): this;
  clearInstances(): this;
  clearLinks(): this;

  clear(): this;
}

export const Container: ContainerConstructor;
