const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.ts$/,
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
        type: 'javascript/auto',
        test: /\.json/,
        use: [
          'custom-json-loader',
          'file-loader',
        ]
      }
    ]
  },

  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.ts', '.js', '.json']
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },

  output: {
    path: path.resolve('build'),
    filename: 'index.bundle.js',
    chunkFilename: "[name].chunk.js"
  },

  devServer: {
    contentBase: path.resolve('build'),
    port: 8000,
    publicPath: 'http://localhost:8000',
    hot: true
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new webpack.HotModuleReplacementPlugin(),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),

    new ExtractTextPlugin('styles.bundle.css'),

    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true
    })
  ]
};
