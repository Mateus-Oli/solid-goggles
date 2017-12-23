import { InjectorError } from '../../src/error/injectorError';

class InterfaceMock {}

class ImplementationMock {}

const error = new InjectorError(
  InterfaceMock,
  ImplementationMock,
  InjectorError.LINK_ERROR
);

describe('InjectorError', () => {

  it('extends Error', () => expect(error).toBeInstanceOf(Error));

  it('contains interface property', () => expect(error.interface).toBe(InterfaceMock));

  it('contains implementation property', () => expect(error.implementation).toBe(ImplementationMock));

  it('displays correct message', () => expect(error.message).toBe(`Implementation '${ImplementationMock.name}' is not compatible with '${InterfaceMock.name}'`));
});

