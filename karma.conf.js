// Dependencies
// =============================================================================
const fileFixturesPreprocessor = require('./index');


// Constants & Variables
// =============================================================================
const files = {
    fixtures: './tests/fixtures/**/*',
    test    : './tests/**/*.test.js'
};


// Settings
// =============================================================================
const settings = {
    browsers: [
        'ChromeHeadless'
    ],
    client: {
        baseDir: process.cwd()
    },
    files: [
        files.test
    ],
    plugins: [
        'karma-*',
        fileFixturesPreprocessor
    ],
    preprocessors: {
        [files.fixtures]: ['file-fixtures'],
        [files.test]    : ['eslint', 'webpack']
    },
    frameworks: ['mocha', 'chai'],
    reporters : ['mocha'],
    webpack: {
        mode: 'development'
    },
    webpackMiddleware: {
        // https://webpack.js.org/configuration/stats/
        stats: 'minimal'
    },
    mochaReporter: {
        // https://www.npmjs.com/package/karma-mocha-reporter
        output: 'autowatch'
    },
    autoWatch: false,
    singleRun: true,
    logLevel : 'WARN' // OFF, ERROR, WARN, INFO, DEBUG
};


// Export
// =============================================================================
module.exports = function(config) {
    const isCustom = Boolean(process.argv.indexOf('--usepluginoptions') > -1);

    // Custom plugin configuration
    if (isCustom) {
        settings.fileFixtures = {
            globalName   : '__TEXT_FIXTURES__',
            stripBasePath: false,
            stripPrefix  : 'tests/fixtures/',
            stripNewLineChars: true,
            transformKey(path) {
                return path + '-transformKey';
            },
            transformContent(path, content) {
                return content + '-transformContent';
            }
        };

        // Allow config settings to be accessed in tests via __karma__.config
        settings.client = Object.assign({}, settings.client, {
            fileFixtures: Object.assign({}, settings.fileFixtures, {
                // Functions are not accessible from __karma__.config.client, so
                // these keys indicate that callback functions were defined in
                // config used by Karma.
                transformKey    : true,
                transformContent: true
            })
        });
    }

    config.set(settings);
};
