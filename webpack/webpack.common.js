const webpack = require('webpack');
const { resolve } = require('./utils');
const pages = require('./webpack-pages')
const configs = require('./webpack-config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


// helpers:
// I want one rule for development and production, so I use `isDev` to check the process

module.exports = function webpackCommonFunc(env) {
  const config = configs[env];
  const isDev = env !== 'production';
    let entries = {};
    pages.forEach((pageItem) => {
        entries[pageItem.name] = pageItem.path;
    });


  const webpackConfig = {
    entry: entries,
    output: {
      path: resolve('dist'),
      publicPath: config.staticPath,
      filename: `js/${isDev ? '[name]' : '[name].[chunkhash:8]'}.js`,
      chunkFilename: `js/${isDev ? '[name]' : '[name].[chunkhash:8]'}.js`
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1,
                    priority: 10
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    chunks: 'all',
                    name: 'common',
                    minChunks: 3,
                    priority: 10
                }
            }
        },
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        chunkIds: 'deterministic',
    },

    module: {
      rules: [
        // js(x) & ts(x)
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
            }
          }
        },
        {
          test: /\.ejs$/,
          use: {
            loader: 'ejs-loader',
            options: {
              esModule: false
            }
          }
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: config.imgPath
              },
            },
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        // fonts
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: `fonts/[name].[contenthash][ext]`
          }
        },

        // images
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 1,
            },
          },
          generator: {
            filename: `images/[name].[contenthash][ext]`,
          },
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.STATIC_PATH': JSON.stringify(config.staticPath),
        'process.env.HOST': JSON.stringify(config.HOST)
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      ...pages.map(
        page =>
          new HtmlWebpackPlugin({
            template: page.template,
            filename: page.filename,
            chunks: ['runtime', 'vendor', 'common', page.name],
              hash: false,
              inject: 'body',
              xhtml: false,
              minify: {
                  removeComments: true,
              }
          })
      ),
      new MiniCssExtractPlugin({
        filename:  isDev ? '[name].css' : `css/[name].[contenthash].css`,
        chunkFilename: isDev ? '[id].css' : `css/[id].[contenthash:8].css`
      })
    ],

    resolve: {
      alias: {
        '@app': resolve('src/app/index.ts'),
        '@layout': resolve('src/layout/index.js'),
        '@modules': resolve('src/app/modules'),
        '@utils': resolve('src/utils'),
        '@less': resolve('src/assets/less'),
        '@locales': resolve('src/locales'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      fallback: {
        buffer: require.resolve('buffer/')
      },
    }
  };

  return webpackConfig;
}
