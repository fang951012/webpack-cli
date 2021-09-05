const path = require('path')
//plugin 在webpack运行到某一时刻，帮你做一些事情
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
    mode:'development',
    // sourceMap 是一个映射关系，他知道dist目录下main.js文件错误对应开发目录文件下某一行的错误
    // TODO: 性能待优化,打包后会生成.map文件
    devtool:'source-map',
    entry:{
        main:'./src/index.js',
        // subMain:'./src/index.js'
    },
    // 本地开一个服务器方便调试
    // TODO:有Bug，暂时用nodejs
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
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
            // 打包图片url-loader 可以代替file-loader
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
                test:/\.scss$/,
                use:[
                'style-loader',
                {
                    loader:'css-loader',
                    options:{
                        importLoaders:2
                    }
                },
                'sass-loader',
                'postcss-loader',
                ]
            }]
    },
    plugins:[
        //打包结束后，自动生成html文件，并且吧生成的js自动引入到html中
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        // 打包前清理dist目录
        new CleanWebpackPlugin(),
        // 热模块更新
        // new webpack.HotModuleReplacementPlugin()
    ],
    output:{
        publicPath:'',
        // 打包后的js域名
        // publicPath:'http://cdn.com/',
        filename:'[name].js',
        //当前路径
        path:path.resolve(__dirname,'dist')
    }
}