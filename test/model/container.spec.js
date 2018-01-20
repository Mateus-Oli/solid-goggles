import { Container } from '../../src/model/container';

const container = new Container;

class InterfaceMock {}

class ImplementationMock {}

const instanceMock = {};

class OtherImplementation {}

class OtherInterface {}

const otherInstance = {};

describe('Container', () => {

  it('returns set value', () => {
    expect(container.setInterface(InterfaceMock, ImplementationMock)).toBe(InterfaceMock);
    expect(container.setInstance(ImplementationMock, instanceMock)).toBe(instanceMock);
  });

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

  it('iterates over all implementations with [interface, implementation, instance]', () => {

    const fn = jest.fn(([inter, impl, inst]) => {
      expect(inter).toBe(InterfaceMock);
      expect(impl).toBe(ImplementationMock);
      expect(inst).toBe(instanceMock);
    });
    container.forEach(fn);

    expect(fn).toHaveBeenCalledTimes(container.size);
  });

  it('delete implementation', () => {
    container.setImplementation(OtherImplementation);

    expect(container.getImplementation(OtherImplementation)).toBe(OtherImplementation);
    expect(container.deleteImplementation(OtherImplementation)).toBe(OtherImplementation);
    expect(container.deleteImplementation(OtherImplementation)).toBe(undefined);
  });

  it('delete interface', () => {
    container.setInterface(OtherInterface, OtherImplementation);

    expect(container.getInterface(OtherInterface)).toBe(OtherInterface);
    expect(container.deleteInterface(OtherInterface)).toBe(OtherInterface);
    expect(container.deleteInterface(OtherInterface)).toBe(undefined);
  });

  it('delete instance', () => {
    container.setInstance(OtherImplementation, otherInstance);

    expect(container.getInstance(otherInstance)).toBe(otherInstance);
    expect(container.deleteInstance(otherInstance)).toBe(otherInstance);
    expect(container.deleteInstance(otherInstance)).toBe(undefined);
  });

  it('clear implementations', () => {

    container.clearImplementations();
    expect(container.size).toBe(0);
  });

  it('clear interfaces', () => {
    expect(container.getInterface(InterfaceMock)).toBe(InterfaceMock);
    container.clearInterfaces();
    expect(container.getInterface(InterfaceMock)).toBe(undefined);
  });

  it('clear instances', () => {
    expect(container.getInstance(instanceMock)).toBe(instanceMock);
    container.clearInstances();
    expect(container.getInstance(instanceMock)).toBe(undefined);
  });

  it('converts entries', () => {
    expect(container.toArray({
      [Container.INTERFACE]: 'a',
      [Container.IMPLEMENTATION]: 'b',
      [Container.INSTANCE]: 'c'
    })).toMatchObject(['a', 'b', 'c']);

    expect(container.toArray()).toBeInstanceOf(Array);
    expect(container.toArray([])).toBeInstanceOf(Array);
  });

  it('converts entries', () => {
    expect(container.toEntry(['a', 'b', 'c'])).toMatchObject({
      [Container.INTERFACE]: 'a',
      [Container.IMPLEMENTATION]: 'b',
      [Container.INSTANCE]: 'c'
    });

    expect(container.toEntry()).toBeInstanceOf(Object);
    expect(container.toEntry({})).toBeInstanceOf(Object);
  });

  it('calls findReturn function size times with [interface, implementation, instance]', () => {
    container.setInterface(InterfaceMock, ImplementationMock);
    container.setInstance(ImplementationMock, instanceMock);

    const finder = jest.fn(([inter, impl, inst]) => {
      expect(inter).toBe(InterfaceMock);
      expect(impl).toBe(ImplementationMock);
      expect(inst).toBe(instanceMock);
    });

    container.findReturn(finder);

    expect(finder).toHaveBeenCalledTimes(container.size);
  });

  it('returns found value', () => {
    expect(container.findReturn(([,, inst]) => inst)).toBe(instanceMock);
  });
});
