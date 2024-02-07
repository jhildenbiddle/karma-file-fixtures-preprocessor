# karma-file-fixtures-preprocessor <!-- omit in toc -->

[![NPM](https://img.shields.io/npm/v/karma-file-fixtures-preprocessor.svg?style=flat-square)](https://www.npmjs.com/package/karma-file-fixtures-preprocessor)
[![GitHub Workflow Status (master)](https://img.shields.io/github/actions/workflow/status/jhildenbiddle/karma-file-fixtures-preprocessor/test.yml?branch=master&label=checks&style=flat-square)](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/actions?query=branch%3Amaster+)
[![Codacy](https://img.shields.io/codacy/grade/566f77fd4e5c4aa1b70c2279d32243d0/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/karma-file-fixtures-preprocessor/dashboard?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/blob/master/LICENSE)
[![Sponsor this project](https://img.shields.io/static/v1?style=flat-square&label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jhildenbiddle)

A Karma plugin that makes file content accessible within test environments.

## Installation

```bash
npm install karma-file-fixtures-preprocessor --save-dev
```

## Usage

Given the following directory structure:

<!-- markdownlint-disable-next-line MD040 -->
```
app
├── tests
│   ├── fixtures
│   │   ├── fixture.css
│   │   ├── fixture.html
│   │   ├── fixture.json
│   │   └── fixture.txt
│   └── app.test.js
├── karma.conf.js
└── package.json
```

Specify fixture files using Karma's [`preprocessors`](http://karma-runner.github.io/3.0/config/preprocessors.html) configuration and plugin [options](#options) as a `fileFixtures` object:

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // ...
    files: [
      'app/tests/*.test.js'
    ],
    preprocessors: {
      'app/tests/fixtures/*': ['file-fixtures']
    },
    fileFixtures: {
      // Options...
    }
  });
};
```

Fixture content is stored as a global object accessible in your test environment:

```javascript
// app.test.js
console.log(window.__FIXTURES__);
```

```javascript
// Output
{
  "tests/fixtures/fixture.css": "body { color: red; }",
  "tests/fixtures/fixture.html": "<p>Hello</p>",
  "tests/fixtures/fixture.json": "{ \"a\": 1 }",
  "tests/fixtures/fixture.txt": "Some Text"
}
```

Fixtures can be used directly in test assertions:

```javascript
var assert = require('assert');
var txt = window.__FIXTURES__['tests/fixtures/fixture.txt'];

// Assertion
assert.strictEqual(txt, 'Some Text', 'Text content matches!');
```

Or injected, parsed, and modified as needed:

```javascript
var css  = window.__FIXTURES__['tests/fixtures/fixture.css'];
var html = window.__FIXTURES__['tests/fixtures/fixture.html'];
var json = window.__FIXTURES__['tests/fixtures/fixture.json'];

// Injecting / Parsing
before(function() {
  // Inject CSS
  document.body.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
  console.log(getComputedStyle(document.body).color);

  // Inject HTML
  document.body.insertAdjacentHTML('beforeend', html);
  console.log(document.querySelector('p').textContent);

  // Parse JSON
  json = JSON.parse(json);
  console.log(json.a);
});
```

```javascript
// Output
"rgb(255, 0, 0)"
"Hello"
1
```

## Options

### globalName <!-- omit in toc -->

- Type: `string`
- Default: `'__FIXTURES__'`

Sets the name of the global fixtures object.

**Example**

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // ...
    fileFixtures: {
      globalName: '__FIXTURES__' // default
    }
  });
};
```

### stripPrefix <!-- omit in toc -->

- Type: `string`
- Default: `null`

Removes the specified string from each fixture key.

**Example**

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // ...
    fileFixtures: {
      stripPrefix: null // default
    }
  });
};
```

### transformKey <!-- omit in toc -->

- Type: `function`
- Arguments:
  1. **path**: The path of the current fixture file

Callback after each fixture file is loaded. Allows modifying the object key used to access the file content in the global fixtures object.

**Example**

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    fileFixtures: {
      transformKey: function(path) {
        return path;
      },
    }
  });
};
```

### transformContent <!-- omit in toc -->

- Type: `function`
- Arguments:
  1. **path**: The path of the current fixture file
  1. **content**: The text content of the current fixture file

Callback after each fixture file is loaded. Allows modifying the file content stored in the global fixtures object.

**Example**

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    fileFixtures: {
      transformContent: function(path, content) {
        return content;
      }
    }
  });
};
```

## Sponsorship

A [sponsorship](https://github.com/sponsors/jhildenbiddle) is more than just a way to show appreciation for the open-source authors and projects we rely on; it can be the spark that ignites the next big idea, the inspiration to create something new, and the motivation to share so that others may benefit.

If you benefit from this project, please consider lending your support and encouraging future efforts by [becoming a sponsor](https://github.com/sponsors/jhildenbiddle).

Thank you! 🙏🏻

## Contact & Support

- Follow 👨🏻‍💻 **@jhildenbiddle** on [Twitter](https://twitter.com/jhildenbiddle) and [GitHub](https://github.com/jhildenbiddle) for announcements
- Create a 💬 [GitHub issue](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/issues) for bug reports, feature requests, or questions
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor) and 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fkarma-file-fixtures-preprocessor&hashtags=karma,developers,frontend,javascript) to promote the project
- Become a 💖 [sponsor](https://github.com/sponsors/jhildenbiddle) to support the project and future efforts

## License

This project is licensed under the MIT License. See the [MIT LICENSE](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
