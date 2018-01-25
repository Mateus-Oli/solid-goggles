import { getReturn } from "../../src/utils/getReturn";

describe('get return', () => {
  it('executes function', () => {
    const f = jest.fn();
    getReturn(f)();
    expect(f).toHaveBeenCalledTimes(1);
  });

  it('returns function return', () => {
    expect(getReturn(() => 3)()).toBe(3);
  });

  it('execute function with args', () => {
    const f = jest.fn();
    getReturn(f)(1, 2, 3);
    expect(f).toHaveBeenCalledWith(1, 2, 3);
  });

  it('returns non function values', () => {
    expect(getReturn(10)()).toBe(10);
  });
});
