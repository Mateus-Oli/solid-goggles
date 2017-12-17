# Injector

## Basic Usage
```javascript
import { Injector } from 'injector';

const injector = new Injector;

class Implementation {
  method() { /** implementation */}
}
injector.setImplementation(Implementation);

class Interface {
  method() { /** empty? */ }
}

const instance = injector.get(Interface)
```

## Methods
```javascript
import { Injector } from 'injector';

const injector = new Injector;
class Interface {}
class Implementation {}

/** breaks without implementation */
const instance = injector.get(Interface);

injector.set(Interface, instance);
injector.delete(Interface);

injector.getInstance();
injector.setImplementation(Implementation);

/** breaks on wrong implementation */
injector.link(Interface, Implementation);

injector.unlink(Interface);

injector.factory(Implementation, () => new Implementation);

injector.onGet(Implementation, (instance, next) => next(instance));
injector.onSet(Implementation, (instance, next) => next(instance));
injector.onDelete(Implementation, (instance, next) => next(instance));
injector.onInstantiate(Implementation, (instance, next) => next(instance));

/** instantiate + set */
injector.generate(Implementation);

/** factory + inject */
injector.instantiate(Implementation);

injector.inject(instance);

/** remove all instances */
injector.clear();

injector.findInterface(Interface || Implementation || instance);
injector.findImplementation(Interface || Implementation || instance);
injector.findInstance(Interface || Implementation || instance);

injector.canImplement(Interface, Implementation);

injector.getFactory(Implementation);
injector.getImplements(Interface, Implementation);
```

## Clone Injector
```javascript
const injector = new Injector;
const clone = new Injector(injector);
```

## Factory
```javascript
import { Injector } from 'injector';

const injector = new Injector;
class Implementation {}
injector.setImplementation(Implementation);

injector.factory(Implementation, implementation => {
  /** overwrites injector.baseFactory for Implementation */
});
```

## Events
```javascript
import { Injector } from 'injector';

const injector = new Injector;

class Implementation {

}

injector.onGet((instance, next) => {
  /** generic */
  return next(instance);
});

injector.onGet(Implementation, (instance, next) => {
  /** implementation */
  return next(instance);
});
```

## Inject
```javascript
import { Injector, injectSymbol } from 'injector';

class Implementation {

  [injectorSymbol](injector) {
    /** injector.inject(instance) */
  }
}
```

## Overwrite
```javascript
import { Injector, implementsSymbol } from 'injector';

Injector.baseImplements = (interface, implementation) => true;
Injector.baseFactory = (implementation) => new implementation;

const injector = new Injector;

injector.baseImplements = (interface, implementation) => true;
injector.baseFactory = (implementation) => new implementation;

class Interface {
  static [implementsSymbol](interface, implementation) {
    return true;
  }
}
class Implementation {
  static [implementsSymbol](interface, implementation) {
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
group.getInstance(Interface);

group.getInjector(instance);
group.setInjector(injector);
group.deleteInjector(injector);

group.hasInjector(injector);

group.clear();
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

### InjectorEmitter
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
