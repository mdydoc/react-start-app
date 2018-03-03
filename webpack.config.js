const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.ico$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            'public/resources',
            'public/*.*'
        ]),
        new CopyWebpackPlugin([
            {
                from: 'src/resources/images',
                to: 'resources/images'
            },
            {
                from: 'src/resources/fonts',
                to: 'resources/fonts'
            }
        ]),
        new UglifyJsPlugin({
            sourceMap: false
        }),
        new HtmlWebPackPlugin({
            title: 'React start app',
            favicon: 'src/favicon.ico',
            hash: true,
            template: "./src/index.html"
        })
    ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'bundle.min.js',
        publicPath: '/'
    }
};