import { connect } from "../../src/decorators/connect";
import { properties, parameters } from "../../src/providers/symbols";


describe('connect', () => {
  it('set value to properties hook in property', () => {
    const target = {};
    const property = 'property';
    const value = {};

    connect(value)(target, property);

    expect(target[properties][property]).toBe(value);
  });

  it('set value to parameters hook in length', () => {
    const target = {};
    const length = 0;
    const value = {};

    connect(value)(target, undefined, length);

    expect(target[parameters][length]).toBe(value);
  });

  it('return void', () => {
    expect(connect({})({}, 'property')).toBe(undefined);
  });
});
