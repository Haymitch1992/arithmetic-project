'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {//代理api
        // target:"http://47.95.214.123:8080",// 测试服务器
        // target:"http://172.51.216.152:5001/",
        target:"http://192.168.61.193:8000",// 徐昊的服务器
        pathRewrite:{
          "^/api": ''
        },
        changeOrigin: true,//是否跨域
        ws: false, // proxy websockets
      },
      '/model': {//代理api
        target:"http://172.51.216.152:5001",// 测试服务器 王殿文本地
        pathRewrite:{
          "^/model": ''
        },
        changeOrigin: true,//是否跨域
        ws: false, // proxy websockets
      },
      '/debug': {//代理api
        target:"http://172.51.216.152:5001",// 测试服务器 王殿文本地
        pathRewrite:{
          "^/debug": ''
        },
        changeOrigin: true,//是否跨域
        ws: false, // proxy websockets
      },
    },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    host:'192.168.61.52',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
   // index: path.resolve(__dirname, '../docs/index.html'),
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // assetsRoot: path.resolve(__dirname, '../docs'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'DAG-diagram/static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
