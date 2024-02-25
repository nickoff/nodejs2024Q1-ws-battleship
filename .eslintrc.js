module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'promise',
  ],
  parser: "@typescript-eslint/parser",
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:n/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}', '*.js', '*.ts'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'indent': 'error',
    'n/no-missing-import': 'off',
    'prettier/prettier': [
      "error",
      {
        'singleQuote': true,
      }
    ]
  },
};