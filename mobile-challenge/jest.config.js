module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "^contexts/(.*)$": "<rootDir>/contexts/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^assets/(.*)$": "<rootDir>/assets/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-elements|styled-components|react-native-size-matters|react-native-ratings|react-native-vector-icons)/)",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
};
