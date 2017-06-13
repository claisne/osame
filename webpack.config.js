
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaderOptions = [
  'modules',
  'importLoaders=1',
  'localIdentName=[local]___[hash:base64:5]',
].join('&');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: './web/static/frontend/entry.js',
  output: {
    path: './priv/static/js',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',

        exclude: /node_modules/,

        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader',
                                          `css-loader?${cssLoaderOptions}!postcss-loader`),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('../css/bundle.css', {
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      { from: './web/static/vendor/js/', to: '../js/' },
      { from: './web/static/vendor/css/', to: '../css/' },
      { from: './web/static/assets', to: '..' },
    ]),
  ],

  postcss(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      precss,
      autoprefixer,
    ];
  },
};

