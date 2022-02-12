const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    compress: true,
    port: 9000,
  },
});
