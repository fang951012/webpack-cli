const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode:'production',
    devtool:'eval-source-map',
    output:{
        publicPath:'',
        // 产线带hash值防止缓存
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js',
    }
}

module.exports = merge(commonConfig,prodConfig);