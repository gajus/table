# Table

[![Travis build status](http://img.shields.io/travis/gajus/table/master.svg?style=flat)](https://travis-ci.org/gajus/table)
[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat)](https://www.npmjs.com/package/table)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

{"gitdown": "contents"}

Produces a string that represents array data in a text table.

![Demo of table displaying a list of missions to the Moon.](./.README/demo.png)

## Features

* Works with strings containing [fullwidth](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) characters.
* Works with strings containing [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).
* Configurable border characters.
* Configurable content alignment per column.
* Configurable content padding per column.
* Configurable column width.
* Text wrapping.

{"gitdown": "include", "file": "./usage.md"}

{"gitdown": "include", "file": "./usage/cell_content_alignment.md"}
{"gitdown": "include", "file": "./usage/column_width.md"}
{"gitdown": "include", "file": "./usage/custom_border.md"}
{"gitdown": "include", "file": "./usage/draw_join.md"}
{"gitdown": "include", "file": "./usage/padding_cell_content.md"}
{"gitdown": "include", "file": "./usage/predefined_border_templates.md"}
{"gitdown": "include", "file": "./usage/text_wrapping.md"}
