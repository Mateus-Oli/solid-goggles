import { getSettingDefault } from '../utils/getSettingDefault';
import { next } from '../utils/next';

const baseEvent = {
  set: new Map,
  get: new Map,
  delete: new Map,
  instantiate: new Map
};

function createBaseEvent(base = baseEvent) {
  const event = {};
  for (const prop in baseEvent) {
    const value = event[prop] = new baseEvent[prop].constructor();
    (base[prop] || new Map).forEach((k, v) => value.set(k, [].concat(v)));
  }
  return event;
}

export class InjectorEmitter {

  static get GET() { return 'get'; }
  static get SET() { return 'set'; }
  static get DELETE() { return 'delete'; }
  static get INSTANTIATE() { return 'instantiate'; }

  constructor(event) { Object.assign(this, createBaseEvent(event)); }

  on(event, listener, impl = null) {
    getSettingDefault(this[event], impl, []).push(listener);
    return this;
  }

  remove(event, listener, impl = null) {

    const listeners = getSettingDefault(this[event], impl, []);
    listeners.splice(listeners.indexOf(listener), 1);

    return this;
  }

  emit(event, value, impl = null) {

    value = next(value, this[event].get(null));

    if (impl) {
      value = next(value, this[event].get(impl));
    }
    return value;
  }

  onSet(impl, listener) { return this.on(this.constructor.GET, listener, impl); }
  onGet(impl, listener) { return this.on(this.constructor.SET, listener, impl); }
  onDelete(impl, listener) { return this.on(this.constructor.DELETE, listener, impl); }
  onInstantiate(impl, listener) { return this.on(this.constructor.INSTANTIATE, listener, impl); }

  removeSet(impl, listener) { return this.remove(this.constructor.GET, listener, impl); }
  removeGet(impl, listener) { return this.remove(this.constructor.SET, listener, impl); }
  removeDelete(impl, listener) { return this.remove(this.constructor.DELETE, listener, impl); }
  removeInstantiate(impl, listener) { return this.remove(this.constructor.INSTANTIATE, listener, impl); }

  emitSet(impl, value) { return this.emit(this.constructor.GET, value, impl); }
  emitGet(impl, value) { return this.emit(this.constructor.SET, value, impl); }
  emitDelete(impl, value) { return this.emit(this.constructor.DELETE, value, impl); }
  emitInstantiate(impl, value) { return this.emit(this.constructor.INSTANTIATE, value, impl); }
}
