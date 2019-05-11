const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "index.ts",
  mode: "production",
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [path.resolve("node_modules")]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve("src"),
          path.resolve("integration-tests"),
        ],
        query: {
          presets: [ "env", "stage-0" ]
        },
      },
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    mainFields: ["jsnext:main", "browser", "main"]
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    })
  ],
  bail: false,
  stats: "errors-only"
};