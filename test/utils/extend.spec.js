import { extend } from '../../src/utils/extend';

describe('extend', () => {
  it('returns target', () => {
    const target = {};
    expect(extend(target)).toBe(target);
  });

  it('injects properties in target', () => {
    expect(extend({}, { a: 1}).a).toBe(1);
  });

  it('returns primitive target', () => {
    expect(extend(1, { a: 1})).toBe(1);
  });

  it('ignores primitives extensions', () => {
    expect(Object.keys(extend(Object.create(null), 10)).length).toBe(0);
  });
});
