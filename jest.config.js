/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/mocks/prisma.ts"],
};
