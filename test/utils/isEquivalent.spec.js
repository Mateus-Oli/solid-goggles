import { isEquivalent } from '../../src/utils/isEquivalent';

describe('is equivalent', () => {
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
