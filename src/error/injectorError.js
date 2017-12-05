const def = {};

export class InjectorError extends Error {

  static get INTERFACE_SUBSTITUTE() { return '{interface}'; }
  static get IMPLEMENTATION_SUBSTITUTE() { return '{interface}'; }

  static get GENERATE_ERROR() { return `Could not instanciate interface '{interface}'`; }
  static get LINK_ERROR() { return `Implementation '{implementation}' is not compactable with '{interface}'`; }

  constructor(inter = def, impl = def, message = '') {
    super(message);

    this.message = message
      .replace(this.constructor.INTERFACE_SUBSTITUTE, inter.name || inter)
      .replace(this.constructor.IMPLEMENTATION_SUBSTITUTE, impl.name || impl)

    Object.assign(this, {
      interface: inter,
      implementation: impl
    });
  }
}
