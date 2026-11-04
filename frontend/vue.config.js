const vueConfig = {
  chainWebpack(config) {
    config.plugin('copy').tap(args => {
      // 使用相对通配符，兼容项目路径包含括号的情况。
      args[0].patterns[0].globOptions.ignore.push('**/index.html')
      return args
    })
  },
  devServer: {
      port: 8020,
      proxy: {
          '/api': {
              target: 'http://localhost:8080/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api': '/'
              }
          }
      }
  }
}
module.exports = vueConfig
