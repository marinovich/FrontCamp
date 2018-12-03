const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  devServer: {
    port: 8000,
    publicPath: 'http://localhost:8000',
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve('src/styles/main.css'),
        ],
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
            },
          ]
        })
      },

      {
        test: /\.css$/,
        exclude: [
          path.resolve('src/styles/main.css'),
          /node_modules/,
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
            },
          ]
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.bundle.css'),
  ],
});
