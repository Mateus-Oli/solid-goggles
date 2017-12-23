import { defaultFactory } from './providers/defaultFactory';
import { Injector } from './model/injector';
import { defaultImplements } from './providers/defaultImplements';

Injector.baseImplements = defaultImplements;
Injector.baseFactory = defaultFactory;

export * from './model/injector';
export * from './model/injectorGroup';

export * from './providers/symbols';

export * from './error/injectorError';
