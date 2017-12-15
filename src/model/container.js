export class Container {

    static get INTERFACE() { return 0; }
    static get IMPLEMENTATION() { return 1; }
    static get INSTANCE() { return 2; }

    get size() { return this.entries.length; }

    constructor(container = []) {
      this.entries = [];
      container.forEach(entry => this.setEntryBy(1, entry));
    }

    link(inter, impl) {
      return this.setEntryBy(Container.IMPLEMENTATION, [inter, impl, undefined]);
    }
    addImplementation(impl) {
      return this.setEntryBy(Container.IMPLEMENTATION, [undefined, impl, undefined]);
    }
    setInstance(impl, inst) {
      return this.setEntryBy(Container.IMPLEMENTATION, [undefined, impl, inst]);
    }

    getInterface(inter) {
      return this.findAndGetEntryIndexBy(inter, Container.INTERFACE);
    }
    getImplementation(impl) {
      return this.findAndGetEntryIndexBy(impl, Container.IMPLEMENTATION);
    }
    getInstance(inst) {
      return this.findAndGetEntryIndexBy(inst, Container.INSTANCE);
    }

    deleteInterface(inter) {
      return this.findAndSetEntryIndexBy(inter, Container.INTERFACE);
    }
    deleteImplementation(impl) {
      return this.findAndSetEntryIndexBy(impl, Container.IMPLEMENTATION);
    }
    deleteInstance(inst) {
      return this.findAndSetEntryIndexBy(inst, Container.INSTANCE);
    }

    clearInterface() {
      return this.clearByIndex(Container.INTERFACE);
    }
    clearImplementation() {
      return this.clearByIndex(Container.IMPLEMENTATION);
    }
    clearInstance() {
      return this.clearByIndex(Container.INSTANCE);
    }

    clear() {
      this.entries = [];
      return this;
    }

    clearByIndex(...index) {
      return this.forEach(entry => index.forEach(i => entry[i] = undefined));
    }

    findAndGetEntryIndexBy(search, index) {
      return this.findReturn(entry => entry.includes(search) && entry[index]);
    }
    findAndSetEntryIndexBy(search, index, value) {
      let entry = this.getEntry(search);
      if (!entry) {
        this.entries.push(entry = []);
      }
      entry[index] = value;

      return this;
    }

    getEntryBy(index, value) {
      return this.find(entry => entry[index] === value);
    }
    setEntryBy(index, values) {
      let entry = this.getEntryBy(index, values[index]);
      if (!entry) {
        this.entries.push(entry = []);
      }
      this.overwrite(entry, values);
      return this;
    }

    getEntry(value) {
      return this.find(entry => entry.includes(value));
    }

    find(func) {
      return this.findReturn(entry => func(entry, this) && entry);
    }
    findReturn(func) {
      for (const entry of this.entries) {
        const value = func(entry, this);
        if (value) {
          return value;
        }
      }
    }

    forEach(func) {
      this.entries.forEach(func);
      return this;
    }

    overwrite(entry, ...values) {
      values.reverse()
        .forEach(value => value
          .forEach((v, k) => entry[k] = v === undefined ? entry[k] : v));

      return entry;
    }
  }
