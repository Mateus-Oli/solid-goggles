import { Injector, inject, generated, canImplement } from '../../src';

class InterfaceMock extends null {
  methodMock() { return 0; }
}

class ImplementationMock {
  methodMock() { return 2; }
}

describe('injector', () => {

  it('creates injector with implementations', () => {
    const injector = Injector.of(ImplementationMock);
    expect(injector.findImplementation(ImplementationMock)).toBe(ImplementationMock);
  });

  it('returns set value', () => {
    const injector = new Injector;

    expect(injector.setImplementation(ImplementationMock)).toBe(ImplementationMock);
  });

  it('generates instance from implementation', () => {
    const injector = Injector.of(ImplementationMock);

    expect(injector.get(ImplementationMock)).toBeInstanceOf(ImplementationMock);
  });

  it('generates instance from interface', () => {
    const injector = Injector.of(ImplementationMock);

    expect(injector.get(InterfaceMock)).toBeInstanceOf(ImplementationMock);
  });

  it('maintains generated instances', () => {
    const injector = Injector.of(ImplementationMock);

    expect(injector.get(InterfaceMock)).toBe(injector.get(ImplementationMock));
  });

  it('delete expecific instance', () => {
    const injector = Injector.of(ImplementationMock);

    const instance = injector.get(InterfaceMock);
    injector.delete(instance);

    expect(injector.get(InterfaceMock)).not.toBe(instance);
  });

  it('clear instances', () => {
    const injector = Injector.of(ImplementationMock);

    const instance = injector.get(InterfaceMock);
    injector.clear();

    expect(injector.get(InterfaceMock)).not.toBe(instance);
  });

  it('breaks without implementation', () => {
    const injector = Injector.of();

    expect(() => injector.get(ImplementationMock)).toThrow();
  });

  it('breaks when linking unmatching interface x implementation', () => {
    const injector = Injector.of();
    class OtherInterface {
      otherMethod() {}
    }

    expect(() => injector.link(OtherInterface, ImplementationMock)).toThrow();
  });

  it('executes factory with implementation, args, injector', () => {
    const injector = Injector.of();
    const factory = injector.factory(ImplementationMock, jest.fn((implementation, args, injectorArg) => {
      expect(implementation).toBe(ImplementationMock);
      expect(args).toBeInstanceOf(Array);
      expect(injectorArg).toBe(injector);

      return {};
    }));

    injector.get(ImplementationMock);

    expect(factory).toHaveBeenCalledTimes(1);
  });
  it('uses factory return as instance', () => {
    const injector = Injector.of(ImplementationMock);

    const instance = {};
    injector.factory(ImplementationMock, () => instance);

    expect(injector.get(ImplementationMock)).toBe(instance);
  });

  it('executes canImplement hook of interface with interface, implement, injector', () => {
    const injector = Injector.of(ImplementationMock);

    const validator = jest.fn((inter, impl, injectorArg) => {
      expect(inter).toBe(mock);
      expect(impl).toBe(ImplementationMock);
      expect(injectorArg).toBe(injector);

      return true;
    });
    const mock = { [canImplement]: validator };

    injector.get(mock);

    expect(validator).toHaveBeenCalledTimes(1);
  });

  it('executes canImplement hook of implementation with interface, implement, injector', () => {
    const validator = jest.fn((inter, impl, injectorArg) => {
      expect(inter).toBe(InterfaceMock);
      expect(impl).toBe(mock);
      expect(injectorArg).toBe(injector);

      return true;
    });
    const mock = {[canImplement]: validator };
    const injector = Injector.of(mock);

    injector.get(InterfaceMock);
    expect(validator).toHaveBeenCalledTimes(1);
  });

  it('uses canImplement hook return as validator for implements', () => {
    const injector = Injector.of(ImplementationMock);
    class OtherInterface {
      static [canImplement](inter, impl) { return impl === ImplementationMock; }
    }
    expect(injector.get(OtherInterface)).toBeInstanceOf(ImplementationMock);
  });

  it('executes inject hook with injector as argument', () => {
    const injector = Injector.of();

    function InjectHook() {}
    InjectHook[inject] = jest.fn(injectorArg => expect(injectorArg).toBe(injector));
    injector.setImplementation(InjectHook);
    injector.get(InjectHook);

    expect(InjectHook[inject]).toHaveBeenCalledTimes(1);
  });

  it('uses returned value of inject hook as factory args', () => {
    const injector = Injector.of(ImplementationMock);

    class InjectHook {
      static [inject]() {
        return [ImplementationMock];
      }
    }
    const factory = injector.factory(InjectHook, jest.fn((implementation, [instanceMock]) => {
      expect(instanceMock).toBeInstanceOf(ImplementationMock);

      return {};
    }));

    injector.get(InjectHook);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('executes generated hook with injector as argument', () => {
    const injector = Injector.of();

    class GeneratedHook {}
    GeneratedHook.prototype[generated] = jest.fn(injectorArg => expect(injectorArg).toBe(injector));

    injector.setImplementation(GeneratedHook);
    injector.get(GeneratedHook);

    expect(GeneratedHook.prototype[generated]).toHaveBeenCalledTimes(1);
  });

  it('merges return value of generated hook with instance', () => {
    const injector = Injector.of(ImplementationMock);

    class GeneratedHook {
      [generated]() {
        return { instanceMock: ImplementationMock };
      }
    }
    injector.setImplementation(GeneratedHook);

    expect(injector.get(GeneratedHook).instanceMock).toBeInstanceOf(ImplementationMock);
  });

  it('allows generated and inject hooks to be values', () => {
    const injector = Injector.of(ImplementationMock);

    class Hooks {
      static get [inject]() { return [ImplementationMock]; }
      get [generated]() { return { generatedInstance: ImplementationMock }; }

      constructor(injectedInstance) {
        this.injectedInstance = injectedInstance;
      }
    }

    injector.setImplementation(Hooks);

    expect(injector.get(Hooks).generatedInstance).toBeInstanceOf(ImplementationMock);
    expect(injector.get(Hooks).injectedInstance).toBeInstanceOf(ImplementationMock);
  });

  it('find interface', () => {
    const instanceMock = new ImplementationMock;
    const injector = new Injector({
      container: [[InterfaceMock, ImplementationMock, instanceMock]]
    });

    expect(injector.findInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(injector.findInterface(ImplementationMock)).toBe(InterfaceMock);
    expect(injector.findInterface(instanceMock)).toBe(InterfaceMock);
  });

  it('find implementation', () => {
    const instanceMock = new ImplementationMock;
    const injector = new Injector({
      container: [[InterfaceMock, ImplementationMock, instanceMock]]
    });

    expect(injector.findImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(injector.findImplementation(ImplementationMock)).toBe(ImplementationMock);
    expect(injector.findImplementation(instanceMock)).toBe(ImplementationMock);
  });

  it('find instance', () => {
    const instanceMock = new ImplementationMock;
    const injector = new Injector({
      container: [[InterfaceMock, ImplementationMock, instanceMock]]
    });

    expect(injector.findInstance(InterfaceMock)).toBe(instanceMock);
    expect(injector.findInstance(ImplementationMock)).toBe(instanceMock);
    expect(injector.findInstance(instanceMock)).toBe(instanceMock);
  });

  it('returns falsy value', () => {
    const instanceMock = new ImplementationMock;
    const injector = new Injector({
      container: [[InterfaceMock, ImplementationMock, instanceMock]]
    });

    expect(injector.findInterface()).toBe(undefined);
    expect(injector.findImplementation()).toBe(undefined);
    expect(injector.findInstance()).toBe(undefined);
  });

  it('emit get event', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = injector.onGet(jest.fn(x => x));

    injector.get(ImplementationMock);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('emit set event', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = injector.onSet(jest.fn(x => x));

    injector.get(ImplementationMock);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('emit delete event', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = injector.onDelete(jest.fn(x => x));

    injector.get(ImplementationMock);
    injector.delete(ImplementationMock);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('emit instantiate event', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = injector.onInstantiate(jest.fn(x => x));
    injector.get(ImplementationMock);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('executes every on every event', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = injector.onEvery(jest.fn(x => x));

    injector.get(ImplementationMock);
    injector.delete(ImplementationMock);

    expect(listener).toHaveBeenCalledTimes(4);
  });

  it('emit events with instance and next', () => {
    const injector = Injector.of(ImplementationMock);

    const listener = (x, next) => {
      expect(x).toBeInstanceOf(ImplementationMock);
      expect(next).toBeInstanceOf(Function);

      return x;
    };

    injector.onEvery(listener);
    injector.onGet(listener);
    injector.onSet(listener);
    injector.onDelete(listener);
    injector.onInstantiate(listener);

    injector.get(ImplementationMock);
    injector.delete(ImplementationMock);
  });

  it('gets use canImplement in order of interface, implementation, injector instance, injector constructor', () => {
    const injector = new Injector;

    Injector.baseCanImplement = () => {};
    expect(injector.getCanImplement()).toBe(Injector.baseCanImplement);

    injector.baseCanImplement = () => {};
    expect(injector.getCanImplement()).toBe(injector.baseCanImplement);

    const mock = { [canImplement]: () => {} };
    expect(injector.getCanImplement(mock, { [canImplement]: () => {} })).toBe(mock[canImplement]);

    expect(injector.getCanImplement({}, mock)).toBe(mock[canImplement]);
  });
});