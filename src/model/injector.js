import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { factorySymbol, implementsSymbol } from '../providers/symbols';
import { findSet } from '../utils/findSet';

const implementsValidation = (inter, impl, base) => {
  let validator;
  if (validator = (inter || {})[implementsSymbol]) {
    return validator(impl);
  }
  if (validator = (impl || {})[implementsSymbol]) {
    return validator(inter);
  }
  return base(inter, impl);
};

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
  return injector;
}

export class Injector {

  static set implements(_implements) { this._implements = _implements; }
  static get implements() { return (inter, impl) => implementsValidation(inter, impl, this._implements); }

  static set baseFactory(_baseFactory) { this._baseFactory = _baseFactory; }
  static get baseFactory() { return impl => ((impl || {})[factorySymbol] || this._baseFactory)(impl); }

  constructor(injector) { Object.assign(this, createBaseInjector(injector)); }

  set implements(_implements) { this._implements = _implements; }
  get implements() { return this._implements || this.constructor.implements; }

  set baseFactory(_baseFactory) { this._baseFactory = _baseFactory; }
  get baseFactory() { return this._baseFactory || this.constructor.baseFactory; }

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

  findImplementation(inter) {
    let impl = this.container.getImplementation(inter);
    if (!inter || impl) {
      return impl;
    }
    impl = findSet(this.container.implementations, impl => this.implements(inter, impl));
    this.container.link(inter, impl);

    return impl;
  }
  findInterface(impl) {
    let inter;
    if (!impl || (inter = this.container.getInterface(impl))) {
      return inter;
    }
    inter = findSet(this.container.interfaces, inter => this.implements(inter, impl));
    this.container.link(inter, impl);

    return inter;
  }
  findInstance(impl) {
    return this.container.getInstance(impl);
  }

  generate(impl) {
    impl = this.findImplementation(impl);
    const inst = (this.factories.get(impl) || this.baseFactory)(impl);

    this.set(impl, inst);

    return inst;
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
    this.container.setInstance(this.emitter.emitSet(impl, inst), impl);

    return this;
  }
  delete(impl) {
    impl = this.findImplementation(impl);
    const inst = this.findInstance(impl);

    this.container.deleteInstance(impl);
    this.emitter.emitDelete(impl, inst);

    return this;
  }

  clear() {
    this.container.clearInstances();
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
}
