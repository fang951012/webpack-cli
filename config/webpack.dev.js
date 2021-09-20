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