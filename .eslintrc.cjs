module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    'import/extensions': ['.mjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js'],
      },
    },
  },
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id', '__dirname'] }],
  },
};
