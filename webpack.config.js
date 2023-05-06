/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    filename: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: '[name].[ext]',
    clean: true,
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  resolve: {
    extensions: ['.ts', '.js', '.handlebars'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  resolveLoader: {
    modules: ['node_modules'],
    alias: {
      hbs: 'handlebars-loader',
    },
  },
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
      {
        test: /\.(jpg|svg|png|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Handlebars: 'handlebars',
    }),
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      title: 'karamba web page',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};
