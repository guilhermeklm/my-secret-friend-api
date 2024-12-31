import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  modulePathIgnorePatterns: ["dist", "node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/test/e2e/**/*.test.ts"],
  testTimeout: 60000
};

export default config;