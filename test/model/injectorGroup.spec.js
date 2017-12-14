import { InjectorGroup } from '../../src/model/injectorGroup';
import { Injector } from "../../src";

const injectorGroup = new InjectorGroup;

const firstInjector = new Injector;
const secondInjector = new Injector;

class FirstImplementation {
  first() { return 'first'; }
}
firstInjector.setImplementation(FirstImplementation);
class SecondImplementation {
  second() { return 'second'; }
}
secondInjector.setImplementation(SecondImplementation);

injectorGroup
  .setInjector(firstInjector)
  .setInjector(secondInjector);

describe('InjectorGroup', () => {

  it('sets injector', () => {
    const group = new InjectorGroup;

    expect(group.size).toBe(0);
    expect(group.setInjector(new Injector).size).toBe(1);
  });

  it('shows number of contained injectors', () => {
    expect(injectorGroup.size).toBe(2);
  });

  it('generates instance from implementation', () => {
    expect(injectorGroup.get(SecondImplementation)).toBeInstanceOf(SecondImplementation);
  });

  it('breaks without valid instanciator', () => {
    const group = new InjectorGroup;
    group.setInjector(secondInjector);

    expect(() => group.get(FirstImplementation)).toThrow();
  });

  it('recovers injector from instance', () => {
    const instance = injectorGroup.get(FirstImplementation);
    expect(injectorGroup.getInjector(instance)).toBe(firstInjector);
  });

  it('iterates over injectors', () => {
    let count = 0;

    injectorGroup.forEach(() => count++);
    expect(count).toBe(injectorGroup.size);
  });

  it('creates clone', () => {
    const instance = injectorGroup.get(FirstImplementation);
    const clone = new InjectorGroup(injectorGroup);

    expect(clone).not.toBe(injectorGroup);
    expect(clone.get(FirstImplementation)).toBe(instance);
  });

  it('clear injectors', () => {
    const clone = new InjectorGroup(injectorGroup);

    expect(clone.size).toBe(2);
    clone.clear();
    expect(clone.size).toBe(0);
    expect(injectorGroup.size).toBe(2);
  });

  it('find injector', () => {
    expect(injectorGroup.find(() => true)).toBeInstanceOf(Injector);
  });

  it('check contained injectors', () => {
    expect(injectorGroup.hasInjector(firstInjector)).toBe(true);
    expect(injectorGroup.hasInjector(new Injector)).toBe(false);
  });

  it('deletes contained injector', () => {
    const clone = new InjectorGroup(injectorGroup);

    expect(clone.hasInjector(firstInjector)).toBe(true);
    clone.deleteInjector(firstInjector);
    expect(clone.hasInjector(firstInjector)).toBe(false);
  });
});
