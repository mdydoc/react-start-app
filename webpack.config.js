const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractTextPluginOptions = {
    publicPath: Array(`css/[name].[contenthash:8].css`.split('/').length).join('../')
};

module.exports = (env, options) => {
    return {
        bail: true,
        entry: [
            'babel-polyfill',
            './src/index.js'
        ],
        devServer: {
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'resources/[name].[hash:8].[ext]'
                            }
                        },
                        {
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loader: "babel-loader",
                            options: {
                                compact: true
                            }
                        },
                        {
                            test: /\.s?css$/,
                            loader: ExtractTextPlugin.extract(
                                Object.assign(
                                    {
                                        fallback: {
                                            loader: 'style-loader',
                                            options: {
                                                hmr: false
                                            }
                                        },
                                        use: [
                                            {
                                                loader: 'css-loader',
                                                options: {
                                                    importLoaders: 1,
                                                    minimize: true,
                                                    sourceMap: options.mode === 'production'
                                                }
                                            },
                                            {
                                                loader: "sass-loader"
                                            },
                                            {
                                                loader: 'postcss-loader',
                                                options: {
                                                    ident: 'postcss',
                                                    plugins: () => [
                                                        require('postcss-flexbugs-fixes'),
                                                        autoprefixer({
                                                            browsers: [
                                                                '>1%',
                                                                'last 4 versions',
                                                                'Firefox ESR',
                                                                'not ie < 9'
                                                            ],
                                                            flexbox: 'no-2009'
                                                        })
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    extractTextPluginOptions
                                )
                            )
                        },
                        {
                            test: /\.html$/,
                            use: [
                                {
                                    loader: "html-loader",
                                    options: {minimize: true}
                                }
                            ]
                        },
                        {
                            loader: 'file-loader',
                            exclude: [/\.jsx?$/, /\.s?css$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'resources/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([
                'public/resources',
                'public/css',
                'public/js',
                'public/*.*'
            ], {
                exclude: ['.htaccess']
            }),
            new HtmlWebPackPlugin({
                title: 'React start app',
                favicon: 'src/favicon.ico',
                hash: true,
                template: "./src/index.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }),
            new UglifyJsPlugin({
                sourceMap: options.mode === 'production'
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].[contenthash:8].css'
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json'
            })
        ],
        output: {
            path: path.resolve(__dirname, "public"),
            filename: 'js/[name].[chunkhash:8].js',
            chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
            publicPath: '/'
        }
    };
};