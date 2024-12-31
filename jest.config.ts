import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  modulePathIgnorePatterns: ["dist", "node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", 
  },
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
};

export default config;