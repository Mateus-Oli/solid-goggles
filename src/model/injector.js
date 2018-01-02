import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../error/injectorError';
import { Container } from './container';
import { inject, canImplement, generated } from '../providers/symbols';

export class Injector {

  constructor(injector = {}, ContainerConstructor = Container, EmitterConstructor = InjectorEmitter, MapConstructor = Map) {
    this.baseFactory = injector.baseFactory;
    this.baseCanImplement = injector.baseCanImplement;

    this.emitter = new EmitterConstructor(injector.emitter, MapConstructor);
    this.container = new ContainerConstructor(injector.container, MapConstructor);
    this.factories = new MapConstructor(injector.factories);
  }

  get(inter) {
    return this.tryGet(inter) || this.error(inter);
  }
  set(inter, inst) {
    const impl = this.findImplementation(inter);
    return this.container.setInstance(impl, this.emitter.emitSet(impl, inst));
  }
  delete(inter) {
    const inst = this.findInstance(inter);
    const impl = this.container.getImplementation(inst);

    return this.container.deleteInstance(impl) && this.emitter.emitDelete(impl, inst);
  }

  tryGet(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitGet(impl, this.findInstance(impl) || this.generate(impl));
  }
  setImplementation(impl) {
    return impl && this.container.setImplementation(impl);
  }

  link(inter, impl) {
    return this.tryLink(inter, impl) || this.error(inter, impl, InjectorError.LINK_ERROR);
  }
  tryLink(inter, impl) {
    return this.canImplement(inter, impl) && this.container.setInterface(inter, impl);
  }

  factory(impl, factory) {
    this.factories.set(impl, factory);
    return factory;
  }

  onEvery(impl, listener) {
    return this.emitter.onEvery(impl, listener);
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
  generated(inst) {
    const data = inst && inst[generated] && inst[generated](this) || {};
    Object.keys(data).forEach(key => inst[key] = this.get(data[key]));

    return inst;
  }

  instantiate(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitInstantiate(impl, this.getFactory(impl)(impl, this.inject(impl), this));
  }
  inject(impl) {
    return [].concat(impl && impl[inject] && impl[inject](this) || []).map(dependency => this.get(dependency));
  }

  clear() {
    this.container.forEach(([,, inst ]) => inst && this.delete(inst));
    return this;
  }

  findImplementation(inter) {
    if (!inter) {
      return inter;
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
    return this.getCanImplement(inter, impl)(inter, impl, this);
  }

  getFactory(impl) {
    return this.factories.get(impl) || this.baseFactory ||  this.constructor.baseFactory;
  }
  getCanImplement(inter = {}, impl = {}) {
    return inter[canImplement] || impl[canImplement] || this.baseCanImplement || this.constructor.baseCanImplement;
  }

  error(inter, impl, message, ErrorConstructor = InjectorError) {
    throw new ErrorConstructor(inter, impl, message);
  }
}
