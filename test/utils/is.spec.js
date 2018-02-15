import {
  isBoolean,
  isComposite,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  isPrimitive,
  isString,
  isSymbol,
  isUndefined,
} from '../../src/utils/is';

describe('is', () => {

  it('checks primitive', () => {
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(Symbol())).toBe(true);

    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);

    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive()).toBe(true);
  });

  it('checks composite', () => {
    expect(isComposite(true)).toBe(false);
    expect(isComposite(false)).toBe(false);
    expect(isComposite('')).toBe(false);
    expect(isComposite(0)).toBe(false);
    expect(isComposite(Symbol())).toBe(false);

    expect(isComposite({})).toBe(true);
    expect(isComposite(() => {})).toBe(true);

    expect(isComposite(null)).toBe(false);
    expect(isComposite()).toBe(false);
  });

  it('checks empty', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty('')).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(Symbol())).toBe(false);

    expect(isEmpty({})).toBe(false);
    expect(isEmpty(() => {})).toBe(false);

    expect(isEmpty(null)).toBe(true);
    expect(isEmpty()).toBe(true);
  });

  it('checks boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(Symbol())).toBe(false);

    expect(isBoolean({})).toBe(false);
    expect(isBoolean(() => {})).toBe(false);

    expect(isBoolean(null)).toBe(false);
    expect(isBoolean()).toBe(false);
  });

  it('checks number', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(Symbol())).toBe(false);

    expect(isNumber({})).toBe(false);
    expect(isNumber(() => {})).toBe(false);

    expect(isNumber(null)).toBe(false);
    expect(isNumber()).toBe(false);
  });

  it('checks string', () => {
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString('')).toBe(true);
    expect(isString(0)).toBe(false);
    expect(isString(Symbol())).toBe(false);

    expect(isString({})).toBe(false);
    expect(isString(() => {})).toBe(false);

    expect(isString(null)).toBe(false);
    expect(isString()).toBe(false);
  });

  it('checks symbol', () => {
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol('')).toBe(false);
    expect(isSymbol(0)).toBe(false);
    expect(isSymbol(Symbol())).toBe(true);

    expect(isSymbol({})).toBe(false);
    expect(isSymbol(() => {})).toBe(false);

    expect(isSymbol(null)).toBe(false);
    expect(isSymbol()).toBe(false);
  });

  it('checks object', () => {
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(Symbol())).toBe(false);

    expect(isObject({})).toBe(true);
    expect(isObject(() => {})).toBe(false);

    expect(isObject(null)).toBe(false);
    expect(isObject()).toBe(false);
  });

  it('checks function', () => {
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction(Symbol())).toBe(false);

    expect(isFunction({})).toBe(false);
    expect(isFunction(() => {})).toBe(true);

    expect(isFunction(null)).toBe(false);
    expect(isFunction()).toBe(false);
  });

  it('checks undefined', () => {
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(Symbol())).toBe(false);

    expect(isUndefined({})).toBe(false);
    expect(isUndefined(() => {})).toBe(false);

    expect(isUndefined(null)).toBe(false);
    expect(isUndefined()).toBe(true);
  });
});
