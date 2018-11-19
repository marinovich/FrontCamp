const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|png)$/,
        use: [{
          loader: 'url-loader',
          options: { 
              limit: 8192, // Convert images < 8kb to base64 strings
              name: 'images/[name].[ext]'
          } 
        }]
      },
    ]
  },

  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.ts', '.js', '.json']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'build/'),
    port: 8000,
    publicPath: 'http://localhost:8000/build/',
    hot: true
  },

  plugins: [
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
