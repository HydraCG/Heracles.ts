module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "sinon", "jasmine-sinon", "source-map-support", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts", included: true },
            { pattern: "testing/**/*.ts", included: true },
            { pattern: "tests/**/*.spec.ts", included: true },
            { pattern: "integration-tests/**/*.spec.ts", included: true }
        ],
        exclude: [
            "jsonld-request",
            "server"
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },
        karmaTypescriptConfig: {
            tsconfig: "tsconfig.json",
            coverageOptions: {
                instrumentation: false
            },
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                exclude: [
                    "jsonld-request",
                    "pkginfo"
                ]
            }
        },
        reporters: ["progress", "karma-typescript"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false,
        concurrency: Infinity
    })
};
