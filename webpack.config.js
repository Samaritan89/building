const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "../style/[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    index: './src/script/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/script')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractLess
  ],
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
};
