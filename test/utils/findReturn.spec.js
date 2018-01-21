import { findReturn } from "../../src/utils/findReturn";

describe('find return', () => {
  it('executes with right parameters', () => findReturn([10], v => expect(v).toBe(10)));
  it('returns first returned truthy value', () => expect(findReturn([0, 0, 0, 1, 0], v => v)).toBe(1));
  it('returns undefined without truthy value', () => expect(findReturn([1, 2, 3, 4, 5], () => false)).toBe(undefined));
});
