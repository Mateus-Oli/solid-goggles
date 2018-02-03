import { register } from "../../src/decorators/register";
import { getImplementation } from "../../src/providers/symbols";

describe('register', () => {
  it('sets implementation to target', () => {
    const target = {};
    const impl = {};

    register(impl)(target);
    expect(target[getImplementation]).toBe(impl);
  });

  it('sets target as implementation when implementation not provided', () => {
    const target = {};

    register()(target);
    expect(target[getImplementation]).toBe(target);
  });
});
