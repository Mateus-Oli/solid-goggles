# Injector

1. [Basic Usage](#basic-usage)
1. [Methods](#methods)
1. [Properites](#properties)
1. [Clone Injector](#clone-injector)
1. [Factory](#factory)
1. [Events](#events)
1. [Symbols](#symbols)
1. [Inject](#inject)
1. [Overwrite](#overwrite)
1. [Other Models](#other-models)
    * [Injector Group](#injector-group)
    * [Container](#container)
    * [Injector Emitter](#injector-emitter)
    * [Injector Error](#injector-error)

## Basic Usage
```javascript
import { Injector } from 'injector';

const injector = new Injector;

class Implementation {
  method() {}
}
injector.setImplementation(Implementation);

class Interface {
  method() {}
}

const instance = injector.get(Interface);
```

## Methods
```javascript
import { Injector } from 'injector';

class Interface {}
class Implementation {}

const injector = new Injector;

injector.setImplementation(Implementation);
injector.tryGet(Implementation);

/** breaks without implementation */
const instance = injector.get(Interface);

injector.set(Interface, instance);
injector.delete(Interface);

/** breaks on wrong implementation */
injector.link(Interface, Implementation);

injector.tryLink(Interface, Implementation);

injector.factory(Implementation, (implementation, args, injector) => new implementation(...args));

injector.onGet(Implementation, (instance, next) => next(instance));
injector.onSet(Implementation, (instance, next) => next(instance));
injector.onDelete(Implementation, (instance, next) => next(instance));
injector.onInstantiate(Implementation, (instance, next) => next(instance));

/** instantiate + set + generated */
injector.generate(Implementation);
injector.genereted(instance);

/** factory + inject */
injector.instantiate(Implementation);
injector.inject(Implementation);


/** delete all instances */
injector.clear();

injector.findInterface(Interface || Implementation || instance);
injector.findImplementation(Interface || Implementation || instance);
injector.findInstance(Interface || Implementation || instance);

injector.canImplement(Interface, Implementation);

injector.getFactory(Implementation);
injector.getCanImplement(Interface, Implementation);

injector.error(Interface, Implementation, 'message');
```

## Properties
```javascript
import { Injector } from 'injector';
import { Container } from 'injector/model/container';
import { InjectorEmitter } from 'injector/model/injectorEmitter';

const injector = new Injector({
  container: new Container,
  emitter: new InjectorEmitter,
  factories: new Map
});
```

## Clone Injector
```javascript
const injector = new Injector;
const clone = new Injector(injector);
```

## Factory
```javascript
import { Injector } from 'injector';

class Implementation {}

const injector = new Injector;

injector.factory(Implementation, (implementation, args, injector) => new implementation(...args));
```

## Events
```javascript
import { Injector } from 'injector';

class Implementation {}

const injector = new Injector;

injector.onGet((instance, next) => {
  /** generic */
  return next(instance);
});

injector.onGet(Implementation, (instance, next) => {
  /** implementation */
  return next(instance);
});
```

## Symbols
```javascript
import { canImplement, inject, generated } from 'injector';
```

## Manage

### Inject
```javascript
import { inject } from 'injector';

class OtherImplementation {}

class Implementation {

  /** Warn: Unhandled Circular Dependency */
  static [inject]() { return [ OtherImplementation ]; }

  constructor(otherInstance) {
    this.otherInstance = otherInstance;
  }
}
```

### Generated
```javascript
import { generated } from 'injector';

class Implementation {

  [generated](injector) {

    /** Allow circular dependencies */

    return {
      instance: Implementation
    };
  }
}
```

## Overwrite
```javascript
import { Injector, canImplement } from 'injector';

Injector.baseCanImplement = (interface, implementation, injector) => true;
Injector.baseFactory = (implementation, args, injector) => new implementation(...args);

const injector = new Injector;

injector.baseCanImplement = (interface, implementation, injector) => true;
injector.baseFactory = (implementation, args, injector) => new implementation(...args);

class Interface {
  static [canImplement](interface, implementation, injector) {
    return true;
  }
}
class Implementation {
  static [canImplement](interface, implementation, injector) {
    return true;
  }
}
```

## Other Models

### Injector Group
```javascript
import { InjectorGroup, Injector } from 'injector';

const injector = new Injector;
const group = new InjectorGroup([injector]);

class Interface {}
class Implementation {}

injector.setImplementation(Implementation);

/** breaks without implementation */
const instance = group.get(Interface);

group.tryGet(Interface);

group.getInjector(instance);
group.setInjector(injector);
group.deleteInjector(injector);

group.hasInjector(injector);

group.clear();

group.error(Interface, Implementation, 'message');
```

### Container
```javascript
import { Container } from 'injector/model/container';

class Interface {}
class Implementation {}
const instance = new Implementation;

const container = new Container([
  [Interface, Implementation, instance]
]);

container.parent = new Container;

container.getInterface(Interface || Implementation || instance);
container.getImplementation(Interface || Implementation || instance);
container.getInstance(Interface || Implementation || instance);

container.setInterface(Interface, Implementation);
container.setImplementation(Implementation);
container.setInstance(Implementation, instance);

container.deleteInterface(Interface || Implementation || instance);
container.deleteImplementation(Interface || Implementation || instance);
container.deleteInstance(Interface || Implementation || instance);

container.clearInterfaces();
container.clearImplementations();
container.clearInstances();
```

### Injector Emitter
```javascript
import { InjectorEmitter } from 'injector/model/injectorEmitter';

const emitter = new InjectorEmitter;

class Implementation {}
const instance = new Implementation;

const getListener = emitter.onGet(Implementation, (instance, next) => next(instance));
const setListener = emitter.onSet(Implementation, (instance, next) => next(instance));
const deleteListener = emitter.onDelete(Implementation, (instance, next) => next(instance));
const instantiateListener = emitter.onInstantiate(Implementation, (instance, next) => next(instance));

emitter.emtiGet(Implementation, instance);
emitter.emitSet(Implementation, instance);
emitter.emitDelete(Implementation, instance);
emitter.emitInstantiate(Implementation, instance);

emitter.removeGet(Implementation, getListener);
emitter.removeSet(Implementation, setListener);
emitter.removeDelete(Implementation, deleteListener);
emitter.removeInstantiate(Implementation, instantiateListener);
```

### Injector Error
```javascript
import { InjectorError } from 'injector';

class Interface {}
class Implementation {}

const injectorError = new InjectorError(Interface, Implementation, 'message');
```
