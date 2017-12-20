import { defaultFactory } from '../../src/providers/defaultFactory';

class ImplementationMock {

  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }
}

const instanceMock = defaultFactory(ImplementationMock, [1, 2]);
const value = defaultFactory(instanceMock);

describe('defaultFactory', () => {

  it('instantiate functions', () => expect(instanceMock).toBeInstanceOf(ImplementationMock));

  it('uses args', () => {
    expect(instanceMock.arg1).toBe(1);
    expect(instanceMock.arg2).toBe(2);
  });

  it('return non functions', () => expect(value).toBe(instanceMock));

  // Works only with non transpiled arrow functions
  // it('executes non constructor functions', () => expect(defaultFactory(() => 3)).toBe(3));
});
