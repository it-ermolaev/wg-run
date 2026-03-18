// @ts-check
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import * as importPlugin from 'eslint-plugin-import'

export default defineConfig(
  {
    ignores: ['eslint.config.mjs', '.prettierrc.js', '.lintstagedrc.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { import: importPlugin },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'type',
            ['parent', 'sibling', 'index'],
            'object',
          ],
          pathGroups: [
            {
              pattern: '@configs/**',
              group: 'internal',
            },
            {
              pattern: '@modules/**',
              group: 'internal',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
            },
            {
              pattern: '@repositories/**',
              group: 'internal',
            },
            {
              pattern: '@core/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
)
