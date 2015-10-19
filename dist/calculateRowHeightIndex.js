'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _calculateCellHeight = require('./calculateCellHeight');

var _calculateCellHeight2 = _interopRequireDefault(_calculateCellHeight);

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {Object} config
 * @return {number[]}
 */

exports['default'] = function (rows, config) {
    var rowSpanIndex = undefined,
        tableWidth = undefined;

    tableWidth = rows[0].length;

    rowSpanIndex = [];

    _lodash2['default'].map(rows, function (cells) {
        var cellHeightIndex = undefined;

        cellHeightIndex = _lodash2['default'].fill(Array(tableWidth), 1);

        _lodash2['default'].forEach(cells, function (value, index1) {
            cellHeightIndex[index1] = (0, _calculateCellHeight2['default'])(value, config.columns[index1].width, config.columns[index1].wrapWord);
        });

        rowSpanIndex.push(_lodash2['default'].max(cellHeightIndex));
    });

    return rowSpanIndex;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateRowHeightIndex.js.map
