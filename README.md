# karma-file-fixtures-preprocessor

[![NPM](https://img.shields.io/npm/v/karma-file-fixtures-preprocessor.svg?style=flat-square)](https://www.npmjs.com/package/karma-file-fixtures-preprocessor)
[![Codacy](https://img.shields.io/codacy/grade/0721e159e25c414ca670ce93ac5709c9.svg?style=flat-square)](https://www.codacy.com/app/jhildenbiddle/karma-file-fixtures-preprocessor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jhildenbiddle/karma-file-fixtures-preprocessor&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/blob/master/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fkarma-file-fixtures-preprocessor&hashtags=developers,frontend,javascript,karma)

A Karma plugin that stores file content as a global object.

---

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)

---

## Installation

```bash
npm install karma-file-fixtures-preprocessor --save-dev
```

## Usage

Given the following directory structure:

```
app
├── tests
│   ├── fixtures
│   │   ├── fixture.css
│   │   ├── fixture.html
│   │   ├── fixture.js
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

Karma will load the specified fixture files and store each file's content within a global object accessible to all test files:

```javascript
// app.test.js
console.log(window.__FIXTURES__);
```

```javascript
// Output
{
  "tests/fixtures/fixture.css" = 'p { color: red; }',
  "tests/fixtures/fixture.html" = '<p>Hello World!</p>',
  "tests/fixtures/fixture.js" = 'var a = 1;',
  "tests/fixtures/fixture.json" = '{ "a": 1 }',
  "tests/fixtures/fixture.txt" = 'Hello World'
}
```

Fixtures can be accessed using their file path as an object key, then injected or parsed as needed:

```javascript
// app.test.js
var htmlFixture = window.__FIXTURES__['tests/fixtures/fixture.html'];
var jsonFixture = JSON.parse(window.__FIXTURES__['tests/fixtures/fixture.json']);

before(function() {
  // Inject HTML Fixture
  document.body.insertAdjacentHTML('beforeend', htmlFixture);

  console.log(document.querySelector('p').textContent);
  console.log(jsonFixture);
});
```

```javascript
// Output
"Hello World!"

{
  "a" = 1
}
```

## Options

* [globalName](#optionsglobalname)
* [stripBasePath](#optionsstripbasepath)
* [stripPrefix](#optionsstripprefix)
* [transformKey](#optionstransformkey)
* [transformContent](#optionstransformcontent)

### options.globalName

* Type: `string`
* Default: `'__FIXTURES__'`

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

### options.stripBasePath

* Type: `boolean`
* Default: `true`

Removes the base path from each fixture key.

When `true`, the file path used for each fixture key will be relative to the directory containing your `karma.conf.js` file. When `false`, the absolute file path will be used for each the fixture key.

**Example**

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // ...
    fileFixtures: {
      stripBasePath: true // default
    }
  });
};
```

### options.stripPrefix

* Type: `string`
* Default: `null`

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

### options.transformKey

* Type: `function`
* Arguments:
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

### options.transformContent

* Type: `function`
* Arguments:
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

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor) or ❤️ [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fkarma-file-fixtures-preprocessor&hashtags=css,developers,frontend,javascript) to support the project!

## License

This project is licensed under the MIT License. See the [MIT LICENSE](https://github.com/jhildenbiddle/karma-file-fixtures-preprocessor/blob/master/LICENSE) for details.

Copyright (c) 2019 John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
