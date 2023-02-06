import { CreditCard } from "./credit-card";

describe("CreditCard Class", () => {
  const valid = {
    name: `Daniel`,
    number: 3391391735799169,
    limit: 5000,
  };

  const invalid = {
    name: `Daniel`,
    number: 9998640106728,
    limit: 5000,
  };

  test("should not throw error for valid card data", () => {
    expect(() => new CreditCard(valid)).not.toThrow();
  });

  test("should throw error for invalid card data", () => {
    expect(() => new CreditCard(invalid)).toThrow();
  });
});
