module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
<<<<<<< HEAD
=======
    'import/prefer-default-export': 'off',
>>>>>>> master
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
