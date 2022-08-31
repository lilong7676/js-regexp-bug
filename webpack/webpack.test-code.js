const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const rootPath = path.resolve(__dirname, "..");
const srcPath = path.resolve(rootPath, "src");

module.exports = {
  mode: "none",
  entry: {
    testCode: path.resolve(srcPath, "test-code-original.js"),
    "testCode.min": path.resolve(srcPath, "test-code-original.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(rootPath, "dist"),
    library: "testCode",
    libraryExport: "default", // 不添加的话,引用的时候需要 mylib.default
    libraryTarget: "umd",
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用压缩插件
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         [
      //           "@babel/preset-env",
      //           {
      //             useBuiltIns: "usage",
      //             corejs: "3",
      //             debug: true,
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // },
    ],
  },
};
