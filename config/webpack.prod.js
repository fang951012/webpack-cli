const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode:'production',
    devtool:'eval-source-map',
}

module.exports = merge(commonConfig,prodConfig);