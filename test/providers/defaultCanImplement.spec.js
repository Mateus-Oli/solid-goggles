import { defaultCanImplement } from '../../src/providers/defaultCanImplement';

class InterfaceMock {

  methodMock1() {}
  methodMock2(arg1, arg2) {}
}

class CorrectImplementation {

  methodMock1() {}
  methodMock2(arg1, arg2) {}

  ignoredMethod() {}
}

const correctInstance = {

  methodMock1() {},
  methodMock2(arg1, arg2) {}
};

class IncorrectMethodName {

  methodMock1() {}
  incorrect() {}
}

class IncorrectMethodArgs {

  methodMock1() {}
  methodMock2() {}
}

describe('defaultCanImplement', () => {

  it('is true when class correctly implements', () => expect(defaultCanImplement(InterfaceMock, CorrectImplementation)).toBe(true));

  it('is true when instance correctly implements', () => expect(defaultCanImplement(InterfaceMock, correctInstance)).toBe(true));

  it('is true when class implements instance methods', () => expect(defaultCanImplement(correctInstance, CorrectImplementation)).toBe(true));

  it('is false when incorrectly implents method name', () => expect(defaultCanImplement(InterfaceMock, IncorrectMethodName)).toBe(false));

  it('is false when incorrectly implements method args', () => expect(defaultCanImplement(InterfaceMock, IncorrectMethodArgs)).toBe(false));
});
