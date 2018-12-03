const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.resolve('src')
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      },

      {
        test: /\.json/,
        loader: 'custom-json-loader'
      },
    ]
  },

  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },

  output: {
    path: path.resolve('build'),
    filename: 'index.bundle.js',
    chunkFilename: "[name].chunk.js"
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new webpack.HotModuleReplacementPlugin(),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
    })
  ]
};
