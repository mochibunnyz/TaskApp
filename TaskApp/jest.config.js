module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'],
    testMatch: ['**/__tests__/**/*.ios.js'],
};
  