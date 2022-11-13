import isPlainObject from "../../src/utils/isPlainObject";

describe('isPlainObject', () => {
  it('test isPlainObject with multiply types', () => {
    const plainObject = {x: 1}
    expect(isPlainObject(plainObject)).toBeTruthy()

    function F() {}
    const ctorObject = new F()
    // Question 1 tips
    expect(isPlainObject(ctorObject)).toBeFalsy()

    expect(isPlainObject(null)).toBeFalsy()
    expect(isPlainObject(123)).toBeFalsy()
  })
})
