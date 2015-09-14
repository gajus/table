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
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows, border, columnSizeIndex, rowSpanIndex) {
    var output = undefined,
        rowCount = undefined,
        rowHeight = undefined,
        realRowIndex = undefined;

    rowCount = rows.length;

    realRowIndex = 0;

    output = '';
    output += (0, _drawBorder.drawBorderTop)(columnSizeIndex, border);

    (0, _lodashCollectionForEach3['default'])(rows, function (row, i) {
        output += (0, _drawRow2['default'])(row, border);

        if (!rowHeight) {
            rowHeight = rowSpanIndex[realRowIndex];

            realRowIndex++;
        }

        rowHeight--;

        if (rowHeight === 0 && i !== rowCount - 1) {
            output += (0, _drawBorder.drawBorderJoin)(columnSizeIndex, border);
        }
    });

    output += (0, _drawBorder.drawBorderBottom)(columnSizeIndex, border);

    return output;
};

module.exports = exports['default'];
//# sourceMappingURL=drawTable.js.map