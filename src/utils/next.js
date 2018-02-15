const FIRST = 0;

function nextHelper(baseArg, fns, args) {
  if (!fns.length) {
    return baseArg;
  }
  return fns[FIRST](baseArg, arg => {
    fns.shift();
    return nextHelper(arg, fns, args);
  }, ...[].concat(args));
}

export function next(baseArg, fns, args) {
  return nextHelper(baseArg, [].concat(fns || []), args);
}
