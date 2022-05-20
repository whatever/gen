const webpack = require('webpack');
const path = require("path");

module.exports = {
  context: __dirname + "/src",
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'svv.im.bundled.min.js',
    libraryTarget: 'var',
    library: 'svv',
  },
  module: {
    rules: [
      {
        test: /\.(frag|vert)?$/,
        loader: 'raw-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ],
  },
  resolve: {
    alias: {
      three: path.resolve('./node_modules/three')   // <----- Addition
    },
    extensions: ['.ts', '.js']
  },
  externals: {
    "THREE": "THREE",
  },
  mode: "development",
};
