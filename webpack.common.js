const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
// deprecate for wp5 const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// dev mode to load css, extract-css plugin and style-loader NEVER together...
//const webpack = require("webpack");
//const devMode = process.env.NODE_ENV !== "production";

/**
 * load plugins as a array
 */

const plugins = [
    new HtmlWebPackPlugin(
        {
            template: './src/index.html',
            filename: './index.html',
            chunks : ['index']
        },
    
    ),
    new HtmlWebPackPlugin(
        {
            template: './src/listado.html',
            filename: './listado.html',
            chunks : ['listado']
        }
    )
];

/*
if(devMode) {
    // only enable hot in development
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
*/


module.exports = {
    plugins,
    entry : {

        index: './src/index.js',
        listado: './src/js/listado.js' 

    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false 
                        }
                    }
                ]
            },
            {
                test : /\.(png|svg|jpe?g|gif|ico)$/,
                type : 'asset/resource',
                generator : {
                    filename : 'assets/img/[name][ext]'
                }

            }
            
        ]
    },
    output: {
        filename: '[name][contenthash].min.js',
        clean : true
    }   
    
    
    
    
}