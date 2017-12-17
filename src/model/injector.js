import { injectSymbol } from '../';
import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { implementsSymbol } from '../providers/symbols';
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
    return this.container.setInstance(impl, this.emitter.emitSet(impl, inst));
  }
  delete(impl) {
    const inst = this.findInstance(impl);
    impl = this.container.getImplementation(inst);

    if (this.container.deleteInstance(impl)) {
      return this.emitter.emitDelete(impl, inst);
    }
  }

  getInstance(impl) {
    impl = this.findImplementation(impl);
    return impl && this.emitter.emitGet(impl, this.findInstance(impl) || this.generate(impl));
  }
  setImplementation(impl) {
    return this.container.setImplementation(impl);
  }

  link(inter, impl) {
    if (!this.canImplement(inter, impl)) {
      throw new InjectorError(inter, impl, InjectorError.LINK_ERROR);
    }
    this.container.setInterface(inter, impl);
    return impl;
  }

  factory(impl, factory) {
    if (impl) {
      this.factories.set(impl, factory);
    }
    return factory;
  }

  onGet(impl, listener) {
    return this.emitter.onGet(impl, listener);
  }
  onSet(impl, listener) {
    return this.emitter.onSet(impl, listener);
  }
  onDelete(impl, listener) {
    return this.emitter.onDelete(impl, listener);
  }
  onInstantiate(impl, listener) {
    return this.emitter.onInstantiate(impl, listener);
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
    this.container.forEach(([,, inst ]) => inst && this.delete(inst));
    return this;
  }

  findImplementation(inter) {
    let impl = this.container.getImplementation(inter);
    if (!inter || impl) {
      return impl;
    }
    impl = this.container.findReturn(([, impl]) => this.canImplement(inter, impl) && impl);
    this.container.setInterface(inter, impl);

    return impl;
  }
  findInterface(impl) {
    return this.container.getInterface(impl);
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
