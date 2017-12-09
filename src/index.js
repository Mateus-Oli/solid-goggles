import { defaultFactory } from './providers/defaultFactory';
import { Injector } from './model/injector';
import { defaultImplements } from './providers/defaultImplements';

Injector.baseImplements = defaultImplements;
Injector.baseFactory = defaultFactory;

export { Injector };
export * from './providers/symbols';
