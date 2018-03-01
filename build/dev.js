const webpack = require('webpack');
const path = require("path");

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '\'development\''
    })
];

module.exports = {
    entry: [
        'babel-polyfill',
        'babel-regenerator-runtime',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "dev"),
        filename: 'bundle.js'
    },
    devServer: {
        overlay: true
    },
    stats: {
        colors: true,
        modules: false,
        reasons: false,
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.s?css$/,
                loader: 'style-loader!css-loader!sass-loader'
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
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: plugins
};