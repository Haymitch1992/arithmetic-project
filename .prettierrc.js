module.exports = {
  "extends": [
  "airbnb",
  "prettier",
  "prettier/react",
  "javascript"
  ],
  "singleQuote": true, // 使用单引号
  "printWidth": 200, // 超过最大值换行
  "htmlWhitespaceSensitivity": "ignore",
  "semi": true, // 结尾不用分号
  "disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
  "htmlWhitespaceSensitivity": "ignore",
  "ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "parser": "babylon", // 格式化的解析器，默认是babylon
  "requireConfig": false, // Require a 'prettierconfig' to format prettier
  "pstylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
  "trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  "tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
 };