const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  //filename: "../style/[name].[contenthash].css",
  filename: "../style/index.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  watch: true,
  entry: {
    index: './src/script/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/script')
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'runtime']
    }),
    new UglifyJSPlugin()
  ],
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
};
