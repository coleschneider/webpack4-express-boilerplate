const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: [
      
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
              },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            template: 'src/index.html',
            
        }),

    ]

}