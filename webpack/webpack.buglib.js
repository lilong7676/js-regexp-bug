const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');

module.exports = {
  mode: 'production',
  entry: {
    buglib: path.resolve(srcPath, 'buglib.js'),
    'buglib.min': path.resolve(srcPath, 'buglib.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(srcPath, 'buglibDist'),
    library: 'buglib',
    libraryExport: 'default', // 不添加的话,引用的时候需要 buglib.default
    libraryTarget: 'umd',
  },
  plugins: [
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用压缩插件
        include: /\.min\.js$/
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      android: "4",
                      chrome: "30",
                      firefox: "30",
                      ie: "9",
                      ios: "6",
                      safari: "7",
                    },
                    modules: false,
                    loose: true,
                    // turn off core-js polyfill
                    useBuiltIns: false,
                    corejs: 3,
                    debug: true,
                    include: ["es.string.*", "es.regexp.*"],
                  },
                ],
              ],
            },
          },
      },
    ]
  }
}
