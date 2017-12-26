import { Injector } from './model/injector';

import { defaultFactory } from './providers/defaultFactory';
import { defaultCanImplement } from './providers/defaultCanImplement';

Injector.baseCanImplement = defaultCanImplement;
Injector.baseFactory = defaultFactory;

export * from './model/injector';
export * from './model/injectorGroup';
export * from './model/container';
export * from './model/injectorEmitter';

export * from './providers/symbols';

export * from './error/injectorError';
