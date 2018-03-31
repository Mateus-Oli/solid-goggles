/* eslint-disable */

const { resolve } = require('path');

const config = (libraryTarget, filename, mode = 'production') => ({
  mode,
  entry: './src/index',
  output: {
    filename,
    path: resolve(__dirname, 'dist'),
    library: 'Sg',
    libraryTarget
  },
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
});

module.exports = [
  config('var', 'browser.js'),
  config('commonjs2', 'index.js')
];
