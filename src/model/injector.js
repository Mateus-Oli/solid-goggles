import { injectSymbol } from '../';
import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { implementsSymbol } from '../providers/symbols';
import { findSet } from '../utils/findSet';
import { baseCreator } from '../providers/baseCreator';

const createBaseInjector = baseCreator({
  emitter: new InjectorEmitter,
  container: new Container,
  factories: new Map
});

export class Injector {

  constructor(injector) { Object.assign(this, createBaseInjector(injector)); }

  get(inter) {
    const impl = this.findImplementation(inter);
    if (!impl) {
      throw new InjectorError(inter);
    }
    return this.getInstance(impl);
  }
  set(impl, inst) {
    impl = this.findImplementation(impl);
    this.container.setInstance(inst = this.emitter.emitSet(impl, inst), impl);

    return inst;
  }
  delete(impl) {
    const inst = this.findInstance(impl);
    impl = this.container.getImplementationFromInstance(inst);

    this.container.deleteInstance(impl);

    return this.emitter.emitDelete(impl, inst);
  }

  getInstance(impl) {
    impl = this.findImplementation(impl);
    return impl && this.emitter.emitGet(impl, this.findInstance(impl) || this.generate(impl));
  }
  setImplementation(impl) {
    this.container.setImplementation(impl);
    return this;
  }

  link(inter, impl) {
    if (!this.canImplement(inter, impl)) {
      throw new InjectorError(inter, impl, InjectorError.LINK_ERROR);
    }
    this.container.link(inter, impl);

    return this;
  }
  unlink(impl) {
    this.container.unlink(impl);
    return this;
  }

  factory(impl, fn) {
    if (impl) {
      this.factories.set(impl, fn);
    }
    return this;
  }

  onGet(impl, listener) {
    this.emitter.onGet(impl, listener);
    return this;
  }
  onSet(impl, listener) {
    this.emitter.onSet(impl, listener);
    return this;
  }
  onDelete(impl, listener) {
    this.emitter.onDelete(impl, listener);
    return this;
  }
  onInstantiate(impl, listener) {
    this.emitter.onInstantiate(impl, listener);
    return this;
  }

  generate(impl) {
    impl = this.findImplementation(impl);
    return this.inject(this.set(impl, this.instantiate(impl)));
  }
  instantiate(impl) {
    impl = this.findImplementation(impl);
    return impl && this.emitter.emitInstantiate(impl, this.getFactory(impl)(impl, this));
  }
  inject(inst) {
    if (inst && inst[injectSymbol]) {
      inst[injectSymbol](this);
    }
    return inst;
  }

  clear() {
    this.container.forEach(inst => this.delete(inst));
    return this;
  }

  findInterface(impl) {
    let inter = this.container.getInterface(impl);
    if (!impl || inter) {
      return inter;
    }
    inter = findSet(this.container.interfaces, inter => this.canImplement(inter, impl));
    this.container.link(inter, impl);

    return inter;
  }
  findImplementation(inter) {
    let impl = this.container.getImplementation(inter);
    if (!inter || impl) {
      return impl;
    }
    impl = findSet(this.container.implementations, impl => this.canImplement(inter, impl));
    this.container.link(inter, impl);

    return impl;
  }
  findInstance(impl) {
    return this.container.getInstance(impl);
  }

  canImplement(inter, impl) {
    return this.getImplements(inter, impl)(inter, impl, this);
  }

  getFactory(impl) {
    return this.factories.get(impl) || this.baseFactory ||  this.constructor.baseFactory;
  }
  getImplements(inter = {}, impl = {}) {
    return inter[implementsSymbol] || impl[implementsSymbol] || this.baseImplements || this.constructor.baseImplements;
  }
}
