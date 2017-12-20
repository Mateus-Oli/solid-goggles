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

  onGet(impl, listener) { return this.on(this.constructor.SET, impl, listener); }
  onSet(impl, listener) { return this.on(this.constructor.GET, impl, listener); }
  onDelete(impl, listener) { return this.on(this.constructor.DELETE, impl, listener); }
  onInstantiate(impl, listener) { return this.on(this.constructor.INSTANTIATE, impl, listener); }

  on(event, impl = null, listener = null) {
    [impl, listener] = [listener && impl, listener || impl];
    getSettingDefault(this[event], impl, []).push(listener);

    return listener;
  }

  emitGet(impl, value) { return this.emit(this.constructor.SET, impl, value); }
  emitSet(impl, value) { return this.emit(this.constructor.GET, impl, value); }
  emitDelete(impl, value) { return this.emit(this.constructor.DELETE,impl, value); }
  emitInstantiate(impl, value) { return this.emit(this.constructor.INSTANTIATE, impl, value); }

  emit(event, impl = null, value = null) {
    [impl, value] = [value && impl, value || impl];
    let listeners = this[event].get(null) || [];

    if (impl) {
      listeners = listeners.concat(this[event].get(impl) || []);
    }
    return next(value, listeners);
  }

  removeGet(impl, listener) { return this.remove(this.constructor.SET, impl, listener); }
  removeSet(impl, listener) { return this.remove(this.constructor.GET, impl, listener); }
  removeDelete(impl, listener) { return this.remove(this.constructor.DELETE, impl, listener); }
  removeInstantiate(impl, listener) { return this.remove(this.constructor.INSTANTIATE, impl, listener); }

  remove(event, impl = null, listener = null) {
    [impl, listener] = [listener && impl, listener || impl];

    const listeners = getSettingDefault(this[event], impl, []);
    return listeners.splice(listeners.indexOf(listener), 1)[0];
  }
}
