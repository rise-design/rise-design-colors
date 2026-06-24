const { defineConfig } = require('vitest/config')
const { resolve } = require('path')
const { default: dts } = require('vite-plugin-dts')

const ROOT_DIR = resolve(__dirname)
const SRC_DIR = resolve(ROOT_DIR, 'src')
const DIST_DIR = resolve(ROOT_DIR, 'dist')
const STYLES_DIR = resolve(ROOT_DIR, 'src/styles')

const baseConfig = {
  resolve: {
    alias: { '@': SRC_DIR },
  },
  test: {
    environment: 'node', // 纯 TS 函数用 node；测 DOM 时改 happy-dom
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['dist', 'node_modules'],
  },
}

const commonBuildConfig = {
  ...baseConfig,
  publicDir: false,
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
}

module.exports = defineConfig(({ command, mode }) => {
  /**
   * 开发环境
   */
  if (command === 'serve') {
    return {
      ...baseConfig,
      server: {
        host: 'localhost',
        port: 5173,
        open: true,
      },
    }
  }

  /**
   * 构建环境（CommonJS）
   */
  if (command === 'build' && mode === 'cjs') {
    return {
      ...commonBuildConfig,
      build: {
        ...commonBuildConfig.build,
        lib: {
          entry: resolve(SRC_DIR, 'main.ts'),
          formats: ['cjs'],
          fileName: () => 'main.js',
        },
        outDir: resolve(DIST_DIR, 'cjs'),
      },
    }
  }

  /**
   * 构建环境（ES Module）
   */
  if (command === 'build' && mode === 'esm') {
    return {
      ...commonBuildConfig,
      plugins: [
        dts({
          tsconfigPath: resolve(ROOT_DIR, 'tsconfig.build.json'),
          bundleTypes: true,
        })
      ],
      build: {
        ...commonBuildConfig.build,
        lib: {
          entry: resolve(SRC_DIR, 'main.ts'),
          formats: ['es'],
          fileName: () => 'main.js',
        },
        outDir: resolve(DIST_DIR, 'esm'),
      },
    }
  }

  /**
   * 构建环境（CSS）
   */
  if (command === 'build' && mode === 'css') {
    return {
      ...commonBuildConfig,
      build: {
        outDir: resolve(DIST_DIR, 'css'),
        emptyOutDir: true,
        cssMinify: true,
        rolldownOptions: {
          input: resolve(STYLES_DIR, 'main.less'),
          output: {
            assetFileNames: 'variables.css',
          }
        },
      },
    }
  }

  return baseConfig
})
