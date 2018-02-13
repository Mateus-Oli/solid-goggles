import { error } from '../../src/utils/error';

describe('error', () => {
  it('throws value', () => expect(() => error(new Error('error'))).toThrowError('error'));
});
