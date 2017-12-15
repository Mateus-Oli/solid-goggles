import { injectSymbol, implementsSymbol } from '../../src';

import { Injector } from '../../src';

const injector = new Injector;
class Pet {
  makeSound() { return ''; }
}

class ConscientBeing {

  think() { return ''; }
}

class Dog {
  makeSound() { return 'bark'; }
}

class Human {

  [injectSymbol](injector) {
    this.pet = injector.get(Pet);
  }

  constructor(name) {
    this.name = name;
  }

  think() {
    return `my name is ${this.name}`;
  }
}

injector
  .setImplementation(Dog)
  .setImplementation(Human);

injector.factory(Human, constructor => {
  return new constructor('Mark');
});

injector.onInstantiate(Dog, (dog, next) => {

  dog.name = 'Spark';

  return next(dog);
});

describe('Injector', () => {

  it('instanciates from implementation', () => expect(injector.get(Human)).toBeInstanceOf(Human));
  it('instanciates from interface', () => expect(injector.get(ConscientBeing)).toBeInstanceOf(Human));
  it('instanciates from object', () => expect(injector.get({ think() {}})).toBeInstanceOf(Human));

  it('executes factory', () => expect(injector.get(ConscientBeing).name).toBe('Mark'));
  it('executes inject symbol', () => expect(injector.get(ConscientBeing).pet).toBeInstanceOf(Dog));

  it('executes events', () => expect(injector.get(ConscientBeing).pet.name).toBe('Spark'));

  it('throws without implementation', () => expect(() => injector.get({ jump() {} })).toThrow());
  it('throws on unmatching link', () => expect(() => injector.link(Pet, Human)).toThrow());

  it('checks implements symbol', () => expect(injector.get({ [implementsSymbol]: (_, impl) => impl === Human })).toBeInstanceOf(Human));

  it('uses same instance', () => expect(injector.get(ConscientBeing)).toBe(injector.get(Human)));

  it('clones base injector', () => {
    const newInjector = new Injector(injector);
    expect(newInjector.get(ConscientBeing)).toBe(injector.get(ConscientBeing));
  });

  it('clears old instances', () => {

    let emitedDelete = false;
    injector.onDelete(Human, (value, next) => {
      emitedDelete = true;
      return next(value);
    });

    const oldInstance = injector.get(ConscientBeing);
    injector.clear();

    expect(injector.get(ConscientBeing)).not.toBe(oldInstance);
    expect(emitedDelete).toBe(true);
  });
});
