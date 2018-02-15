import { objectMap } from '../../src/utils/objectMap';

describe('object map', () => {
  it('creates a new object', () => {
    const object = {};
    expect(objectMap(object)(x => x)).not.toBe(object);
  });

  it('executes for each key', () => {
    const map = jest.fn();
    const object = { a: 1 };
    objectMap(object)(map);

    expect(map).toHaveBeenCalledWith(1, 'a', object);
  });

  it('executes for all keys', () => {
    const map = jest.fn();
    objectMap({ a: 1, b: 2 })(map);

    expect(map).toHaveBeenCalledTimes(2);
  });

  it('mantains prototype', () => {
    expect(objectMap([])()).toBeInstanceOf(Array);
  });

  it('map object keys', () => {
    expect(objectMap({
      a: 1, b: 2
    })(x => x + 1)).toMatchObject({ a: 2, b: 3 });
  });
});
