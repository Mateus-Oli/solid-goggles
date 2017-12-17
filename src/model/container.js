
export class Container {

  static get ENTRY() { return {}; }

  static get INTERFACE() { return 'interface'; }
  static get IMPLEMENTATION() { return 'implementation'; }
  static get INSTANCE() { return 'instance'; }

  get size() { return this[Container.IMPLEMENTATION].size; }

  constructor(container = []) {
    this[Container.INTERFACE] = new Map;
    this[Container.IMPLEMENTATION] = new Map;
    this[Container.INSTANCE] = new Map;

    this.parent = container.parent;

    container.forEach(([ inter, impl, inst ]) => this.set({
      [Container.INTERFACE]: inter,
      [Container.IMPLEMENTATION]: impl,
      [Container.INSTANCE]: inst
    }));
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

  get(index, value) {
    value = this[Container.INTERFACE].get(value) || this[Container.INSTANCE].get(value) || value;
    return (this[Container.IMPLEMENTATION].get(value) || Container.ENTRY)[index] || this.getFromParent(index, value);
  }
  set(value) {
    const {
      [Container.INTERFACE]: inter,
      [Container.IMPLEMENTATION]: impl,
      [Container.INSTANCE]: inst
    } = value;

    const entry = this[Container.IMPLEMENTATION].get(impl) || Container.ENTRY;

    this[Container.IMPLEMENTATION].set(impl, entry);
    this[Container.INTERFACE].set(inter, impl);
    this[Container.INSTANCE].set(inst, impl);

    return Object.assign(entry, value);
  }
  delete(index, value) {
    const entry = this[Container.IMPLEMENTATION].get(this.get(Container.IMPLEMENTATION, value)) || Container.ENTRY;
    const deleted = entry[index];

    delete entry[index];
    return this[index].delete(deleted);
  }

  getFromParent(index, value) {
    if (this.parent) {
      return this.parent.get(index, value);
    }
  }

  clear(...index) {
    if (index.indexOf(Container.IMPLEMENTATION) !== -1) {
      this[Container.INTERFACE].clear();
      this[Container.IMPLEMENTATION].clear();
      this[Container.INSTANCE].clear();

      return;
    }
    index.forEach(i => {
      this[Container.IMPLEMENTATION].forEach(entry => delete entry[i]);
      this[i].clear();
    });
  }

  findReturn(func) {
    for (const [, entry] of this[Container.IMPLEMENTATION]) {
      const value = func([
        entry[Container.INTERFACE],
        entry[Container.IMPLEMENTATION],
        entry[Container.INSTANCE]
      ]);
      if (value) {
        return value;
      }
    }
  }

  forEach(func) {
    this[Container.IMPLEMENTATION].forEach(entry => func([
      entry[Container.INTERFACE],
      entry[Container.IMPLEMENTATION],
      entry[Container.INSTANCE]
    ]));
  }
}
