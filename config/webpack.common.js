const path = require('path')
//plugin 在webpack运行到某一时刻，帮你做一些事情
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");



module.exports = {
    entry:{
        main:'./src/index.js'
    },
    module:{
        rules:[
            // babel文档 打包后es6转es5 https://www.babeljs.cn/setup#installation
            {
                test: /\.m?js$/,
                // 第三方代码没必要es6转es5
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                //   后面配置的属性可能过多，放到根目录 .babelrc
                //   options: {
                //     presets: [['@babel/preset-env'],{
                //         // 这里可以配置一些属性值 参考babel官方文档
                //     }]
                //   }
                }
            },
            // 打包图片url-loader
            {
                test:/\.(jpg|png|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        // placeholder 占位符
                        name:'[name]_[hash].[ext]',
                        // 打包后路径
                        outputPath:'images/',
                        // 图片大小小于2kb，变成base64字符串
                        limit:2048
                    }
                }
            },{
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            // 用于svg和iconfont
            {
                test:/\.(eot|ttf|svg)$/,
                use:{
                    loader:'file-loader'
                }
            }]
    },
    plugins:[
        //打包结束后，自动生成html文件，并且吧生成的js自动引入到html中
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        // 打包前清理dist目录
        new CleanWebpackPlugin({
            root: '../dist/*'
        }),
        // 热模块更新
        // new webpack.HotModuleReplacementPlugin()
        // 打包生成css文件 https://webpack.docschina.org/plugins/mini-css-extract-plugin/
        //TODO: 生成的css待压缩
        new MiniCssExtractPlugin({
        })
    ],
    optimization:{
        // Tree Sharking消除无用的js代码 只支持ES Module 在package.json配置sideEffects
        usedExports:true,
        //代码分割 引入js插件打包生成一个文件 提升性能
        // https://webpack.docschina.org/plugins/split-chunks-plugin/
        splitChunks:{
            chunks: 'all',
            cacheGroups: {
              styles: {
                name: "style",
                type: "css/mini-extract",
                chunks: "all",
                enforce: true,
              },
            },
        },
        // css压缩
        minimizer: [
            new CssMinimizerPlugin(),
          ],
        //   在测试环境使用
        minimize: true,
    },
    
    output:{
        publicPath:'',
        // 打包后的js域名
        // publicPath:'http://cdn.com/',
        filename:'[name].js',
        //当前路径
        path:path.resolve(__dirname,'../dist')
    }
}