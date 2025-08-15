const sum = (a: number, b: number) => {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    Number.isNaN(a) ||
    Number.isNaN(b)
  ) {
    throw new TypeError("sum expects two numbers");
  }
  return a + b;
};

export default sum;
