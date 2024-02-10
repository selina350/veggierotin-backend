const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({ path: "../.env" });
const webpack = require("webpack");

console.log("process.env.MOCK_API", process.env.MOCK_API);
const isMockAPIEnabled = process.env.MOCK_API === "true";

module.exports = {
  mode: "development",
  entry: {
    main: ["./index.js", ...(isMockAPIEnabled ? ["./mockApi/index.js"] : [])],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
      },
    },
  },
};
