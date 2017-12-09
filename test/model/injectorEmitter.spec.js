import { InjectorEmitter } from '../../src/model/injectorEmitter';

const emitter = new InjectorEmitter;

class ImplementationMock {

}

class OtherImplementation {

}

emitter.onGet(null, (value, next) => {
  value.generic = true;
  return next(value);
});

emitter.onGet(OtherImplementation, (value, next) => {
    value.other = true;
    return next(value);
});

emitter.onSet(ImplementationMock, (value, next) => {
  value.differentEvent = true;
  return next(value);
});

emitter.onGet(ImplementationMock, value => {
  value.specific = true;
  return value;
});

emitter.onGet(ImplementationMock, (value, next) => {

  value.noNext = true;

  return next(value);
});

const value = emitter.emitGet(ImplementationMock, {});

describe('InjectorEmitter', () => {

  it('executes generic events', () => expect(value.generic).toBe(true));

  it('executes specific events', () => expect(value.specific).toBe(true));

  it('does not execute different events', () => expect(value.differentEvent).toBe(undefined));

  it('does not execute events without next', () => expect(value.noNext).toBeFalsy(undefined));

  it('does not execute events from other implementations', () => expect(value.other).toBe(undefined));

  it('executes events from base emitter', () => {

    const newEmitter = new InjectorEmitter(emitter);
    const newEmitterValue = newEmitter.emitGet(ImplementationMock, {});

    expect(newEmitterValue.specific).toBe(true);
  });
});
