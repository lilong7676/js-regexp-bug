const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const rootPath = path.resolve(__dirname, "..");
const srcPath = path.resolve(rootPath, "src");

module.exports = {
  entry: {
    app: path.resolve(srcPath, "index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(rootPath, "dist"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, "public/index.html"),
      filename: path.resolve(rootPath, "dist/index.html"),
      alwaysWriteToDisk: true,
      chunks: ["app"],
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split("/")
              .reduceRight((item) => item);
            const allChunksName = chunks.map((item) => item.name).join("~");
            return `${cacheGroupKey}-${allChunksName}-${moduleFileName}`;
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|buglib/,
        use: {
          loader: "babel-loader",
          options: {
          },
        },
      },
    ],
  },
};
