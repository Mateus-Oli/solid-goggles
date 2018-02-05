import { Injector } from './models/injector';
import { defaultCanImplement } from './providers/defaultCanImplement';
import { defaultFactory } from './providers/defaultFactory';

Injector.baseCanImplement = defaultCanImplement;
Injector.baseFactory = defaultFactory;

export * from './models/injector';
export * from './models/container';
export * from './models/injectorEmitter';

export * from './providers/symbols';

export * from './decorators/connect';
export * from './decorators/register';
export * from './decorators/implement';

export * from './errors/injectorError';
