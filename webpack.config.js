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
    result: "./src/page/result/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, "src/util/"),
      page: path.resolve(__dirname, "src/page/"),
      service: path.resolve(__dirname, "src/service/"),
      images: path.resolve(__dirname, "src/images/"),
      node_modules: path.resolve(__dirname, "node_modules/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(getHtmlConfig("index")),
    new HtmlWebpackPlugin(getHtmlConfig("login")),
    new HtmlWebpackPlugin(getHtmlConfig("result")),
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
        test: /\.(gif|png|jpg|svg|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "../images",
            },
          },
        ],
      },
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.string/,
        use: {
          loader: "html-loader",
        },
      },
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
    contentBase: "./dist",
    openPage: "view/index.html",
    proxy: {
      "/api": {
        target: "http://happymmall.com",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
};

module.exports = config;
