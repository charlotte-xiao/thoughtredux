function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  // Question1: 为什么要对参数对象原型链的最后一个值进行比较？
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

export default isPlainObject;
