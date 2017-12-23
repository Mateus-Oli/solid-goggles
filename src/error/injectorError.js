const def = {};

export class InjectorError extends Error {

  static get INTERFACE() { return '{interface}'; }
  static get IMPLEMENTATION() { return '{implementation}'; }

  static get GENERATE_ERROR() { return `Could not instantiate interface '{interface}'`; }
  static get LINK_ERROR() { return `Implementation '{implementation}' is not compatible with '{interface}'`; }

  constructor(inter = def, impl = def, message = InjectorError.GENERATE_ERROR) {
    super(message
      .replace(InjectorError.INTERFACE, inter.name || inter)
      .replace(InjectorError.IMPLEMENTATION, impl.name || impl));

    Object.assign(this, {
      interface: inter,
      implementation: impl
    });
  }
}
