module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!pages/_document.tsx",
  ],
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  moduleNameMapper: {
    "^pages/(.*)$": "<rootDir>/pages/$1",
    "^server/(.*)$": "<rootDir>/server/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  resetMocks: true,
  setupFiles: [
    "<rootDir>/src/setupTests.ts",
  ],
  testEnvironment: "node",
};
