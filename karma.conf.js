const path = require("path");
const webpackConfig = require("./webpack.config");
const autoWatch = process.env.npm_lifecycle_script.indexOf("--auto-watch") !== -1;
delete webpackConfig.entry;
webpackConfig.node = { fs: "empty" };
webpackConfig.mode = "development";
if (!autoWatch) {
  webpackConfig.module.rules.push({
    test: /\.ts$/,
    include: [path.resolve("src")],
    enforce: "post",
    use: {
      loader: "istanbul-instrumenter-loader",
      options: { esModules: true }
    }
  });
}

module.exports = function(config) {
  const settings = {
    basePath: "",
    plugins: ["karma-*", require("./integration-tests/server/server")],
    frameworks: ["jasmine", "sinon", "jasmine-sinon", "source-map-support", "hydra-testserver"],
    files: [
      { pattern: "src/**/*.ts", included: true },
      { pattern: "tests/**/*.spec.ts", included: true },
      { pattern: "integration-tests/**/*.spec.ts", included: true }
    ],
    exclude: ["jsonld-request", "server"],
    preprocessors: {
      "testing/**/*.ts": ["webpack", "sourcemap"],
      "tests/**/*.ts": ["webpack", "sourcemap"],
      "integration-tests/**/*.ts": ["webpack", "sourcemap"],
      "src/**/*.ts": ["webpack", "sourcemap"]
    },
    mime: { "text/x-typescript": ["ts"] },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.TRAVIS ? ["Chrome_travis_ci"] : ["Chrome"],
    customLaunchers: {
      Chrome_travis_ci: {
        base: "Chrome",
        flags: ["--no-sandbox"]
      }
    },
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig
  };
  if (!autoWatch) {
    settings.reporters.push("coverage-istanbul");
    settings.coverageIstanbulReporter = {
      reports: [ "html", "lcovonly", "text-summary" ],
        dir: path.join(__dirname, "coverage"),
        combineBrowserReports: true,
        fixWebpackSourcePaths: true,
        "report-config": {
        html: { outdir: "html" }
      }
    };
  }

  config.set(settings);
};
