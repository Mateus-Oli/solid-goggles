import { next } from '../utils/next';

export class InjectorEmitter {

  static get EVERY() { return undefined; }
  static get GET() { return 'get'; }
  static get SET() { return 'set'; }
  static get DELETE() { return 'delete'; }
  static get INSTANTIATE() { return 'instantiate'; }

  constructor(emitter = {}) {
    const listeners = Array.isArray(emitter) ? emitter : emitter.listeners;
    this.listeners = [].concat(listeners || []).map(listener => Object.assign({}, listener));
  }

  onEvery(implementation, listener) { return this.on(InjectorEmitter.EVERY, implementation, listener); }
  onGet(implementation, listener) { return this.on(InjectorEmitter.GET, implementation, listener); }
  onSet(implementation, listener) { return this.on(InjectorEmitter.SET, implementation, listener); }
  onDelete(implementation, listener) { return this.on(InjectorEmitter.DELETE, implementation, listener); }
  onInstantiate(implementation, listener) { return this.on(InjectorEmitter.INSTANTIATE, implementation, listener); }

  on(event, implementation, listener) {
    [implementation, listener] = this.sortImplementation(implementation, listener);
    this.listeners.push({ event, implementation, listener });

    return listener;
  }

  emitEvery(implementation, value) { return this.emit(InjectorEmitter.EVERY, implementation, value); }
  emitGet(implementation, value) { return this.emit(InjectorEmitter.GET, implementation, value); }
  emitSet(implementation, value) { return this.emit(InjectorEmitter.SET, implementation, value); }
  emitDelete(implementation, value) { return this.emit(InjectorEmitter.DELETE, implementation, value); }
  emitInstantiate(implementation, value) { return this.emit(InjectorEmitter.INSTANTIATE, implementation, value); }

  emit(e, i, v) {
    [i, v] = this.sortImplementation(i, v);

    const listeners = this.listeners
      .filter(({ implementation, event }) => this.isValid(event, e) && this.isValid(implementation, i))
      .map(({ listener }) => listener);

    return next(v, listeners);
  }

  removeEvery(implementation, listener) { return this.remove(InjectorEmitter.EVERY, implementation, listener); }
  removeGet(implementation, listener) { return this.remove(InjectorEmitter.GET, implementation, listener); }
  removeSet(implementation, listener) { return this.remove(InjectorEmitter.SET, implementation, listener); }
  removeDelete(implementation, listener) { return this.remove(InjectorEmitter.DELETE, implementation, listener); }
  removeInstantiate(implementation, listener) { return this.remove(InjectorEmitter.INSTANTIATE, implementation, listener); }

  remove(e, i, l) {
    [i, l] = this.sortImplementation(i, l);
    const index = this.listeners.findIndex(({ event, implementation, listener }) => e === event && i === implementation && l === listener);

    return index > -1 ? this.listeners.splice(index, 1)[0].listener : undefined;
  }

  sortImplementation(implementation, value) {
    return [value && implementation, value || implementation];
  }
  isValid(value, compare) {
    return value === compare || value === InjectorEmitter.EVERY;
  }
}
