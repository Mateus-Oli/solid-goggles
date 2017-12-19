import { Container } from '../../src/model/container';

const container = new Container;

class InterfaceMock {}

class ImplementationMock {}

const instanceMock = {};

class OtherImplementation {}

class OtherInterface {}

const otherInstance = {};

container.setInterface(InterfaceMock, ImplementationMock);
container.setInstance(ImplementationMock, instanceMock);

container.setInstance(OtherImplementation, otherInstance);

describe('Container', () => {

  it('gets instance from interface', () => expect(container.getInstance(InterfaceMock)).toBe(instanceMock));
  it('gets instance from implementation', () => expect(container.getInstance(ImplementationMock)).toBe(instanceMock));
  it('gets instance from instance', () => expect(container.getInstance(instanceMock)).toBe(instanceMock));

  it('gets implementation from interface', () => expect(container.getImplementation(InterfaceMock)).toBe(ImplementationMock));
  it('gets implementation from implementation', () => expect(container.getImplementation(ImplementationMock)).toBe(ImplementationMock));
  it('gets implementation from instance', () => expect(container.getImplementation(instanceMock)).toBe(ImplementationMock));

  it('gets interface from interface', () => expect(container.getInterface(InterfaceMock)).toBe(InterfaceMock));
  it('gets interface from implementation', () => expect(container.getInterface(ImplementationMock)).toBe(InterfaceMock));
  it('gets interface from instance', () => expect(container.getInterface(instanceMock)).toBe(InterfaceMock));

  it('is empty when not contained', () => {

    expect(container.getInterface(OtherInterface)).toBe(undefined);
    expect(container.getImplementation(OtherInterface)).toBe(undefined);
    expect(container.getInstance(OtherInterface)).toBe(undefined);
  });

  it('clones base container', () => {

    const clone = new Container(container);

    expect(clone.getInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(clone.getImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(clone.getInstance(InterfaceMock)).toBe(instanceMock);
  });

  it('creates from entries',() => {
    const entries = new Container([
     [InterfaceMock, ImplementationMock, instanceMock],
      [OtherInterface, OtherImplementation, otherInstance]
    ]);

    expect(entries.getInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(entries.getImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(entries.getInstance(InterfaceMock)).toBe(instanceMock);
  });

  it('gets hierarchical', () => {
    const child = new Container({ parent: container });

    child.clearImplementations();

    expect(child.getInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(child.getImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(child.getInstance(InterfaceMock)).toBe(instanceMock);
  });

  it('shows size as number of implementations', () => expect(container.size).toBe(container.implementation.size));

  it('iterates over all instances', () => {

    let called = 0;
    container.forEach(() => called++);

    expect(called).toBe(container.size);
  });

  it('clear values', () => {

    container.clearImplementations();
    expect(container.size).toBe(0);
  });
});
