# Table

[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat)](https://www.npmjs.com/package/table)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

* [Features](#features)
* [Usage](#usage)
    * [Custom Border](#custom-border)
        * [Predefined Border Templates](#predefined-border-templates)
    * [Minimum Column Width](#minimum-column-width)
    * [Maximum Column Width](#maximum-column-width)
    * [Cell Content Alignment](#cell-content-alignment)

Produces a string that represents array data in a text table.

## Features

* Works with strings containing [fullwidth](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) characters.
* Works with strings containing [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).
* Custom border characters.
* Content alignment.
* Content padding.
* Column `minWidth`.
* Column `maxWidth`.
* Expanding long cell values into multiple rows.

## Usage

Table data is described using an array (rows) of array (cells).

```js
import table from 'table';

let data,
    output;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

/**
 * @typedef {String} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~configColumn
 * @property {String} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {Number} minWidth Minimum column width (default: 0).
 * @property {Number} maxWidth Maximum column width (default: Infinity).
 * @property {Number} paddingLeft Cell content padding width left (default: 0).
 * @property {Number} paddingRight Cell content padding width right (default: 0).
 */

/**
 * @typedef {Object} table~configBorder
 * @property {String} topBody
 * @property {String} topJoin
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} bottomBody
 * @property {String} bottomJoin
 * @property {String} bottomLeft
 * @property {String} bottomRight
 * @property {String} bodyLeft
 * @property {String} bodyRight
 * @property {String} bodyJoin
 * @property {String} joinBody
 * @property {String} joinLeft
 * @property {String} joinRight
 * @property {String} joinJoin
 */

/**
 * @typedef {Object} table~config
 * @property {table~configBorder}
 * @property {table~configColumn[]} column Column specific configuration.
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} rows
 * @param {table~config} config
 * @return {String}
 */
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

### Custom Border

`border` property describes the characters used to draw the table borders.

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
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

output = table(data, options);

console.log(output);
```

```
┌──┬──┬──┐
│0A│0B│0C│
├──┼──┼──┤
│1A│1B│1C│
├──┼──┼──┤
│2A│2B│2C│
└──┴──┴──┘
```

#### Predefined Border Templates

You can load one of the predefined border templates using `border` function.

```js
import table from 'table';

import {
    border
} from 'table';

let data;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

table(data, {
    border: border(`name of the template`)
});
```

```
# honeywell

╔══╤══╤══╗
║0A│0B│0C║
╟──┼──┼──╢
║1A│1B│1C║
╟──┼──┼──╢
║2A│2B│2C║
╚══╧══╧══╝

# norc

┌──┬──┬──┐
│0A│0B│0C│
├──┼──┼──┤
│1A│1B│1C│
├──┼──┼──┤
│2A│2B│2C│
└──┴──┴──┘
```

Raise [an issue](https://github.com/gajus/table/issues) if you'd like to contribute a new border template.

### Minimum Column Width

`minWidth` property pads the string to fill the cell.

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

`maxWidth` property makes the overflowing text break into multiple lines.

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

### Cell Content Alignment

`alignment` property controls content horizontal alignment within a cell.

Valid values are: "left", "right" and "center".

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
        0: {
            alignment: 'left',
            minWidth: 10
        },
        1: {
            alignment: 'center',
            minWidth: 10
        },
        2: {
            alignment: 'right',
            minWidth: 10
        }
    }
};

output = table(data, options);

console.log(output);
```

```
╔══════════╤══════════╤══════════╗
║0A        │    0B    │        0C║
╟──────────┼──────────┼──────────╢
║1A        │    1B    │        1C║
╟──────────┼──────────┼──────────╢
║2A        │    2B    │        2C║
╚══════════╧══════════╧══════════╝
```

### Padding Cell Content

`paddingLeft` and `paddingRight` properties control content padding within a cell. Property value represents a number of whitespaces using to pad the content.

```js
let data,
    output,
    options;

data = [
    ['0A', 'AABBCC', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

options = {
    column: {
        0: {
            paddingLeft: 3
        },
        1: {
            maxWidth: 2,
            paddingRight: 3
        }
    }
};

output = table(data, options);

console.log(output);
```

```
╔═════╤═════╤══╗
║   0A│AA   │0C║
║     │BB   │  ║
║     │CC   │  ║
╟─────┼─────┼──╢
║   1A│1B   │1C║
╟─────┼─────┼──╢
║   2A│2B   │2C║
╚═════╧═════╧══╝
```
