'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _calculateCellWidthIndex = require('./calculateCellWidthIndex');

var _calculateCellWidthIndex2 = _interopRequireDefault(_calculateCellWidthIndex);

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 *
 * @param {Array[]} rows
 * @return {number[]}
 */

exports['default'] = function (rows) {
    var columns = undefined;

    if (!rows[0]) {
        throw new Error('Dataset must have at least one row.');
    }

    columns = _lodash2['default'].fill(Array(rows[0].length), 0);

    _lodash2['default'].forEach(rows, function (row) {
        var columnWidthIndex = undefined;

        columnWidthIndex = (0, _calculateCellWidthIndex2['default'])(row);

        _lodash2['default'].forEach(columnWidthIndex, function (valueWidth, index0) {
            if (columns[index0] < valueWidth) {
                columns[index0] = valueWidth;
            }
        });
    });

    return columns;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateMaximumColumnWidthIndex.js.map
