const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "index.ts",
  mode: "production",
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
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
        test: /\.ttl/,
        use: "raw-loader",
        include: [path.resolve("tests")]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    mainFields: ["jsnext:main", "browser", "main"]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i,
      exclude: [/node_modules/]
    })
  ],
  bail: false,
  stats: "errors-only"
};