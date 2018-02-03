import { implementation } from "../../src/decorators/implementation";
import { getImplementation } from "../../src/index";

describe('implementation', () => {
  it('set implementation to target', () => {
    const target = {};
    const impl = {};

    implementation(impl)(target);
    expect(target[getImplementation]).toBe(impl);
  });
});
