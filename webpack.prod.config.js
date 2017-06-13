
const _ = require('lodash');
const webpack = require('webpack');

const devConfig = require('./webpack.config.js');

module.exports = _.merge(devConfig, {
  devtool: null,

  plugins: [
    ...devConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
    new webpack.optimize.DedupePlugin(),
  ],
});
