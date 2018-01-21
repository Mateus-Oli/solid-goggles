# Injector

[![Build Status](https://travis-ci.org/Mateus-Oli/solid-goggles.svg?branch=master)](https://travis-ci.org/Mateus-Oli/solid-goggles)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c0a3415ea4c9f3ec375/maintainability)](https://codeclimate.com/github/Mateus-Oli/solid-goggles/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c0a3415ea4c9f3ec375/test_coverage)](https://codeclimate.com/github/Mateus-Oli/solid-goggles/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/mateus-oli/solid-goggles/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mateus-oli/solid-goggles?targetFile=package.json)
[![dependencies](https://david-dm.org/Mateus-Oli/solid-goggles.svg)](https://david-dm.org/Mateus-Oli/solid-goggles)
[![devDependencies](https://david-dm.org/Mateus-Oli/solid-goggles/dev-status.svg)](https://david-dm.org/Mateus-Oli/solid-goggles)
[![perrDependencies](https://david-dm.org/Mateus-Oli/solid-goggles/peer-status.svg)](https://david-dm.org/Mateus-Oli/solid-goggles)

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
    * [Container](#container)
    * [Injector Emitter](#injector-emitter)
    * [Injector Error](#injector-error)
1. [Change Dependencies](#change-dependencies)

## Basic Usage
```javascript
import { Injector } from 'injector';

class Implementation {
  method() {}
}
const injector = Injector.of(Implementation);

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

injector.onEvery(Implementation, (instance, next) => next(instance));
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
```

## Properties
```javascript
import { Injector } from 'injector';
import { Container } from 'injector';
import { InjectorEmitter } from 'injector';

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

injector.onEvery((instance, next) => {
  /* all events */
  return next(instance);
});

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

### Container
```javascript
import { Container } from 'injector';

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

container.setInterface(Implementation, Interface);
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
import { InjectorEmitter } from 'injector';

const emitter = new InjectorEmitter;

class Implementation {}
const instance = new Implementation;

const everyListener = emitter.onEvery(Implementation, (instance, next) => next(instance));
const getListener = emitter.onGet(Implementation, (instance, next) => next(instance));
const setListener = emitter.onSet(Implementation, (instance, next) => next(instance));
const deleteListener = emitter.onDelete(Implementation, (instance, next) => next(instance));
const instantiateListener = emitter.onInstantiate(Implementation, (instance, next) => next(instance));

emitter.emitEvery(Implementation, instance);
emitter.emtiGet(Implementation, instance);
emitter.emitSet(Implementation, instance);
emitter.emitDelete(Implementation, instance);
emitter.emitInstantiate(Implementation, instance);

emitter.removeEvery(Implementation, everyListener);
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

## Change Dependencies
```javascript
import { Injector, Container, InjectorEmitter } from 'injector';

class OtherContainer implements Container {}
class OtherInjectorEmitter implements InjectorEmitter {}

const injector = new Injector(undefined, OtherContainer, OtherInjectorEmitter);
```
