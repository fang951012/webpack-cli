const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConfig = {
    mode:'production',
    devtool:'eval-source-map',
    // serviceWorker 服务器意外挂掉 页面依然能够输出
    plugins:[
        new WorkboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ],
    output:{
        publicPath:'',
        // 带hash值防止缓存
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js',
    }
}

module.exports = merge(commonConfig, prodConfig);