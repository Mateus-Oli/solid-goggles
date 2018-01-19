import { InjectorError } from '../error/injectorError';
import { findReturn } from '../utils/findReturn';
import { error } from '../utils/error';

export class InjectorGroup {

  get size() { return this.injectors.size; }

  constructor(injectorGroup = [], SetConstructor = Set) {
    this.injectors = new SetConstructor;
    injectorGroup.forEach(injector => this.injectors.add(injector));
  }

  get(inter) {
    return this.tryGet(inter) || error(new InjectorError(inter));
  }

  tryGet(inter) {
    return this.findReturn(injector => injector.tryGet(inter));
  }

  getInjector(inst) {
    return this.find(({ container }) => container.getImplementation(inst));
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
    return findReturn(this.injectors, fn);
  }

  forEach(fn) {
    this.injectors.forEach(injector => fn(injector));
    return this;
  }
}
