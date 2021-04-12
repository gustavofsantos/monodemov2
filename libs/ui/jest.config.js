module.exports = {
  displayName: 'ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ui',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
