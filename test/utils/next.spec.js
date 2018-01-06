import { next } from '../../src/utils/next';


describe('next', () => {
  it('passes correct parameters', () => {
    next(10, (v, n) => {
      expect(v).toBe(10);
      expect(n).toBeInstanceOf(Function);
    });
  });
  it('returns start value without functions', () => {
    expect(next(10)).toBe(10);
    expect(next(10, [])).toBe(10);
  });
  it('returns value returned by last called function', () => {
    expect(next(10, v => v + 1)).toBe(11);
  });
  it('does not execute next functions when not called', () => {
    expect(next(10, [v => v, v => v + 1])).toBe(10);
  });
  it('executes next function when called', () => {
    expect(next(10, [(v, n) => n(v), v => v + 1])).toBe(11);
  });
  it('returns next function return', () => {
    expect(next(10, [(v, n) => expect(n(v)).toBe(11), v => v + 1]));
  });
  it('accept multiple next calls', () => {
    expect(next(10, [(v, n) => n(n(n(v)))])).toBe(10);
  });
  it('executes each function once only', () => {
    expect(next(10, [
      (v, n) => {
        expect(n(v)).toBe('second');
        expect(n(v)).toBe('third');
        expect(n(v)).toBe(v);
      },
      () => 'second',
      () => 'third'
    ]));
  });
});
