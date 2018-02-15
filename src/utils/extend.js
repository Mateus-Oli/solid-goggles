import { isPrimitive } from './is';

export const extend = (target, ...extensions) => isPrimitive(target) ?
  target :
  extensions.reduce((object, extension) => isPrimitive(extension) ? object : Object.assign(object, extension), target);
