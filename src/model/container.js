import { findReturn } from "../utils/findReturn";


export class Container {

  static get INTERFACE() { return 'interface'; }
  static get IMPLEMENTATION() { return 'implementation'; }
  static get INSTANCE() { return 'instance'; }

  get size() { return this[Container.IMPLEMENTATION].size; }

  constructor(container = [], MapConstructor = Map) {
    this.parent = container.parent;
    [Container.INTERFACE, Container.IMPLEMENTATION, Container.INSTANCE].forEach(index => this[index] = new MapConstructor);

    if (container.forEach) {
      container.forEach(entry => this.set(this.toEntry(entry)));
    }
  }

  getInterface(value) {
    return this.get(Container.INTERFACE, value);
  }
  getImplementation(value) {
    return this.get(Container.IMPLEMENTATION, value);
  }
  getInstance(value) {
    return this.get(Container.INSTANCE, value);
  }

  setInterface(inter, impl) {
    return this.set({ [Container.INTERFACE]: inter, [Container.IMPLEMENTATION]: impl })[Container.INTERFACE];
  }
  setImplementation(impl) {
    return this.set({[ Container.IMPLEMENTATION]: impl })[Container.IMPLEMENTATION];
  }
  setInstance(impl, inst) {
    return this.set({ [Container.IMPLEMENTATION]: impl, [Container.INSTANCE]: inst })[Container.INSTANCE];
  }

  deleteInterface(value) {
    return this.delete(Container.INTERFACE, value);
  }
  deleteImplementation(value) {
    return this.delete(Container.IMPLEMENTATION, value);
  }
  deleteInstance(value) {
    return this.delete(Container.INSTANCE, value);
  }

  clearInterfaces() {
    return this.clear(Container.INTERFACE);
  }
  clearImplementations() {
    return this.clear(Container.IMPLEMENTATION);
  }
  clearInstances() {
    return this.clear(Container.INSTANCE);
  }

  get(index, search) {
    if (this[index].has(search)) {
      return search;
    }
    const impl = this[Container.INTERFACE].get(search) || this[Container.INSTANCE].get(search) || search;
    return (this[Container.IMPLEMENTATION].get(impl) || {})[index] || this.getFromParent(index, search);
  }
  set(value) {
    const [ inter, impl,  inst ] = this.toArray(value);
    const entry = this[Container.IMPLEMENTATION].get(impl) || {};

    this[Container.IMPLEMENTATION].set(impl, entry);
    this[Container.INTERFACE].set(inter, impl);
    this[Container.INSTANCE].set(inst, impl);

    return Object.assign(entry, value);
  }
  delete(index, value) {
    const entry = this[Container.IMPLEMENTATION].get(this.get(Container.IMPLEMENTATION, value)) || {};
    const deleted = entry[index];

    delete entry[index];
    return this[index].delete(deleted) && deleted;
  }

  clear(...index) {
    index.forEach(i => {
      this[i].clear();
      this[Container.IMPLEMENTATION].forEach(entry => delete entry[i]);
    });
  }

  getFromParent(index, value) {
    return this.parent && this.parent.get(index, value);
  }

  findReturn(func) {
    return findReturn(this[Container.IMPLEMENTATION], ([, entry]) => func(this.toArray(entry), this));
  }

  forEach(func) {
    return this[Container.IMPLEMENTATION].forEach(entry => func(this.toArray(entry), this));
  }

  toArray(entry = {}) {
    return Array.isArray(entry) ? entry : [ entry[Container.INTERFACE], entry[Container.IMPLEMENTATION], entry[Container.INSTANCE] ];
  }
  toEntry(entry = []) {
    return !Array.isArray(entry) ? entry : { [Container.INTERFACE]: entry[0], [Container.IMPLEMENTATION]: entry[1], [Container.INSTANCE]: entry[2] };
  }
}
