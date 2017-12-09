import { defaultImplements } from '../../src/providers/defaultImplements';

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

describe('defaultImplements', () => {

  it('is true when class correctly implements', () => expect(defaultImplements(InterfaceMock, CorrectImplementation)).toBe(true));

  it('is true when instance correctly implements', () => expect(defaultImplements(InterfaceMock, correctInstance)).toBe(true));

  it('is true when class implements instance methods', () => expect(defaultImplements(correctInstance, CorrectImplementation)).toBe(true));

  it('is false when incorrectly implents method name', () => expect(defaultImplements(InterfaceMock, IncorrectMethodName)).toBe(false));

  it('is false when incorrectly implements method args', () => expect(defaultImplements(InterfaceMock, IncorrectMethodArgs)).toBe(false));
});
