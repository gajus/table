'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _border = require('./border');

var _border2 = _interopRequireDefault(_border);

var _drawBorder = require('./drawBorder');

var _drawRow = require('./drawRow');

var _drawRow2 = _interopRequireDefault(_drawRow);

var _formatData = require('./formatData');

var _formatData2 = _interopRequireDefault(_formatData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var drawTop = undefined,
    getColumnSizeIndex = undefined;

/**
 * @param {String[]} columns
 * @return {Number[]}
 */
getColumnSizeIndex = function (columns) {
    return (0, _lodashCollectionMap3['default'])(columns, function (data) {
        return data.length;
    });
};

exports['default'] = function (data) {
    var table = undefined,
        columnSizeIndex = undefined,
        rows = undefined;

    rows = (0, _formatData2['default'])(data);

    columnSizeIndex = getColumnSizeIndex(rows[0]);

    table = '';
    table += (0, _drawBorder.drawBorderTop)(columnSizeIndex, _border2['default']);

    (0, _lodashCollectionForEach3['default'])(rows, function (row, i) {
        table += (0, _drawRow2['default'])(row, _border2['default']);

        if (i + 1 !== rows.length) {
            table += (0, _drawBorder.drawBorderJoin)(columnSizeIndex, _border2['default']);
        }
    });

    table += (0, _drawBorder.drawBorderBottom)(columnSizeIndex, _border2['default']);

    return table;
};

module.exports = exports['default'];
//# sourceMappingURL=table.js.map