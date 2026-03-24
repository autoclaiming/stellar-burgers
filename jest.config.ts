export default {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[tj]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'jest-css-modules-transform',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1'
  }
};
