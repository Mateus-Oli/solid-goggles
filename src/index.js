import { defaultFactory } from './providers/defaultFactory';
import { Injector } from './model/injector';
import { defaultCanImplement } from './providers/defaultCanImplement';

Injector.baseCanImplement = defaultCanImplement;
Injector.baseFactory = defaultFactory;

export * from './model/injector';
export * from './model/injectorGroup';

export * from './providers/symbols';

export * from './error/injectorError';
