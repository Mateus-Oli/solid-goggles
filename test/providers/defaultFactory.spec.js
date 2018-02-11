import { defaultFactory } from '../../src/providers/defaultFactory';

describe('defaultFactory', () => {
  it('instantiate constructors', () => {
    const constructor = function() {};
    expect(defaultFactory(constructor)).toBeInstanceOf(constructor);
  });
  it('calls lambdas', () => {
    expect(defaultFactory(eval('() => 3'))).toBe(3);
  });
  it('return primitives', () => {
    expect(defaultFactory(3)).toBe(3);
  });
  it('creates object from prototype', () => {
    const prototype = {};
    expect(prototype.isPrototypeOf(defaultFactory(prototype))).toBe(true);
  });
});
