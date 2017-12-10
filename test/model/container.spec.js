import { Container } from '../../src/model/container';

const container = new Container;

class InterfaceMock {

}

class ImplementationMock {

}

const instanceMock = {};

class OtherImplementation {

}

class OtherInterface {

}

const otherInstance = {};

container.link(InterfaceMock, ImplementationMock);
container.setInstance(instanceMock, ImplementationMock);

container.setInstance(otherInstance, OtherImplementation);

describe('Container', () => {

  it('gets instance from interface', () => expect(container.getInstance(InterfaceMock)).toBe(instanceMock));
  it('gets instance from implementation', () => expect(container.getInstance(ImplementationMock)).toBe(instanceMock));
  it('gets instance from instance', () => expect(container.getInstance(instanceMock)).toBe(instanceMock));

  it('gets implementation from interface', () => expect(container.getImplementation(InterfaceMock)).toBe(ImplementationMock));
  it('gets implementation from implementation', () => expect(container.getImplementation(ImplementationMock)).toBe(ImplementationMock));
  it('gets implementation from instance', () => expect(container.getImplementationFromInstance(instanceMock)).toBe(ImplementationMock));

  it('gets interface from interface', () => expect(container.getInterface(InterfaceMock)).toBe(InterfaceMock));
  it('gets interface from implementation', () => expect(container.getInterface(ImplementationMock)).toBe(InterfaceMock));
  it('gets interface from instance', () => expect(container.getInterfaceFromInstance(instanceMock)).toBe(InterfaceMock));

  it('is empty when not contained', () => {

    expect(container.getInterface(OtherInterface)).toBe(undefined);
    expect(container.getImplementation(OtherInterface)).toBe(undefined);
    expect(container.getInstance(OtherInterface)).toBe(undefined);
  });

  it('clones base container', () => {

    const newContainer = new Container(container);

    expect(newContainer.getInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(newContainer.getImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(newContainer.getInstance(InterfaceMock)).toBe(instanceMock);
  });

  it('shows size as number of instances', () => expect(container.size).toBe(container.instances.size));

  it('iterates over all instances', () => {

    let called = 0;
    container.forEach(() => called++);

    expect(called).toBe(container.instances.size);
  });

  it('clear values', () => {

    container.clear();

    expect(container.links.size).toBe(0);
    expect(container.interfaces.size).toBe(0);
    expect(container.implementations.size).toBe(0);
    expect(container.instances.size).toBe(0);
  });
});
