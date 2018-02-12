import { findImplementation } from "../../src/providers/symbols";
import { implement } from "../../src/decorators/implement";

describe('implement', () => {
  it('sets implementation to interface', () => {
    const impl = {};
    const inter = {};

    implement(inter)(impl);

    expect(inter[findImplementation]).toBe(impl);
    expect(impl[findImplementation]).toBe(impl);
  });

  it('allow implemet of implementation only', () => {
    const impl = {};

    implement()(impl);
    expect(impl[findImplementation]).toBe(impl);
  });
});
