module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testMatch: ['**/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'tests/**/*.js',
    '!tests/**/*.spec.js',
  ],
};