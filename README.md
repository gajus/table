# Table

[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat)](https://www.npmjs.com/package/table)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

(This library is work in progress. The working library will be released in 2.0.0.)

Formats data into a string table.

* Works with strings containing [fullwidth](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) characters.
* Works with strings containing [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).
* Supports `minWidth`, `maxWidth` properties per column.
* Supports expanding long cell values into multiple rows.

## Usage

### Basic Table

Table data is described using an array of arrays.

```js
let table = require('table'),
    data;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

console.log(table(data));
```
