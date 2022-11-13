module.exports = {
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts$': 'babel-jest',
    "^.+\\.tsx$": "babel-jest",
    '^.+\\.js$': 'babel-jest',
    "^.+\\.jsx$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
};
