module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'object-curly-newline': ['error', { ImportDeclaration: 'never', ExportDeclaration: 'never' }],
    'spaced-comment': ['error', 'always'],
  },
};
