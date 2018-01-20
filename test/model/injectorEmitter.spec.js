import { InjectorEmitter } from '../../src/model/injectorEmitter';

class ImplementationMock {}

class OtherImplementation {}

describe('InjectorEmitter', () => {
  it('emits specific events', () => {
    const emitter = new InjectorEmitter;

    const getListener = emitter.onGet(jest.fn(x => expect(x).toBe('get')));
    const setListener = emitter.onSet(jest.fn(x => expect(x).toBe('set')));
    const deleteListener = emitter.onDelete(jest.fn(x => expect(x).toBe('delete')));
    const instantiateListener = emitter.onInstantiate(jest.fn(x => expect(x).toBe('instantiate')));

    emitter.emitGet('get');
    emitter.emitSet('set');
    emitter.emitDelete('delete');
    emitter.emitInstantiate('instantiate');

    const everyListener = emitter.onEvery(jest.fn(x => expect(x).toBe('every')));
    emitter.emitEvery('every');

    expect(everyListener).toHaveBeenCalledTimes(1);
    expect(getListener).toHaveBeenCalledTimes(1);
    expect(setListener).toHaveBeenCalledTimes(1);
    expect(deleteListener).toHaveBeenCalledTimes(1);
    expect(instantiateListener).toHaveBeenCalledTimes(1);
  });

  it('emits generic events', () => {
    const emitter = new InjectorEmitter;

    const listener = emitter.onEvery(jest.fn(x => expect(x).toBe('get')));
    emitter.emitGet('get');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('emits implementation events', () => {
    const emitter = new InjectorEmitter;

    const genericListener = emitter.onGet(jest.fn((x, next) => next(x)));
    const listener = emitter.onGet(ImplementationMock, jest.fn(x => expect(x).toBe('instanceMock')));
    const otherListener = emitter.onGet(OtherImplementation, jest.fn(x => expect(x).toBe('otherInstance')));

    emitter.emitGet(ImplementationMock, 'instanceMock');
    emitter.emitGet(OtherImplementation, 'otherInstance');

    expect(genericListener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(otherListener).toHaveBeenCalledTimes(1);
  });

  it('emits next event if called', () => {
    const emitter = new InjectorEmitter;

    emitter.onGet((x, next) => next(x));
    const secondEvent = emitter.onGet(jest.fn(x => expect(x).toBe('get')));
    const notCalled = emitter.onGet(jest.fn());

    emitter.emitGet('get');

    expect(secondEvent).toHaveBeenCalledTimes(1);
    expect(notCalled).not.toHaveBeenCalled();
  });

  it('removes listeners', () => {
    const emitter = new InjectorEmitter;

    const notCalled = emitter.onEvery(jest.fn());
    expect(emitter.removeEvery(notCalled)).toBe(notCalled);

    emitter.emitEvery('every');
    expect(notCalled).not.toHaveBeenCalled();
  });

  it('only removes from specified event', () => {
    const emitter = new InjectorEmitter;

    const listener = emitter.onEvery(() => {});
    expect(emitter.removeGet(listener)).toBe(undefined);
    expect(emitter.removeSet(listener)).toBe(undefined);
    expect(emitter.removeDelete(listener)).toBe(undefined);
    expect(emitter.removeInstantiate(listener)).toBe(undefined);
  });

  it('only removes from specified implementation', () => {
    const emitter = new InjectorEmitter;

    const listener = emitter.onEvery(ImplementationMock, () => {});
    expect(emitter.removeEvery(listener)).toBe(undefined);
  });

  it('returns returned value from last event', () => {
    const emitter = new InjectorEmitter;

    emitter.onEvery((x, next) => next(x + 1));
    emitter.onEvery((x, next) => next(x + 2));

    expect(emitter.emitEvery(1)).toBe(4);
  });

  it('clones emitter', () => {
    const emitter = new InjectorEmitter;
    const listener = emitter.onEvery(x => x);

    const clone = new InjectorEmitter(emitter);

    expect(emitter.removeEvery(listener)).toBe(listener);
    expect(clone.removeEvery(listener)).toBe(listener);
  });

  it('clones from array', () => {
    const listener = () => {};
    const emitter = new InjectorEmitter([
      { event: InjectorEmitter.EVERY, implementation: undefined, listener}
    ]);
    expect(emitter.removeEvery(listener)).toBe(listener);
  });
});
