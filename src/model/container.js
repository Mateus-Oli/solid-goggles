export class Container {

    static get INTERFACE() { return 0; }
    static get IMPLEMENTATION() { return 1; }
    static get INSTANCE() { return 2; }

    get size() { return this.entries.length; }

    constructor(container = []) {
      this.entries = [];
      container.forEach(entry => this.setEntryLike(entry));
    }

    link(inter, impl) {
      return this.setEntryBy(Container.IMPLEMENTATION, [inter, impl]);
    }
    addImplementation(impl) {
      return this.setEntryBy(Container.IMPLEMENTATION, [, impl]);
    }
    setInstance(impl, inst) {
      return this.setEntryBy(Container.IMPLEMENTATION, [, impl, inst]);
    }

    getInterface(inter) {
      return this.findAndGetEntryValueBy(inter, Container.INTERFACE);
    }
    getImplementation(impl) {
      return this.findAndGetEntryValueBy(impl, Container.IMPLEMENTATION);
    }
    getInstance(inst) {
      return this.findAndGetEntryValueBy(inst, Container.INSTANCE);
    }

    deleteInterface(inter) {
      return this.findAndDeleteEntryValueBy(inter, Container.INTERFACE);
    }
    deleteImplementation(impl) {
      return this.findAndDeleteEntryValueBy(impl, Container.IMPLEMENTATION);
    }
    deleteInstance(inst) {
      return this.findAndDeleteEntryValueBy(inst, Container.INSTANCE);
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

    findAndGetEntryValueBy(search, index) {
      return this.findReturn(entry => entry.includes(search) && entry[index]);
    }
    findAndSetEntryValueBy(search, index, value) {
      let entry = this.findEntry(search);
      if (!entry) {
        this.entries.push(entry = []);
      }
      return entry[index] = value;
    }
    findAndDeleteEntryValueBy(search, index) {
      let entry = this.findEntry(search);
      if (entry) {
        entry[index] = undefined;
      }
      return this;
    }

    findEntry(search) {
      return this.find(entry => entry.includes(search));
    }

    getEntryLike(entry) {
      return this.find(e => entry.every((v, i) => v === undefined || v === e[i]));
    }
    setEntryLike(entry, value = entry) {
      entry = this.getEntryLike(entry);
      if (!entry) {
        this.entries.push(entry = []);
      }
      return Object.assign(entry, value);
    }
    deleteEntryLike(entry) {
      const indexOf = this.entries.indexOf(this.getEntryLike(entry));
      this.entries.splice(indexOf, 1);

      return indexOf !== -1;
    }

    getEntryBy(index, value) {
      return this.find(entry => entry[index] === value);
    }
    setEntryBy(index, values) {
      let entry = this.getEntryBy(index, values[index]);
      if (!entry) {
        this.entries.push(entry = []);
      }
      return Object.assign(entry, values);
    }
    deleteEntryBy(index, value) {
      const indexOf = this.entries.indexOf(this.getEntryBy(index, value));
      this.entries.splice(indexOf, 1);

      return indexOf !== -1;
    }

    find(func) {
      return this.findReturn(entry => func(entry) && entry);
    }
    findReturn(func) {
      for (const entry of this.entries) {
        const value = func(entry);
        if (value) {
          return value;
        }
      }
    }

    forEach(func) {
      this.entries.forEach(func);
      return this;
    }
  }
