const { browser, node } = require('globals')
const { configs: jsEslintConfigs } = require('@eslint/js')
const { configs: tsEslintConfigs, parser: tsEslintParser } = require('typescript-eslint')
const eslintConfigPrettier = require('eslint-config-prettier/flat')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  /**
   * ESlint 忽略检测配置
   */
  { ignores: ['dist/**', 'node_modules/**'] },
  /**
   * ESlint 基础检测配置
   */
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...browser, ...node },
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
      },
    },
  },
  /**
   * ESlint TypeScript 检测配置（ESLint recommended + TS type-checked）
   */
  jsEslintConfigs.recommended,
  ...tsEslintConfigs.recommendedTypeChecked,
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsEslintParser },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  /**
   * ESlint Prettier 检测配置（关闭与 Prettier 冲突的 ESLint 规则，必须在 prettier 规则之前）
   */
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'warn' },
  }
]
