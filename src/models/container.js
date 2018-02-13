import { findReturn } from '../utils/findReturn';

export class Container {

  static get INTERFACE() { return 'interface'; }
  static get IMPLEMENTATION() { return 'implementation'; }
  static get INSTANCE() { return 'instance'; }

  static get ENTRY() { return [ this.INTERFACE, this.IMPLEMENTATION, this.INSTANCE ]; }

  static toArray(entry = {}) {
    return Array.isArray(entry) ? entry : this.ENTRY.map(index => entry[index]);
  }
  static toObject(array = []) {
    return !Array.isArray(array) ? array : array.reduce((entry, value, index) => Object.assign(entry, { [this.ENTRY[index]]: value }), {});
  }

  get size() { return this[Container.IMPLEMENTATION].size; }

  constructor(container = [], MapConstructor = Map) {
    this.parent = container.parent;
    Container.ENTRY.forEach(index => this[index] = new MapConstructor);

    if (container.forEach) { container.forEach(entry => this.set(entry)); }
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

  setInterface(impl, inter) {
    return this.set([ inter, impl ])[Container.INTERFACE];
  }
  setImplementation(impl) {
    return this.set([, impl ])[Container.IMPLEMENTATION];
  }
  setInstance(impl, inst) {
    return this.set([, impl, inst ])[Container.INSTANCE];
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
    if (this[index].has(search)) { return search; }

    const impl = this[Container.INTERFACE].get(search) || this[Container.INSTANCE].get(search) || search;
    return (this[Container.IMPLEMENTATION].get(impl) || {})[index] || this.getFromParent(index, search);
  }
  set(value) {
    const [ inter, impl,  inst ] = Container.toArray(value);
    const entry = this[Container.IMPLEMENTATION].get(impl) || {};

    this[Container.IMPLEMENTATION].set(impl, entry);
    if (inter !== undefined) { this[Container.INTERFACE].set(inter, impl); }
    if (inst !== undefined) { this[Container.INSTANCE].set(inst, impl); }

    return Object.assign(entry, Container.toObject(value));
  }
  delete(index, value) {
    const entry = this[Container.IMPLEMENTATION].get(this.get(Container.IMPLEMENTATION, value)) || {};
    const deleted = entry[index];

    delete entry[index];
    return this[index].delete(deleted) ? deleted : undefined;
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
    return findReturn(this[Container.IMPLEMENTATION], ([, entry]) => func(Container.toArray(entry), this));
  }

  forEach(func) {
    return this[Container.IMPLEMENTATION].forEach(entry => func(Container.toArray(entry), this));
  }
}
