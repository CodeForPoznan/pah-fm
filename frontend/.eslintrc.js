module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 0,
    'no-debugger': 'warn',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 0,
    'comma-dangle': 'warn',
    semi: 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
