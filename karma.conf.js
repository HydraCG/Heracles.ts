module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "sinon", "jasmine-sinon", "source-map-support", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts", included: true },
            { pattern: "testing/**/*.ts", included: true },
            { pattern: "tests/**/*.spec.ts", included: true }
        ],
        exclude: [
            "jsonld-request"
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
        browsers: (process.env.TRAVIS) ? ['Chrome_travis_ci'] : ["Chrome"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        singleRun: false,
        concurrency: Infinity
    })
};
