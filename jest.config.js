module.exports = {
  testEnvironment: "jsdom",
  // ensures jest-dom is loaded BEFORE tests
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // mock CSS modules
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  // transform JSX with babel-jest
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },

  // sometimes firebase & react-router-dom need to be transformed
  transformIgnorePatterns: [
    "node_modules/(?!(@?firebase|react-router-dom)/)"
  ],

  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
