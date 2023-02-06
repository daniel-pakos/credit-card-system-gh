/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
const jestConfigUnit = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  transform: {
    "\\.[jt]sx?$": "ts-jest",
    packages: "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!@dp)", "packages/(?!@dp)"],
};

export default jestConfigUnit;
