function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((pre, cur) => (...args: any) => pre(cur(...args)));
}

export default compose;
