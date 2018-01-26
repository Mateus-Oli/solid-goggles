/* eslint-disable */

const path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Injector',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      }
    ]
  }
};
