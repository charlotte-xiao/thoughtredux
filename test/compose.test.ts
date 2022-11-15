import compose from "../src/compose";

describe('test compose', () => {
  it('multiply function for compose', () => {
    const double = (x: number) => x * 2;
    const square = (x: number) => x * x;
    expect(compose(square)(5)).toBe(25);
    expect(compose(square, double)(5)).toBe(100);
    expect(compose(double, square, double)(5)).toBe(200);
  })
})
