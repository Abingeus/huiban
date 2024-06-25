const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')
module.exports = defineConfig({
    // devServer: {
    //   proxy: 'http://localhost:8080'
    // },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    client: {
      webSocketURL: 'ws://0.0.0.0/ws',
    },
    proxy: {
      '/api': {
        target: 'http://123.60.177.121:8080', // 后端服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
 
  chainWebpack:config =>{
    //发布模式
    config.when(process.env.NODE_ENV === 'production',config =>{
      config.entry('app').clear().add('./src/main-prod.js')
      
       config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
        })
   
    })
    //开发模式
    config.when(process.env.NODE_ENV === 'development',config =>{
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
        })
    })
  }
})
