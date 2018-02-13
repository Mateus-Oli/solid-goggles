import { asFunc } from '../../src/utils/asFunc';

describe('as function', () => {
  it('executes function', () => {
    const f = jest.fn();
    asFunc(f)();
    expect(f).toHaveBeenCalledTimes(1);
  });

  it('returns function return', () => {
    expect(asFunc(() => 3)()).toBe(3);
  });

  it('execute function with args', () => {
    const f = jest.fn();
    asFunc(f)(1, 2, 3);
    expect(f).toHaveBeenCalledWith(1, 2, 3);
  });

  it('returns non function values', () => {
    expect(asFunc(10)()).toBe(10);
  });
});
