'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * @typedef {string} cell
 */

/**
 * @typedef {cell[]} validateData~column
 */

/**
 * @param {column[]} rows
 * @returns {undefined}
 */

exports['default'] = function (rows) {
    var columnNumber = undefined;

    if (!_lodash2['default'].isArray(rows)) {
        throw new Error('Table data must be an array.');
    }

    if (rows.length === 0) {
        throw new Error('Table must define at least one row.');
    }

    if (rows[0].length === 0) {
        throw new Error('Table must define at least one column.');
    }

    columnNumber = rows[0].length;

    _lodash2['default'].forEach(rows, function (cells) {
        if (!_lodash2['default'].isArray(cells)) {
            throw new Error('Table row data must be an array.');
        }

        if (cells.length !== columnNumber) {
            throw new Error('Table must have a consistent number of cells.');
        }

        // @todo Make an exception for newline characters.
        // @see https://github.com/gajus/table/issues/9
        _lodash2['default'].forEach(cells, function (cell) {
            if (/[\x01-\x1A]/.test(cell)) {
                throw new Error('Table data must not contain control characters.');
            }
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=validateTableData.js.map
