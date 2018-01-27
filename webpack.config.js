/* eslint-disable */

const path = require('path');

const config = (libraryTarget, filename = 'index.js') => ({
  entry: './src/index',
  output: {
    filename,
    path: path.resolve(__dirname, 'dist'),
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
  config('commonjs2')
];
