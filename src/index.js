import { Injector } from './models/injector';

import { defaultFactory } from './providers/defaultFactory';
import { defaultCanImplement } from './providers/defaultCanImplement';

Injector.baseCanImplement = defaultCanImplement;
Injector.baseFactory = defaultFactory;

export * from './models/injector';
export * from './models/container';
export * from './models/injectorEmitter';

export * from './providers/symbols';

export * from './decorators/connect';
export * from './decorators/register';

export * from './errors/injectorError';
