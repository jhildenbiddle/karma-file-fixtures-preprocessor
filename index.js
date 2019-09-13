/* eslint-disable no-var */

// Dependencies
// =============================================================================
var fs   = require('fs');
var path = require('path');
var util = require('util');


// Constants & Variables
// =============================================================================
var DEFAULTS = {
    globalName: '__FIXTURES__',
    stripPrefix: null,
    transformKey: function(path) {
        return path;
    },
    transformContent: function(path, content) {
        return content;
    }
};
var FILE_NAME = 'karma-file-fixtures.js';
var FILE_PATH = path.join(__dirname, FILE_NAME);


// Functions
// =============================================================================
function fileFixtures(args, config, logger, basePath) {
    var log      = logger.create('preprocessor.file-fixtures');
    var output   = '';
    var settings = Object.assign({}, DEFAULTS, config.fileFixtures);

    var CONFIG_FILE_PATTERNS = [].concat(config.files).map(item => item.pattern || item);
    var GLOBAL_VAR           = 'window.' + settings.globalName;

    // Add plugin-generated JavaScript as first included <script>
    config.files.unshift({
        pattern : FILE_PATH,
        included: true,
        served  : true,
        watched : true
    });

    // Add file paths associated with plugin to config.files array
    for (const key in config.preprocessors) {
        const isFileFixturePath = config.preprocessors[key].indexOf('file-fixtures') !== -1;
        const isInFilePatterns  = CONFIG_FILE_PATTERNS.indexOf(key);

        if (isFileFixturePath && !isInFilePatterns) {
            config.files.unshift({
                pattern : key,
                included: false,
                served  : false,
                watched : true
            });
        }
    }

    output += util.format('%s = %s || {};\n', GLOBAL_VAR, GLOBAL_VAR);

    return function(content, file, done) {
        var basePath = path.posix.normalize(config.basePath + '/');
        var filePath = file.originalPath
            .replace(basePath, '')
            .replace(settings.stripPrefix || '', '');

        filePath = settings.transformKey(filePath) || filePath;

        var key = util.format('%s[\'%s\']', GLOBAL_VAR, filePath);

        if (output.indexOf(key) === -1) {
            log.debug('Processing', file.originalPath);
            content = settings.transformContent(filePath, content) || content;
            content = content.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
            output += util.format('\n%s = \'%s\';\n', key, content);
            fs.writeFileSync(FILE_PATH, output);
        }

        done(content);
    };
}

fileFixtures.$inject = ['args', 'config', 'logger', 'config.basePath'];


// Init
// =============================================================================
fs.writeFileSync(FILE_PATH, '');


// Export
// =============================================================================
module.exports = {
    'preprocessor:file-fixtures': ['factory', fileFixtures]
};
