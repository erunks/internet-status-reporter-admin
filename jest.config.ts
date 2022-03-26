export default {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/containers/**/*.{ts,tsx}',
    'src/helpers/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/layouts/**/*.{ts,tsx}',
    'src/routes/**/*.{ts,tsx}',
    '!src/routes/index.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.{ts,tsx}$': 'ts-jest',
  },
};
