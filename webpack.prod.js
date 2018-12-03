const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve('src/styles/main.css'),
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
            }
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
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
            }
          ]
        }),
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.bundle.css'),
  ],
});
