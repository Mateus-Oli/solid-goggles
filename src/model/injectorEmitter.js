import { next } from '../utils/next';

export class InjectorEmitter {

  static get GET() { return 'get'; }
  static get SET() { return 'set'; }
  static get DELETE() { return 'delete'; }
  static get INSTANTIATE() { return 'instantiate'; }

  constructor(emitter = {}, MapConstructor = Map) {
    [InjectorEmitter.GET, InjectorEmitter.SET, InjectorEmitter.DELETE, InjectorEmitter.INSTANTIATE].forEach(index => {
      this[index] = new MapConstructor;
      (emitter[index] || new MapConstructor).forEach((v, k) => this[index].set(k, [].concat(v)));
    });
  }

  onGet(impl, listener) { return this.on(InjectorEmitter.SET, impl, listener); }
  onSet(impl, listener) { return this.on(InjectorEmitter.GET, impl, listener); }
  onDelete(impl, listener) { return this.on(InjectorEmitter.DELETE, impl, listener); }
  onInstantiate(impl, listener) { return this.on(InjectorEmitter.INSTANTIATE, impl, listener); }

  on(event, impl = null, listener = null) {
    [impl, listener] = [listener && impl, listener || impl];
    this.getListeners(event, impl).push(listener);

    return listener;
  }

  emitGet(impl, value) { return this.emit(InjectorEmitter.SET, impl, value); }
  emitSet(impl, value) { return this.emit(InjectorEmitter.GET, impl, value); }
  emitDelete(impl, value) { return this.emit(InjectorEmitter.DELETE,impl, value); }
  emitInstantiate(impl, value) { return this.emit(InjectorEmitter.INSTANTIATE, impl, value); }

  emit(event, impl = null, value = null) {
    [impl, value] = [value && impl, value || impl];
    let listeners = this[event].get(null) || [];

    if (impl) {
      listeners = listeners.concat(this[event].get(impl) || []);
    }
    return next(value, listeners);
  }

  removeGet(impl, listener) { return this.remove(InjectorEmitter.SET, impl, listener); }
  removeSet(impl, listener) { return this.remove(InjectorEmitter.GET, impl, listener); }
  removeDelete(impl, listener) { return this.remove(InjectorEmitter.DELETE, impl, listener); }
  removeInstantiate(impl, listener) { return this.remove(InjectorEmitter.INSTANTIATE, impl, listener); }

  remove(event, impl = null, listener = null) {
    [impl, listener] = [listener && impl, listener || impl];

    const listeners = this.getListeners(event, impl);
    return listeners.splice(listeners.indexOf(listener), 1)[0];
  }

  getListeners(event, impl = null) {
    let listeners = this[event].get(impl);
    if (!listeners) {
      this[event].set(impl, listeners = []);
    }
    return listeners;
  }
}
