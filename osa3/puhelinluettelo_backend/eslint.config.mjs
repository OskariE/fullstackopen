import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ['dist/**'],
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      '@stylistic/js/indent': [
        'error',
        2,
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix',
      ],
      '@stylistic/js/quotes': [
        'error',
        'single',
      ],
      '@stylistic/js/semi': [
        'error',
        'never',
      ],
    },
  },
]
