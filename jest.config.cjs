module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      // TODO - would like to turn this on and get type-checking, but it's not
      // working? ~will
      diagnostics: false
    }
  }
};
