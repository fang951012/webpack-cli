// const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode:'development',
    // sourceMap 是一个映射关系，他知道dist目录下main.js文件错误对应开发目录文件下某一行的错误
    devtool:'cheap-module-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8080,
      proxy: {
          '/api': {
              target: 'http://www.filmshow.com.cn/mock/659', // 本地用yapi mock的数据
              pathRewrite: {"/api" : ""}, // 后台在转接的时候url中是没有 /api 的
              changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
              secure:false,//适配https
            },
      }
  },
    plugins:[
        // 热模块更新
        // new webpack.HotModuleReplacementPlugin()
    ],
    output:{
      publicPath:'',
      // 打包后的js域名
      // publicPath:'http://cdn.com/',
      filename:'[name].js',
  }
}
module.exports = merge(commonConfig,devConfig);