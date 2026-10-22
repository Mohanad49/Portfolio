import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/**', '.astro/**', '.impeccable/**', '.research/**', 'test-results/**', 'playwright-report/**', '.lighthouseci/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.astro'], languageOptions: { parserOptions: { parser: ts.parser } } },
];
