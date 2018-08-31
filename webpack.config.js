const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const argv = require('yargs').argv;
const clc = require('cli-color');

const env = argv.env ? argv.env : 'local';
const buildForProduction = env === 'prod';

const extractSass = new ExtractTextPlugin({
  filename: buildForProduction ? '[name].[contenthash].css' : '[name].css',
});

const plugins = [
  extractSass,
  new AssetsPlugin({
    filename: 'rev-manifest.json',
    path: path.join(__dirname, 'dist', 'public'),
    prettyPrint: true,
  }),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 8080,
    server: { baseDir: ['./dist/'] },
  }),
];

if (buildForProduction) {
  plugins.push(new UglifyJSPlugin());
  console.log(clc.redBright.bgGreenBright('This is a Production Version'));
  console.log(clc.red('Check env.js'));
}

module.exports = {
  entry: {
    app: './resources/js/index.js',
  },
  output: {
    filename: (buildForProduction ? '[name].[hash].js' : '[name].js'),
    publicPath: 'public',
    path: path.resolve(__dirname, 'dist/public'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                exclude: ['transform-es2015-classes'],
              }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: (buildForProduction ? 'compressed' : 'expanded'),
            },
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'raw-loader',
        }],
      },
    ],
  },
  plugins,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: 'node_modules/**',
  },
};
