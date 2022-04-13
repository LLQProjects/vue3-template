module.exports = {
  extends: ['alloy', 'alloy/vue', 'alloy/typescript'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 设置 js 的解析器为 babel-eslint
    // https://github.com/mysticatea/vue-eslint-parser#-options
    // parser: '@babel/eslint-parser',
    parser: '@typescript-eslint/parser'
  },
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
    /**
     * html标签自闭问题
     */
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'never',
          void: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    /**
     * 限制组件名的风格
     */
    'vue/component-name-in-template-casing': ['error', 'kebab-case']
  }
}
