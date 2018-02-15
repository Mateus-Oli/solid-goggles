import { fill } from '../../src/utils/fill';

describe('fill', () => {
  it('returns empty array on empty call', () => {
    expect(fill()()).toMatchObject([]);
  });

  it('fills empty or undefined sparse array spaces', () => {
    const sparse = [undefined, undefined, 2, 3, 4, , 6, undefined, 8];
    const data = [0, 1, 5, 7, 9, 10];
    expect(fill(sparse)(data)).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('ignores undefined data used', () => {
    const sparse = [undefined, 2];
    const data = [undefined, undefined, 1];

    expect(fill(sparse)(data)).toMatchObject([1, 2]);
  });
});
