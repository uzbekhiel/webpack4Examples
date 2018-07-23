const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry : './src/app.js',
    output:{
        filename: 'main.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: './public',
        port: 9000
    },
    optimization: {
        minimizer: [
            new uglifyJsPlugin({ cache:true, parallel:true }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins : [
        new MiniExtractCssPlugin({filename: 'style.css' })
    ],
    module:{
        rules:[{
            test: /\.s?[ac]ss$/,
            use : [
                MiniExtractCssPlugin.loader,
                //"style-loader",
                "css-loader",
                "sass-loader"
            ]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use:[
                'file-loader'
            ]
        }]
    }
}