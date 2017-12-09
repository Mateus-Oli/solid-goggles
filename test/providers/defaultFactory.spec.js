import { defaultFactory } from '../../src/providers/defaultFactory';

class ImplementationMock {

}

const instanceMock = defaultFactory(ImplementationMock);
const value = defaultFactory(instanceMock);

describe('defaultFactory', () => {

  it('instantiate functions', () => expect(instanceMock).toBeInstanceOf(ImplementationMock));

  it('return non functions', () => expect(value).toBe(instanceMock));
});
