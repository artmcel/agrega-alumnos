const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'development',
    entry : {

        index: './src/index.js',
        //componentes : './src/js/componentes.js',
        //peticiones : './src/js/services/peticiones.js'

    },
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [ new CssMinimizerPlugin() ],
        minimize : true,
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ],
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        clean : true
    }

}

