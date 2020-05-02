const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getHtmlConfig(name) {
  return {
    title: name,
    template: `src/view/${name}.html`,
    filename: `view/${name}.html`,
    inject: true,
    hash: true,
    chunks: [name],
  };
}

const config = {
  mode: "development",
  entry: {
    index: "./src/page/index/index.js",
    login: "./src/page/login/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(getHtmlConfig("index")),
    new HtmlWebpackPlugin(getHtmlConfig("login")),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "../images"
            }
          }
        ]
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          priority: -20,
          minSize: 0,
        },
      },
    },
  },
  devServer: {
    contentBase: "./dist"
  }
};

module.exports = config;
