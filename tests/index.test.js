// Dependencies
// =============================================================================
const expect = require('chai').expect;


// Constants & Variables
// =============================================================================
const karmaConfig  = window.__karma__.config;
const pluginConfig = karmaConfig.fileFixtures || {};


// Suite
// =============================================================================
describe('karma-file-fixtures-preprocessor', function() {
    const baseDir    = karmaConfig.baseDir;
    const globalName = pluginConfig.globalName || '__FIXTURES__';
    const fixtures   = window[globalName];

    it(`adds a global window["${globalName}"] object`, function() {
        expect(fixtures).to.be.an('object');
    });

    it('strips base path from fixture object keys', function() {
        Object.keys(fixtures).forEach(key => {
            expect(key).to.not.have.string(baseDir);
        });
    });

    if (!pluginConfig.transformKey && !pluginConfig.transformContent) {
        it('generates fixtures matching file content', async function() {
            const filePaths = Object.keys(fixtures);

            for (const filePath of filePaths) {
                const fetchResponse = await fetch(`/base/${filePath}`);
                const fetchText     = await fetchResponse.text();
                const fixture       = fixtures[filePath];

                expect(fixture).to.equal(fetchText);
            }
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
