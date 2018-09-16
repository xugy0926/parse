module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    typeof: true,
    process: true,
    __dirname: true,
    describe: true,
    it: true,
    Parse: true
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }]
  }
}
