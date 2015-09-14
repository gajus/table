'use strict';

var _lodashLangIsArray2 = require('lodash/lang/isArray');

var _lodashLangIsArray3 = _interopRequireDefault(_lodashLangIsArray2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @typedef {String} validateData~cell
 */

/**
 * @typedef {validateData~cell[]} validateData~column
 */

/**
 * @param {validateData~column[]} rows
 * @return {undefined}
 */

exports['default'] = function (rows) {
    var columnNumber = undefined;

    if (!(0, _lodashLangIsArray3['default'])(rows)) {
        throw new Error('Table data must be an array.');
    }

    if (rows.length === 0) {
        throw new Error('Table must define at least one row.');
    }

    if (rows[0].length === 0) {
        throw new Error('Table must define at least one column.');
    }

    columnNumber = rows[0].length;

    (0, _lodashCollectionForEach3['default'])(rows, function (columns) {
        if (!(0, _lodashLangIsArray3['default'])(columns)) {
            throw new Error('Table row data must be an array.');
        }

        if (columns.length !== columnNumber) {
            throw new Error('Table must have a consistent number of columns.');
        }

        (0, _lodashCollectionForEach3['default'])(columns, function (cell) {
            if (/[\x01-\x1A]/.test(cell)) {
                throw new Error('Table data must not contain control characters.');
            }
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=validateData.js.map