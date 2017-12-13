import { getSettingDefault } from '../utils/getSettingDefault';
import { next } from '../utils/next';

const baseEmitter = {
  set: new Map,
  get: new Map,
  delete: new Map,
  instantiate: new Map
};

function createBaseEvent(base = baseEmitter) {
  const emitter = {};
  for (const key in baseEmitter) {
    const value = emitter[key] = new baseEmitter[key].constructor();
    (base[key] || new Map).forEach((v, k) => value.set(k, [].concat(v)));
  }
  return Object.assign({}, base, emitter);
}

export class InjectorEmitter {

  static get GET() { return 'get'; }
  static get SET() { return 'set'; }
  static get DELETE() { return 'delete'; }
  static get INSTANTIATE() { return 'instantiate'; }

  constructor(emitter) { Object.assign(this, createBaseEvent(emitter)); }

  onSet(impl, listener) { return this.on(this.constructor.GET, listener, impl); }
  onGet(impl, listener) { return this.on(this.constructor.SET, listener, impl); }
  onDelete(impl, listener) { return this.on(this.constructor.DELETE, listener, impl); }
  onInstantiate(impl, listener) { return this.on(this.constructor.INSTANTIATE, listener, impl); }

  on(event, listener, impl = null) {
    getSettingDefault(this[event], impl, []).push(listener);
    return this;
  }

  emitSet(impl, value) { return this.emit(this.constructor.GET, value, impl); }
  emitGet(impl, value) { return this.emit(this.constructor.SET, value, impl); }
  emitDelete(impl, value) { return this.emit(this.constructor.DELETE, value, impl); }
  emitInstantiate(impl, value) { return this.emit(this.constructor.INSTANTIATE, value, impl); }

  emit(event, value, impl = null) {

    let listeners = this[event].get(null) || [];

    if (impl) {
      listeners = listeners.concat(this[event].get(impl) || []);
    }
    return next(value, listeners);
  }

  removeSet(impl, listener) { return this.remove(this.constructor.GET, listener, impl); }
  removeGet(impl, listener) { return this.remove(this.constructor.SET, listener, impl); }
  removeDelete(impl, listener) { return this.remove(this.constructor.DELETE, listener, impl); }
  removeInstantiate(impl, listener) { return this.remove(this.constructor.INSTANTIATE, listener, impl); }

  remove(event, listener, impl = null) {

    const listeners = getSettingDefault(this[event], impl, []);
    listeners.splice(listeners.indexOf(listener), 1);

    return this;
  }
}
