const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  devServer: {
    port: 8000,
    publicPath: 'http://localhost:8000',
    hot: true,
  },
});
