'use strict';

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _calculateCellWidthIndex = require('./calculateCellWidthIndex');

var _calculateCellWidthIndex2 = _interopRequireDefault(_calculateCellWidthIndex);

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 *
 * @param {Array[]} rows
 * @return {number[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var columns = undefined;

    if (!rows[0]) {
        throw new Error('Dataset must have at least one row.');
    }

    columns = (0, _lodashArrayFill3['default'])(Array(rows[0].length), 0);

    (0, _lodashCollectionForEach3['default'])(rows, function (row) {
        var columnWidthIndex = undefined;

        columnWidthIndex = (0, _calculateCellWidthIndex2['default'])(row);

        (0, _lodashCollectionForEach3['default'])(columnWidthIndex, function (valueWidth, index0) {
            if (columns[index0] < valueWidth) {
                columns[index0] = valueWidth;
            }
        });
    });

    return columns;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateMaximumColumnWidthIndex.js.map
