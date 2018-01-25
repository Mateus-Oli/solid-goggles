export const getReturn = f => (...args) => typeof f === 'function' ? f(...args) : f;
