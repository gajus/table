# Table

![[GitSpo Mentions](https://gitspo.com/mentions/gajus/slonik)](https://gitspo.com/badges/gajus/swing?style=flat-square)
[![Travis build status](http://img.shields.io/travis/gajus/table/master.svg?style=flat-square)](https://travis-ci.org/gajus/table)
[![Coveralls](https://img.shields.io/coveralls/gajus/table.svg?style=flat-square)](https://coveralls.io/github/gajus/table)
[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat-square)](https://www.npmjs.org/package/table)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

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
{"gitdown": "include", "file": "./usage/draw_horizontal_line.md"}
{"gitdown": "include", "file": "./usage/padding_cell_content.md"}
{"gitdown": "include", "file": "./usage/predefined_border_templates.md"}
{"gitdown": "include", "file": "./usage/streaming.md"}
{"gitdown": "include", "file": "./usage/text_truncation.md"}
{"gitdown": "include", "file": "./usage/text_wrapping.md"}
