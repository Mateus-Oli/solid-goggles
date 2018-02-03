import { Injector } from '../src';
import { defaultCanImplement } from '../src/providers/defaultCanImplement';
import { defaultFactory } from '../src/providers/defaultFactory';

describe('index', () => {
  it('sets baseCanImplement', () => expect(Injector.baseCanImplement).toBe(defaultCanImplement));
  it('sets baseFactory', () => expect(Injector.baseFactory).toBe(defaultFactory));
});
