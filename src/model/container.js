import { keyFromValue } from '../utils/keyFromValue';

const baseContainer = {
  interfaces: new Set,
  implementations: new Set,
  links: new Map,
  instances: new Map
};

function createBaseContainer(base = baseContainer) {
  const container = {};
  for (const prop in baseContainer) {
    container[prop] = new baseContainer[prop].constructor(base[prop]);
  }
  return container;
}

export class Container {

  constructor(container) { Object.assign(this, createBaseContainer(container)); }

  setInterface(inter) {
    if (inter) {
      this.interfaces.add(inter);
    }
    return this;
  }
  setImplementation(impl) {
    if (impl) {
      this.implementations.add(impl);
    }
    return this;
  }
  setInstance(inst, impl) {
    if (impl) {
      this.setImplementation(impl);
      this.instances.set(impl, inst);
    }
    return this;
  }

  link(inter, impl) {
    if (!inter || !impl) {
      return this;
    }
    this.setInterface(inter);
    this.setImplementation(impl);

    this.links.set(inter, impl);

    return this;
  }

  isInterface(inter) {
    return this.interfaces.has(inter);
  }
  isImplementation(impl) {
    return this.implementations.has(impl);
  }
  isInstance(inst) {
    return !!keyFromValue(this.instances, inst);
  }

  getInterface(impl) {
    if (!impl || this.isInterface(impl)) {
      return impl;
    }
    return keyFromValue(this.links, impl);
  }
  getImplementation(inter) {
    if (!inter || this.isImplementation(inter)) {
      return inter;
    }
    return this.links.get(inter);
  }

  getImplementationFromInstance(inst) {
    if (!inst || this.isImplementation(inst)) {
      return inst;
    }
    return keyFromValue(this.instances, inst);
  }
  getInterfaceFromInstance(inst) {
    if (!inst || this.isInterface(inst)) {
      return inst;
    }
    return this.getInterface(this.getImplementationFromInstance(inst));
  }

  getInstance(impl) {
    if (!impl || this.isInstance(impl)) {
      return impl;
    }
    return this.instances.get(this.getImplementation(impl));
  }

  deleteInterface(inter) {
    this.interfaces.delete(this.getInterface(inter));
    return this;
  }
  deleteImplementation(impl) {
    this.implementations.delete(this.getImplementation(impl));
    return this;
  }
  deleteInstance(inst) {
    this.instances.delete(this.getImplementationFromInstance(inst));
    return this;
  }

  unlink(inter) {
    this.links.delete(this.getInterface(inter));
    return this;
  }

  clearInterfaces() {
    this.interfaces.clear();
    return this;
  }
  clearImplementations() {
    this.implementations.clear();
    return this;
  }
  clearInstances() {
    this.instances.clear();
    return this;
  }
  clearLinks() {
    this.links.clear();
    return this;
  }

  clear() {
    return this
      .clearLinks()
      .clearInterfaces()
      .clearImplementations()
      .clearInstances();
  }
}
