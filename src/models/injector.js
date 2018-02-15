import { InjectorError } from '../errors/injectorError';
import { canImplement, findImplementation, methods, parameters, properties } from '../providers/symbols';
import { asFunc } from '../utils/asFunc';
import { error } from '../utils/error';
import { extend } from '../utils/extend';
import { fill } from '../utils/fill';
import { objectMap } from '../utils/objectMap';
import { Container } from './container';
import { InjectorEmitter } from './injectorEmitter';

export class Injector {

  static of(...impls) {
    return new this({ container: impls.map(impl => [, impl ]) });
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
    const impl = this.findImplementation(inter) || inter;
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
    if (inter === impl) { return this.setImplementation(impl); }
    return this.canImplement(inter, impl) && this.container.setInterface(impl, inter);
  }

  factory(impl, factory) {
    if (factory === undefined) { return this.baseFactory = impl; }
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

    return extend(inst, this.properties(inst), this.methods(inst));
  }

  instantiate(inter) {
    const impl = this.findImplementation(inter);
    return impl && this.emitter.emitInstantiate(impl, this.getFactory(impl)(impl, this.parameters(impl), this));
  }

  methods(inst = {}) {
    return objectMap(asFunc(inst[methods])(this) || {})((dependencies, index) => {
      const method = inst[index];
      return (...args) => method.apply(inst, fill(dependencies.map(d => d && this.get(d)))(args));
    });
  }

  properties(inst = {}) {
    return objectMap(asFunc(inst[properties])(this) || {})(dependency => this.get(dependency));
  }

  parameters(impl = {}) {
    return [].concat(asFunc(impl[parameters])(this) || []).map(dependency => this.get(dependency));
  }

  clear() {
    this.container.forEach(([,, inst ]) => inst && this.delete(inst));
    return this;
  }

  findImplementation(inter) {
    if (!inter) { return undefined; }
    if (inter[findImplementation]) { return this.setImplementation(inter[findImplementation]); }

    const impl = this.container.getImplementation(inter);
    return impl || this.container.findReturn(([, impl ]) => this.tryLink(inter, impl) && impl);
  }
  findInterface(inter) {
    return inter && this.container.getInterface(inter);
  }
  findInstance(inter) {
    return inter && this.container.getInstance(inter);
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
