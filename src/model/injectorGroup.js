import { InjectorError } from '../error/injectorError';

export class InjectorGroup {

  get size() { return this.injectors.size; }

  constructor(injectorGroup = []) {
    this.injectors = new Set;
    injectorGroup.forEach(injector => this.injectors.add(injector));
  }

  get(inter) {
    return this.tryGet(inter) || this.error(inter);
  }

  tryGet(inter) {
    return this.findReturn(injector => injector.tryGet(inter));
  }

  getInjector(inst) {
    return this.find(({ container }) => container.getInstance(inst) || container.getImplementation(inst) || container.getInterface(inst));
  }
  setInjector(injector) {
    this.injectors.add(injector);
    return injector;
  }
  deleteInjector(injector) {
    return this.injectors.delete(injector) && injector;
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

  error(inter, impl, message) {
    throw new InjectorError(inter, impl, message);
  }
}
