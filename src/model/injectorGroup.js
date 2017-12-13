import { baseCreator } from '../providers/baseCreator';
import { InjectorError } from '../error/injectorError';
import { findSet } from '../utils/findSet';

const createBaseInjectorGroup = baseCreator({
  injectors: new Set
});

export class InjectorGroup {

  get size() { return this.injectors.size; }

  constructor(injectorGroup) { Object.assign(this, createBaseInjectorGroup(injectorGroup)); }

  get(inter) {
    const inst = this.getInstance(inter);
    if (inst) {
      return inst;
    }
    throw new InjectorError(inter);
  }

  getInstance(inter) {
    return this.findReturn(injector => injector.getInstance(inter));
  }

  getInjector(inst) {
    return this
      .find(({ container }) => container.getInstance(inst) || container.getImplementation(inst) || container.getInterface(inst));
  }
  setInjector(injector) {
    this.injectors.add(injector);
    return this;
  }
  deleteInjector(injector) {
    this.injectors.delete(injector);
    return this;
  }

  hasInjector(injector) {
    return this.injectors.has(injector);
  }

  clear() {
    this.injectors.clear();
    return this;
  }

  find(fn) {
    return this.findReturn(injector => fn(injector) && injector);
  }

  findReturn(fn) {
    for (const injector of this.injectors) {
      const value = fn(injector);
      if (value) {
        return value;
      }
    }
  }

  forEach(fn) {
    this.injectors.forEach(injector => fn(injector));
    return this;
  }
}
