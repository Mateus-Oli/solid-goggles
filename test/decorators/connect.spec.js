import { connect } from '../../src/decorators/connect';
import { methods, parameters, properties } from '../../src/providers/symbols';

describe('connect', () => {

  it('creates correct containers', () => {
    const object = {};

    connect({})(object, 'property');
    connect({})(object, undefined, 0);

    expect(object[parameters]).toBeInstanceOf(Array);
    expect(object[properties]).not.toBeInstanceOf(Array);
  });

  it('creates new containers for diferent objects', () => {
    const first = {};
    const second = {};

    connect({})(first, 'property');
    connect({})(second, 'property');

    expect(first[properties]).not.toBe(second[properties]);

    connect({})(first, undefined, 0);
    connect({})(second, undefined, 0);

    expect(first[parameters]).not.toBe(second[parameters]);
  });

  it('sets value to properties hook in property', () => {
    const target = {};
    const property = 'property';
    const value = {};

    connect(value)(target, property);

    expect(target[properties][property]).toBe(value);
  });

  it('sets value to parameters hook in length', () => {
    const target = {};
    const length = 0;
    const value = {};

    connect(value)(target, undefined, length);

    expect(target[parameters][length]).toBe(value);
  });

  it('sets value to methods hook in property[length]', () => {
    const target = {};
    const property = 'property';
    const length = 0;
    const value = {};

    connect(value)(target, property, length);

    expect(target[methods][property][length]).toBe(value);
  });

  it('return void', () => {
    expect(connect({})({}, 'property')).toBe(undefined);
  });

  it('uses Reflect.getMetadata for parameters without provided type', () => {
    const object = {};
    const paramType = {};

    const original = Reflect.getMetadata;
    Reflect.getMetadata = jest.fn((type, target, property) => {
      expect(type).toBe('design:paramtypes');
      expect(target).toBe(object);
      expect(property).toBe(undefined);

      return [paramType];
    });

    connect()(object, undefined, 0);

    expect(object[parameters][0]).toBe(paramType);
    expect(Reflect.getMetadata).toHaveBeenCalledTimes(1);

    Reflect.getMetadata = original;
  });

  it('does not break without return of Reflect.getMetadata', () => {
    const object = {};

    const original = Reflect.getMetadata;
    Reflect.getMetadata = jest.fn((type, target, property) => {
      expect(type).toBe('design:paramtypes');
      expect(target).toBe(object);
      expect(property).toBe(undefined);
    });

    connect()(object, undefined, 0);

    expect(object[parameters][0]).toBe(undefined);
    expect(Reflect.getMetadata).toHaveBeenCalledTimes(1);

    Reflect.getMetadata = original;
  });

  it('uses Reflect.getMetadata for properties without provided type', () => {
    const object = {};
    const paramType = {};

    const original = Reflect.getMetadata;
    Reflect.getMetadata = jest.fn((type, target, property) => {
      expect(type).toBe('design:type');
      expect(target).toBe(object);
      expect(property).toBe('property');

      return paramType;
    });

    connect()(object, 'property');

    expect(object[properties].property).toBe(paramType);
    expect(Reflect.getMetadata).toHaveBeenCalledTimes(1);

    Reflect.getMetadata = original;
  });

  it('returns undefined if no type provided and no Reflect.getMetadata', () => {
    const object = {};

    connect()(object, 'property');
    expect(object[properties].property).toBe(undefined);

    connect()(object, undefined, 0);
    expect(object[parameters][0]).toBe(undefined);
  });
});
