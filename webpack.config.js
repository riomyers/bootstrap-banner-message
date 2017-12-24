const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // entry: ['./src/bannerMessages.es6', './src/bannerMessages.scss'],
    entry: './src/bannerMessages.es6',
    output: {
        filename: 'bannerMessage.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget:'var',
        library:'BannerMessages'
    },
    plugins: [
        // new MinifyPlugin(),
        new CleanWebpackPlugin([path.join(__dirname, "dist")]),
        new HtmlWebpackPlugin({
            title: 'Development',
            inject: 'head',
            template: path.join(__dirname, path.join("src", "index.html"))
        }),
        new ExtractTextPlugin({
            filename: 'bannerMessage.css',
            allChunks: true,
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /(\.es6|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    externals: {
        jquery: 'jQuery'
    }
}
