import { connect } from "../../src/decorators/connect";
import { generated, inject } from "../../src/providers/symbols";


describe('connect', () => {
  it('set value to generated hook in property', () => {
    const target = {};
    const property = 'property';
    const value = {};

    connect(value)(target, property);

    expect(target[generated][property]).toBe(value);
  });

  it('set value to inject hook in length', () => {
    const target = {};
    const length = 0;
    const value = {};

    connect(value)(target, undefined, length);

    expect(target[inject][length]).toBe(value);
  });

  it('return void', () => {
    expect(connect({})({}, 'property')).toBe(undefined);
  });
});
