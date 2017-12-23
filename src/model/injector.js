import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { inject, canImplement, generated } from '../providers/symbols';

export class Injector {

  constructor({ container, emitter, factories } = {}) {
    this.emitter = new InjectorEmitter(emitter);
    this.container = new Container(container);
    this.factories = new Map(factories);
  }

  get(inter) {
    return this.getInstance(inter) || this.error(inter);
  }
  set(impl, inst) {
    impl = this.findImplementation(impl);
    return this.container.setInstance(impl, this.emitter.emitSet(impl, inst));
  }
  delete(inter) {
    const inst = this.findInstance(inter);
    const impl = this.container.getImplementation(inst);

    return this.container.deleteInstance(impl) && this.emitter.emitDelete(impl, inst);
  }

  getInstance(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitGet(impl, this.findInstance(impl) || this.generate(impl));
  }
  setImplementation(impl) {
    return this.container.setImplementation(impl);
  }

  link(inter, impl) {
    return this.tryLink(inter, impl) || this.error(inter, impl, InjectorError.LINK_ERROR);
  }
  tryLink(inter, impl) {
    return this.canImplement(inter, impl) && this.container.setInterface(inter, impl);
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

  generate(inter) {
    const impl = this.findImplementation(inter);
    return this.generated(this.set(impl, this.instantiate(impl)));
  }
  instantiate(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitInstantiate(impl, this.getFactory(impl)(impl, this.inject(impl), this));
  }
  inject(impl) {
    return [].concat(impl && impl[inject] && impl[inject](this) || []).map(dependency => this.get(dependency));
  }
  generated(inst) {
    const data = inst && inst[generated] && inst[generated](this) || {};
    Object.keys(data).forEach(key => inst[key] = this.get(data[key]));

    return inst;
  }

  clear() {
    this.container.forEach(([,, inst ]) => inst && this.delete(inst));
    return this;
  }

  findImplementation(inter) {
    if (!inter) {
      return;
    }
    const impl = this.container.getImplementation(inter);
    return impl || this.container.findReturn(([, impl]) => this.tryLink(inter, impl) && impl);
  }
  findInterface(impl) {
    return impl && this.container.getInterface(impl);
  }
  findInstance(impl) {
    return impl && this.container.getInstance(impl);
  }

  canImplement(inter, impl) {
    return this.getImplements(inter, impl)(inter, impl, this);
  }

  getFactory(impl) {
    return this.factories.get(impl) || this.baseFactory ||  this.constructor.baseFactory;
  }
  getImplements(inter = {}, impl = {}) {
    return inter[canImplement] || impl[canImplement] || this.baseImplements || this.constructor.baseImplements;
  }

  error(inter, impl, error) {
    throw new InjectorError(inter, impl, error);
  }
}
