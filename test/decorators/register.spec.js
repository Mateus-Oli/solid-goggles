import { getImplementation } from "../../src/providers/symbols";
import { register } from "../../src/decorators/register";

describe('register', () => {
  it('sets implementation to interface', () => {
    const inter = {};
    const impl = {};

    register(impl)(inter);

    expect(inter[getImplementation]).toBe(impl);
    expect(impl[getImplementation]).toBe(impl);
  });

  it('allow registration of implementation only', () => {
    const impl = {};

    register()(impl);
    expect(impl[getImplementation]).toBe(impl);
  });
});
