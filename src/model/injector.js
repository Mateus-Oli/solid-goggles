import { injectSymbol } from '../';
import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { implementsSymbol } from '../providers/symbols';
import { findSet } from '../utils/findSet';

const baseInjector = {
  emitter: new InjectorEmitter,
  container: new Container,
  factories: new Map
};

function createBaseInjector(base = baseInjector) {
  const injector = {};

  for (const prop in baseInjector) {
    injector[prop] = new baseInjector[prop].constructor(base[prop]);
  }
  injector.implements = base.implements;
  injector.baseFactory = base.baseFactory;

  return injector;
}

export class Injector {

  constructor(injector) { Object.assign(this, createBaseInjector(injector)); }

  canImplement(inter, impl) {
    let validator;

    if (inter && (validator = inter[implementsSymbol])) {
      return validator(impl);
    }
    if (impl && (validator = impl[implementsSymbol])) {
      return validator(inter);
    }
    return (this.implements || this.constructor.implements)(inter, impl);
  }

  setImplementation(impl) {
    this.container.setImplementation(impl);
    return this;
  }

  factory(impl, fn) {
    impl = this.findImplementation(impl);
    if (impl) {
      this.factories.set(impl, fn);
    }
    return this;
  }

  link(inter, impl) {
    if (!this.implements(inter, impl)) {
      throw new InjectorError(inter, impl, InjectorError.LINK_ERROR);
    }
    this.container.link(inter, impl);

    return this;
  }
  unlink(impl) {
    this.container.unlink(impl);
    return this;
  }

  findInterface(impl) {
    let inter;
    if (!impl || (inter = this.container.getInterface(impl))) {
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

  inject(inst) {
    if (inst && inst[injectSymbol]) {
      inst[injectSymbol](this);
    }
    return inst;
  }

  instantiate(impl) {
    impl = this.findImplementation(impl);
    return impl && this.emitter.emitInstantiate(impl, (this.factories.get(impl) || this.baseFactory || this.constructor.baseFactory)(impl));
  }

  generate(impl) {
    impl = this.findImplementation(impl);
    return this.inject(this.set(impl, this.instantiate(impl)));
  }

  get(inter) {
    const impl = this.findImplementation(inter);
    if (!impl) {
      throw new InjectorError(inter, impl, InjectorError.GENERATE_ERROR);
    }
    return this.emitter.emitGet(impl, this.findInstance(impl) || this.generate(impl));
  }
  set(impl, inst) {
    impl = this.findImplementation(impl);
    this.container.setInstance(inst = this.emitter.emitSet(impl, inst), impl);

    return inst;
  }
  delete(impl) {
    impl = this.findImplementation(impl);
    const inst = this.findInstance(impl);

    this.container.deleteInstance(impl);
    this.emitter.emitDelete(impl, inst);

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

  clear() {
    this.container.clearInstances();
    return this;
  }
}
