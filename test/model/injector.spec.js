import { Injector } from '../../src';
import { inject, canImplement } from '../../src/providers/symbols';

const injector = new Injector;
class Pet {
  makeSound() { return ''; }
}

class ConscientBeing {

  think() { return ''; }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
  makeSound() { return 'bark'; }
}

class Human {

  static [inject]() { return [ Pet ]; }
  constructor(pet) {
    this.pet = pet;
  }

  think() {
    return `I hava a pet named ${this.dog.name}`;
  }
}

injector.setImplementation(Dog);
injector.setImplementation(Human);

injector.factory(Dog, constructor => new constructor('Spark'));

injector.onInstantiate(Dog, (dog, next) => {

  dog.race = 'Doberman';

  return next(dog);
});

describe('Injector', () => {

  it('instanciates from implementation', () => expect(injector.get(Human)).toBeInstanceOf(Human));
  it('instanciates from interface', () => expect(injector.get(ConscientBeing)).toBeInstanceOf(Human));
  it('instanciates from object', () => expect(injector.get({ think() {}})).toBeInstanceOf(Human));

  it('executes factory', () => expect(injector.get(Pet).race).toBe('Doberman'));
  it('injects arguments', () => expect(injector.get(ConscientBeing).pet).toBeInstanceOf(Dog));

  it('executes events', () => expect(injector.get(ConscientBeing).pet.name).toBe('Spark'));

  it('throws without implementation', () => expect(() => injector.get({ jump() {} })).toThrow());
  it('throws on unmatching link', () => expect(() => injector.link(Pet, Human)).toThrow());

  it('checks canImplement symbol', () => expect(injector.get({ [canImplement]: (_, impl) => impl === Human })).toBeInstanceOf(Human));

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
