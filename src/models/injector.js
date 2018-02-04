import { InjectorEmitter } from './injectorEmitter';
import { InjectorError } from '../errors/injectorError';
import { Container } from './container';
import { canImplement, parameters, properties, getImplementation } from '../providers/symbols';
import { error } from '../utils/error';
import { getReturn } from '../utils/getReturn';

export class Injector {

  static of(...impls) {
    const injector = new this;
    impls.forEach(impl => injector.setImplementation(impl));

    return injector;
  }

  constructor(injector = {}, ContainerConstructor = Container, EmitterConstructor = InjectorEmitter, MapConstructor = Map) {
    this.baseFactory = injector.baseFactory;
    this.baseCanImplement = injector.baseCanImplement;

    this.emitter = new EmitterConstructor(injector.emitter, MapConstructor);
    this.container = new ContainerConstructor(injector.container, MapConstructor);
    this.factories = new MapConstructor(injector.factories);
  }

  get(inter) {
    return this.tryGet(inter) || error(new InjectorError(inter));
  }
  set(inter, inst) {
    const impl = this.findImplementation(inter);
    return inst && this.container.setInstance(impl, this.emitter.emitSet(impl, inst));
  }
  delete(inter) {
    const inst = this.findInstance(inter);
    const impl = this.container.getImplementation(inst);

    return this.container.deleteInstance(impl) && this.emitter.emitDelete(impl, inst);
  }

  tryGet(inter) {
    const impl = this.findImplementation(inter);
    const inst = this.findInstance(impl) || this.generate(impl);

    return impl && inst && this.emitter.emitGet(impl, inst);
  }
  setImplementation(impl) {
    return impl && this.container.setImplementation(impl);
  }

  link(inter, impl) {
    return this.tryLink(inter, impl) || error(new InjectorError(inter, impl, InjectorError.LINK_ERROR));
  }
  tryLink(inter, impl) {
    return this.canImplement(inter, impl) && this.container.setInterface(impl, inter);
  }

  factory(impl, factory) {
    if (!factory) { return this.baseFactory = impl; }
    this.factories.set(this.setImplementation(impl), factory);

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
    const inst = this.set(impl, this.instantiate(impl));

    return inst && Object.assign(inst, this.properties(inst));
  }

  properties(inst) {
    const data = inst && getReturn(inst[properties])(this) || {};
    return Object.keys(data).reduce((obj, key) => Object.assign(obj, { [key]:  this.get(data[key]) }), {});
  }

  instantiate(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitInstantiate(impl, this.getFactory(impl)(impl, this.parameters(impl), this));
  }

  parameters(impl) {
    return [].concat(impl && getReturn(impl[parameters])(this) || []).map(dependency => this.get(dependency));
  }

  clear() {
    this.container.forEach(([,, inst ]) => inst && this.delete(inst));
    return this;
  }

  findImplementation(inter) {
    if (!inter) { return inter; }
    if (inter[getImplementation]) { return this.setImplementation(inter[getImplementation]); }

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
}
