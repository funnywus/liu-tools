const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/liu-tools',
  outputDir: './dist',
  assetsDir: 'static',
  lintOnSave: false,
  // sourceMap资源映射文件，存的是打包前后的代码位置，方便开发使用，这个占用相当一部分空间。
  productionSourceMap: false,
})
