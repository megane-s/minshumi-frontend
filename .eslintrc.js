/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // (A)
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // (B)
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
  root: true,
  rules: {
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "unused-imports/no-unused-vars": "warn",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          "@/prisma/generated",
          "@prisma/client",
        ],
      },
    ]
  },
  ignorePatterns: [
    "**/generated/**/*",
  ]
}
