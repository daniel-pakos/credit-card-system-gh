import {luhn} from "./index";

describe("Luhn Alghorit", () => {
  const valid = [`420530366811717`, `8888012013`, `3362609497894437056`];

  const invalid = [`420530366811718`, `8888012011`, `336260949789443705243`];

  it("should pass all valid numbers", () => {
    valid.map((el) => {
      const isValid = luhn(el);
      expect(isValid).toBe(true);
    });
  });

  it("should fail all invalid numbers", () => {
    invalid.map((el) => {
      const isValid = luhn(el);
      expect(isValid).toBe(false);
    });
  });
});
