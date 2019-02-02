// Dependencies
// =============================================================================
const expect = require('chai').expect;


// Constants & Variables
// =============================================================================
const karmaConfig = window.__karma__.config;
const pluginConfig = karmaConfig.fileFixtures || {};


// Suite
// =============================================================================
describe('karma-file-fixtures-preprocessor', function() {
    const baseDir    = karmaConfig.baseDir;
    const globalName = pluginConfig.globalName || '__FIXTURES__';
    const fixtures   = window[globalName];

    // Option: globalName
    // -------------------------------------------------------------------------
    it(`adds a global window["${globalName}"] object`, function() {
        expect(fixtures).to.be.an('object');
    });

    // Option: stripBasePath
    // -------------------------------------------------------------------------
    if (pluginConfig.stripBasePath === false) {
        it('includes base path in fixture object keys', function() {
            Object.keys(fixtures).forEach(key => {
                expect(key).to.have.string(baseDir);
            });
        });
    }
    else {
        it('strips base path from fixture object keys', function() {
            Object.keys(fixtures).forEach(key => {
                expect(key).to.not.have.string(baseDir);
            });
        });
    }

    // Option: stripPrefix
    // -------------------------------------------------------------------------
    if (pluginConfig.stripPrefix) {
        it('strips prefix from fixture object keys', function() {
            Object.keys(fixtures).forEach(key => {
                expect(key).to.not.have.string('tests');
            });
        });
    }

    // Option: transformKey
    // -------------------------------------------------------------------------
    if (pluginConfig.transformKey) {
        it('transforms fixture object keys using transformKey()', function() {
            Object.keys(fixtures).forEach(key => {
                expect(key).to.have.string('transformKey');
            });
        });
    }

    // Option: transformContent
    // -------------------------------------------------------------------------
    if (pluginConfig.transformContent) {
        it('transforms fixture content using transformContent()', function() {
            Object.values(fixtures).forEach(value => {
                expect(value).to.have.string('transformContent');
            });
        });
    }
});
