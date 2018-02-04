import { Container } from '../../src/models/container';

class InterfaceMock {}

class ImplementationMock {}

const instanceMock = {};

class OtherImplementation {}

class OtherInterface {}

const otherInstance = {};

const entryObject = { interface: InterfaceMock, implementation: ImplementationMock, instance: instanceMock };
const entryArray = [ InterfaceMock, ImplementationMock, instanceMock ];

const otherEntry = [ OtherInterface, OtherImplementation, otherInstance ];

describe('Container', () => {

  it('transform entry in object', () => {

    expect(Container.toObject(entryArray)).toMatchObject(entryObject);
    expect(Container.toObject(entryObject)).toMatchObject(entryObject);
    expect(Container.toObject()).toMatchObject({});
  });

  it('transform entry in array', () => {

    expect(Container.toArray(entryObject)).toMatchObject(entryArray);
    expect(Container.toArray(entryArray)).toMatchObject(entryArray);
    expect(Container.toArray()).toMatchObject([undefined, undefined, undefined]);
  });

  it('creates empty container', () => {
    const container = new Container;

    expect(container).toBeInstanceOf(Container);
    expect(container.size).toBe(0);
  });

  it('shows number of implementations on size', () => {
    const container = new Container;

    container.set(entryArray);
    expect(container.size).toBe(1);

    container.set(otherEntry);
    expect(container.size).toBe(2);
  });

  it('does not duplicate implementation', () => {
    const container = new Container;

    container.set(entryArray);
    expect(container.size).toBe(1);

    container.set([, ImplementationMock ]);
    expect(container.size).toBe(1);
  });

  it('creates container from entries', () => {
    const container = new Container([ entryArray ]);
    expect(container.size).toBe(1);
  });

  it('iterates over implementations', () => {
    const container = new Container([
      entryArray,
      otherEntry
    ]);

    const forEach = jest.fn();
    container.forEach(forEach);

    expect(forEach).toHaveBeenCalledTimes(2);
  });

  it('calls forEach with [interface, implementation, instance], container', () => {
    const container = new Container([ entryArray ]);
    const forEach = jest.fn(([ inter, impl, inst], c) => {
      expect(inter).toBe(InterfaceMock);
      expect(impl).toBe(ImplementationMock);
      expect(inst).toBe(instanceMock);
      expect(c).toBe(container);
    });

    container.forEach(forEach);
    expect(forEach).toHaveBeenCalledTimes(1);
  });

  it('returns found value', () => {
    const container = new Container([ entryArray ]);

    expect(container.findReturn(([ inter ]) => inter)).toBe(InterfaceMock);
    expect(container.findReturn(([, impl ]) => impl)).toBe(ImplementationMock);
    expect(container.findReturn(([,, inst ]) => inst)).toBe(instanceMock);
  });

  it('gets correct interface', () => {
    const container = new Container([ entryArray, otherEntry ]);

    expect(container.getInterface(InterfaceMock)).toBe(InterfaceMock);
    expect(container.getInterface(ImplementationMock)).toBe(InterfaceMock);
    expect(container.getInterface(instanceMock)).toBe(InterfaceMock);

    expect(container.getInterface(OtherInterface)).toBe(OtherInterface);
    expect(container.getInterface(OtherImplementation)).toBe(OtherInterface);
    expect(container.getInterface(otherInstance)).toBe(OtherInterface);
  });

  it('gets correct implementation', () => {
    const container = new Container([ entryArray, otherEntry ]);

    expect(container.getImplementation(InterfaceMock)).toBe(ImplementationMock);
    expect(container.getImplementation(ImplementationMock)).toBe(ImplementationMock);
    expect(container.getImplementation(instanceMock)).toBe(ImplementationMock);

    expect(container.getImplementation(OtherInterface)).toBe(OtherImplementation);
    expect(container.getImplementation(OtherImplementation)).toBe(OtherImplementation);
    expect(container.getImplementation(otherInstance)).toBe(OtherImplementation);
  });

  it('gets correct instance', () => {
    const container = new Container([ entryArray, otherEntry ]);

    expect(container.getInstance(InterfaceMock)).toBe(instanceMock);
    expect(container.getInstance(ImplementationMock)).toBe(instanceMock);
    expect(container.getInstance(instanceMock)).toBe(instanceMock);

    expect(container.getInstance(OtherInterface)).toBe(otherInstance);
    expect(container.getInstance(OtherImplementation)).toBe(otherInstance);
    expect(container.getInstance(otherInstance)).toBe(otherInstance);
  });

  it('sets implementation', () => {
    const container = new Container;

    expect(container.getImplementation(ImplementationMock)).toBe(undefined);

    container.setImplementation(ImplementationMock);
    expect(container.getImplementation(ImplementationMock)).toBe(ImplementationMock);
  });

  it('sets interface', () => {
    const container = new Container;

    expect(container.getInterface(InterfaceMock)).toBe(undefined);

    container.setInterface(ImplementationMock, InterfaceMock);
    expect(container.getInterface(ImplementationMock)).toBe(InterfaceMock);
  });

  it('sets instance', () => {
    const container = new Container;

    expect(container.getInstance(instanceMock)).toBe(undefined);

    container.setInstance(ImplementationMock, instanceMock);
    expect(container.getInstance(ImplementationMock)).toBe(instanceMock);
  });

  it('deletes implementation', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.deleteImplementation(ImplementationMock);

    expect(container.getImplementation(ImplementationMock)).toBe(undefined);
    expect(container.getImplementation(OtherImplementation)).toBe(OtherImplementation);
  });

  it('deletes interface', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.deleteInterface(InterfaceMock);

    expect(container.getInterface(InterfaceMock)).toBe(undefined);
    expect(container.getInterface(OtherInterface)).toBe(OtherInterface);
  });

  it('deletes instance', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.deleteInstance(instanceMock);

    expect(container.getInstance(instanceMock)).toBe(undefined);
    expect(container.getInstance(otherInstance)).toBe(otherInstance);
  });

  it('deletes from every value of entry', () => {
    const container = new Container([ entryArray ]);

    container.deleteInstance(InterfaceMock);
    expect(container.getInstance(ImplementationMock)).toBe(undefined);
  });

  it('returns deleted value', () => {
    const container = new Container([ entryArray, otherEntry ]);

    expect(container.deleteImplementation(ImplementationMock)).toBe(ImplementationMock);
    expect(container.deleteImplementation(ImplementationMock)).toBe(undefined);
  });

  it('clears interfaces', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.clearInterfaces();

    expect(container.getInterface(InterfaceMock)).toBe(undefined);
    expect(container.getInterface(OtherInterface)).toBe(undefined);
  });

  it('clears implementations', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.clearImplementations();

    expect(container.size).toBe(0);

    expect(container.getImplementation(ImplementationMock)).toBe(undefined);
    expect(container.getImplementation(OtherImplementation)).toBe(undefined);
  });

  it('clears interfaces', () => {
    const container = new Container([ entryArray, otherEntry ]);

    container.clearInstances();

    expect(container.getInstance(instanceMock)).toBe(undefined);
    expect(container.getInstance(otherInstance)).toBe(undefined);
  });

  it('gets from parent', () => {
    const parent = new Container([ entryArray, otherEntry ]);
    const container = new Container({ parent });

    expect(container.getInterface(ImplementationMock)).toBe(InterfaceMock);
    expect(container.getImplementation(ImplementationMock)).toBe(ImplementationMock);
    expect(container.getInstance(ImplementationMock)).toBe(instanceMock);
  });
});
