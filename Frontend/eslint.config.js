import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins : {
      'simple-import-sort' : eslintPluginSimpleImportSort,
      'unused-imports': unusedImports,
    },
    rules : {
      // 'semi' : ['error', 'always'],
      // 'quotes' : ['error', 'single'],
      'simple-import-sort/imports' : 'error',
      'simple-import-sort/exports' : 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-sequences': 'error',

      // Catch unused variables, function args, and destructured props (likely typos)
      'no-unused-vars' : ['error', {
        vars : 'all',                  // Check all variables
        args : 'after-used',           // Flag unused function arguments after the last used one
        caughtErrors : 'all',          // Check catch block error variables
        destructuredArrayIgnorePattern : '^_',  // Allow _prefixed to be unused
        ignoreRestSiblings : true      // Allow rest siblings in destructuring
      }],

      // Catch usage of variables that are never defined (typos in prop names, missing imports)
      'no-undef' : 'error'
    }
  },
]);
