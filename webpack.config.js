const webpack = require('webpack');

var path = require('path');
// var vue = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //将你的行内样式提取到单独的css文件里
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝

var configReq = require('./config.js'); //读取配置

var config = {
    devtool: 'eval-source-map',
    entry: configReq.entry, //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "js/[name]-[hash].js" //打包后输出文件的文件名
    },
    //服务器
    devServer: {
        contentBase: "./", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                fallback: 'vue-style-loader',
                                use: 'css-loader'
                            })
                        }
                    }
                }
            },
            
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '../img/[name].[ext]?' //输出目录以及名称
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },


        ]
    },
   
    plugins: [
        new webpack.ProvidePlugin({ //全局配置加载
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("css/[name].[hash:6].css"), //提取CSS行内样式，转化为link引入

        new webpack.optimize.UglifyJsPlugin({ // js压缩  webpack内置
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
                from: __dirname + '/app/img',
                to: __dirname + '/dist/img'
            } //拷贝图片
        ])
    ],
    externals: {
        $: 'jQuery'
    },
}

module.exports = config;
//生成模版文件
configReq.htmlConfig.forEach((val, i) => {
    var hcoging = {
        template: __dirname + "/app/" + val.name + ".html", //new 一个这个插件的实例，并传入相关的参数
        filename: __dirname + "/dist/" + val.name + ".html",
        chunks: [val.name],
        title: val.title,
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    }
    config.plugins.push(new HtmlWebpackPlugin(hcoging));
})