# Table

[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat)](https://www.npmjs.com/package/table)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

(This library is work in progress. The working library will be released in 2.0.0.)

* [Usage](#usage)
    * [Minimum Column Width](#minimum-column-width)
    * [Maximum Column Width](#maximum-column-width)
    * [Alignment](#alignment)

Formats data into a string table.

* Works with strings containing [fullwidth](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) characters.
* Works with strings containing [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).
* Supports `minWidth`, `maxWidth` properties per column.
* Supports expanding long cell values into multiple rows.

## Usage

Table data is described using an array of arrays.

```js
import table from 'table';

let data,
    output;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

output = table(data);

console.log(output);
```

```
╔══╤══╤══╗
║0A│0B│0C║
╟──┼──┼──╢
║1A│1B│1C║
╟──┼──┼──╢
║2A│2B│2C║
╚══╧══╧══╝
```

### Minimum Column Width

`minWidth` pads the string.

```js
let data,
    output,
    options;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

options = {
    column: {
        1: {
            minWidth: 10
        }
    }
};

output = table(data, options);

console.log(output);
```

```
╔══╤══════════╤══╗
║0A│0B        │0C║
╟──┼──────────┼──╢
║1A│1B        │1C║
╟──┼──────────┼──╢
║2A│2B        │2C║
╚══╧══════════╧══╝
```

### Maximum Column Width

`maxWidth` makes the overflowing text break into multiple lines.

```js
let data,
    output,
    options;

data = [
    ['0A', 'AAABBBCCC', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

options = {
    column: {
        1: {
            maxWidth: 3
        }
    }
};

output = table(data, options);

console.log(output);
```

```
╔══╤═══╤══╗
║0A│AAA│0C║
║  │BBB│  ║
║  │CCC│  ║
╟──┼───┼──╢
║1A│1B │1C║
╟──┼───┼──╢
║2A│2B │2C║
╚══╧═══╧══╝
```

### Alignment

```js
let data,
    output,
    options;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

options = {
    column: {
        1: {
            alignment: 'right',
            minWidth: 10
        }
    }
};

output = table(data, options);

console.log(output);
```

```
╔══╤══════════╤══╗
║0A│        0B│0C║
╟──┼──────────┼──╢
║1A│        1B│1C║
╟──┼──────────┼──╢
║2A│        2B│2C║
╚══╧══════════╧══╝
```
