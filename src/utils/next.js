function nextHelper(baseArg, fns) {
  if (!fns.length) {
    return baseArg;
  }
  return fns[0](baseArg, arg => {
    fns.shift();
    return nextHelper(arg, fns);
  });
}

export function next(baseArg, fns) {
  return nextHelper(baseArg, [].concat(fns || []));
}
