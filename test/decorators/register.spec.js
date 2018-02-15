import { register } from '../../src/decorators/register';
import { findImplementation } from '../../src/providers/symbols';

describe('register', () => {
  it('sets implementation to interface', () => {
    const inter = {};
    const impl = {};

    register(impl)(inter);

    expect(inter[findImplementation]).toBe(impl);
    expect(impl[findImplementation]).toBe(impl);
  });

  it('allow registration of implementation only', () => {
    const impl = {};

    register()(impl);
    expect(impl[findImplementation]).toBe(impl);
  });
});
