import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import * as importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import turbo from 'eslint-plugin-turbo'

export default defineConfig([
  { ignores: ['dist', 'node_modules'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  turbo.configs['flat/recommended'],
  ...svelte.configs['flat/recommended'],
  ...svelte.configs['flat/prettier'],
  prettierPlugin,
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.{ts,svelte}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: { import: importPlugin, 'simple-import-sort': simpleImportSortPlugin },
    rules: {
      'import/first': 'error',
      'import/no-cycle': 'warn',
      'import/no-duplicates': 'error',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^svelte', '^@?\\w'],
            ['^@app', '^@pages', '^@widgets', '^@features', '^@entities', '^@shared'],
            ['^@', '^\\w'],
            ['^\\u0000', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['\\.css$', '\\.scss$'],
          ],
        },
      ],
    },
  },
])
