'use strict';

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _drawBorder = require('./drawBorder');

var _drawRow = require('./drawRow');

var _drawRow2 = _interopRequireDefault(_drawRow);

/**
 * @param {Array} rows
 * @param {Object} border
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 * @param {Function} drawHorizontalLine
 * @returns {string}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows, border, columnSizeIndex, rowSpanIndex, drawHorizontalLine) {
    var output = undefined,
        realRowIndex = undefined,
        rowCount = undefined,
        rowHeight = undefined;

    rowCount = rows.length;

    realRowIndex = 0;

    output = '';

    if (drawHorizontalLine(realRowIndex, rowCount)) {
        output += (0, _drawBorder.drawBorderTop)(columnSizeIndex, border);
    }

    (0, _lodashCollectionForEach3['default'])(rows, function (row, index0) {
        output += (0, _drawRow2['default'])(row, border);

        if (!rowHeight) {
            rowHeight = rowSpanIndex[realRowIndex];

            realRowIndex++;
        }

        rowHeight--;

        if (rowHeight === 0 && index0 !== rowCount - 1 && drawHorizontalLine(realRowIndex, rowCount)) {
            output += (0, _drawBorder.drawBorderJoin)(columnSizeIndex, border);
        }
    });

    if (drawHorizontalLine(realRowIndex, rowCount)) {
        output += (0, _drawBorder.drawBorderBottom)(columnSizeIndex, border);
    }

    return output;
};

module.exports = exports['default'];
//# sourceMappingURL=drawTable.js.map
