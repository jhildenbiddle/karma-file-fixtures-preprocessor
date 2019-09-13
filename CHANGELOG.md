# Change Log

## 3.0.0

*2019-09-12*

- Fixed handling of end-of-line (EOL) control characters in files/fixtures. This
  change necessitates a major versoin bump as multi-line fixtures will differ
  from the previous version.
- Fixed warning message displayed when path specified in config.preprocessors
  is also specified in config.files

## 2.0.0

*2019-02-01*

- Added unit and CI tests.
- Removed the `stripBasePath` option for better cross-platform development. The
  base path is still removed from fixture keys, it is just no longer optional.
- Fixed file handling to allow specifying fixture paths only in the
  `preprocessors` section. Previously these files would also have to be included
  in the `files` section of a karma configuration.

## 1.0.2

*2019-02-01*

- Fixed removal of base path from fixture keys in Windows

## 1.0.1

*2019-01-08*

- Update README and keywords

## 1.0.0

*2019-01-03*

- Initial release
