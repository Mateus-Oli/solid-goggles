import { isEquivalent, isPrimitive } from '../../src/utils/isEquivalent';

describe('is equivalent', () => {
  it('considers null and undefined as possessing no methods', () => {

    class Empty {}

    class Something {
      method() {}
    }

    expect(isEquivalent(null, undefined)).toBe(true);

    expect(isEquivalent(null, Empty)).toBe(true);
    expect(isEquivalent(undefined, Empty)).toBe(true);

    expect(isEquivalent(Something, null)).toBe(false);
    expect(isEquivalent(Something, undefined)).toBe(false);
  });

  it('compare first class method names with second class', () => {
    class First {
      method1() {}
      method2() {}
    }
    class Second {
      method1() {}
      method2() {}
      method3() {}
    }

    expect(isEquivalent(First, Second)).toBe(true);
    expect(isEquivalent(Second, First)).toBe(false);
  });

  it('compare first class method lengths with second class', () => {
    class First {
      method1() {}
      method2(a) { return a; }
      method3(a, b) { return a + b; }
    }
    class Second {
      method1() {}
      method2(a) { return a;}
      method3(a, b) { return a + b; }
    }
    class Third {
      method1(a) { return a; }
      method2(a) {return a;}
      method3(a, b) { return a + b;}
    }

    expect(isEquivalent(First, Second)).toBe(true);
    expect(isEquivalent(First, Third)).toBe(false);
  });
});

describe('is primitive', () => {
  it('returns true for primitives', () => {

    expect(isPrimitive(1)).toBe(true);
    expect(isPrimitive(0)).toBe(true);

    expect(isPrimitive('string')).toBe(true);
    expect(isPrimitive('')).toBe(true);

    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);

    expect(isPrimitive(Symbol('symbol'))).toBe(true);
  });

  it('returns false for composite', () => {

    expect(isPrimitive({})).toBe(false);

    expect(isPrimitive(() => {})).toBe(false);

    expect(isPrimitive(/regexp/)).toBe(false);

    expect(isPrimitive(new class {})).toBe(false);
  });
});
