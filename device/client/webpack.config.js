/* eslint no-console: 0 */

const path = require('path');
const webpack = require('webpack');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');
const {
  argv,
} = require('yargs');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const local = require('./configuration/local');
const integration = require('./configuration/integration');
const production = require('./configuration/production');

const applicationVersion = 'v0.0.0';
const isAnalyzing = false;

const configurations = {
  local,
  integration,
  production,
};

module.exports = {

  entry: [
    'babel-polyfill', './application/application.js',
  ],

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../iro/data'),
  },

  devServer: {
    contentBase: '../iro/data',
    disableHostCheck: true,
    inline: true,
  },

  module: {
    loaders: [
      {
        test: /pdfkit|png-js|unicode-properties|fontkit|brotli/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=.*?)?$/,
        loader: 'url-loader?limit=1000000',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
      },
      {
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        test: /\.scss$/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        loader: 'html-loader',
        test: /\.html$/,
        exclude: /node_modules/,
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /__([a-zA-Z0-9.]*?)__/ig,
              replacement(match, token) {
                // console.log(token);
                return `{{'${token}' | translate}}`;
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: ((args) => {
    const env = args.env || 'local';

    console.log(`You are currently building the project for ${env} environment...`);

    const plugins = [
      // As we can only stream one file at a time to our device, fewer files are better ^_^ !
      /* new webpack.optimize.CommonsChunkPlugin({
          name: 'commons',
          filename: 'commons.js',
          minChunks: 2
      }), */
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        CONFIGURATION: JSON.stringify(configurations[env]),
        VERSION: JSON.stringify(applicationVersion),
      }),
      new StringReplacePlugin(),
      new HtmlWebPackPlugin({
        template: 'index.ejs',
      }),
    ];

    if (isAnalyzing) {
      const analyser = new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      });
      plugins.push(analyser);
    }

    if (env === 'production' || env === 'integration') {
      const optimizer = new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: true,
        compress: {
          warnings: false,
        },
      });
      plugins.push(optimizer);
    }

    return plugins;
  })(argv),

};
