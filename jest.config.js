module.exports = {
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: ["lcov",],
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
};
