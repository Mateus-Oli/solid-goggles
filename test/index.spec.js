import { Injector } from "../src/index";

describe('index', () => {

  it('set baseFactory and baseCanImplement', () => {
    expect(Injector.baseFactory).toBeInstanceOf(Function);
    expect(Injector.baseCanImplement).toBeInstanceOf(Function);
  });
});
