const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin(['public'], {
        root: `${__dirname}/../`
    }),
    new UglifyJsPlugin({
        sourceMap: false
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
        title: 'React start app',
        favicon: 'dev/favicon.ico',
        hash: true,
        template: 'build/index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '\'production\''
    }),
    new CopyWebpackPlugin([
        {
            from: 'src/resources/images',
            to: 'resources/images'
        },
        {
            from: 'src/resources/fonts',
            to: 'resources/fonts'
        }
    ])
];

module.exports = {
    entry: [
        'babel-polyfill',
        'babel-regenerator-runtime',
        './src/index.js'
    ],
    output: {
        path: `${__dirname}/../public`,
        filename: 'bundle.min.js',
        publicPath: '/'
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
                loader: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.s?css$/,
                loader: [
                    'css-loader',
                    'sass-loader'
                ]
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
    plugins: plugins
};