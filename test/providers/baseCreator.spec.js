import { baseCreator } from '../../src/providers/baseCreator';

const baseMock = {
  map: new Map,
  set: new Set
};

const key = {};

const valueMock = {
  hasProp: {},
  map: new Map([[key, {}]])
};

const createBaseMock = baseCreator(baseMock);

describe('baseCreator', () => {
  it('creates a function', () => expect(typeof createBaseMock).toBe('function'));

  const clone = createBaseMock(valueMock);

  it('generated function clone value object', () => {

    expect(clone).toBeTruthy();

    expect(clone).not.toBe(baseMock);
    expect(clone).not.toBe(valueMock);
  });

  it('mantain value properties', () => expect(clone.hasProp).toBe(valueMock.hasProp));

  it('clones base properties(Map/Set)', () => {

    expect(clone.map).not.toBe(baseMock.map);
    expect(clone.set).not.toBe(baseMock.set);

    expect(clone.map).toBeInstanceOf(Map);
    expect(clone.set).toBeInstanceOf(Set);
  });

  it('merge cloned properties of value', () => expect(clone.map.get(key)).toBe(valueMock.map.get(key)));
});
