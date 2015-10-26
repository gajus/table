'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashLangIsNumber2 = require('lodash/lang/isNumber');

var _lodashLangIsNumber3 = _interopRequireDefault(_lodashLangIsNumber2);

var _lodashLangIsBoolean2 = require('lodash/lang/isBoolean');

var _lodashLangIsBoolean3 = _interopRequireDefault(_lodashLangIsBoolean2);

var _lodashCollectionMax2 = require('lodash/collection/max');

var _lodashCollectionMax3 = _interopRequireDefault(_lodashCollectionMax2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _calculateCellHeight = require('./calculateCellHeight');

var _calculateCellHeight2 = _interopRequireDefault(_calculateCellHeight);

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {Object} config
 * @return {number[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows, config) {
    var rowSpanIndex = undefined,
        tableWidth = undefined;

    tableWidth = rows[0].length;

    rowSpanIndex = [];

    (0, _lodashCollectionMap3['default'])(rows, function (cells) {
        var cellHeightIndex = undefined;

        cellHeightIndex = (0, _lodashArrayFill3['default'])(Array(tableWidth), 1);

        (0, _lodashCollectionForEach3['default'])(cells, function (value, index1) {
            if (!(0, _lodashLangIsNumber3['default'])(config.columns[index1].width)) {
                throw new Error('column[index].width must be a number.');
            }

            if (!(0, _lodashLangIsBoolean3['default'])(config.columns[index1].wrapWord)) {
                throw new Error('column[index].wrapWord must be a boolean.');
            }

            cellHeightIndex[index1] = (0, _calculateCellHeight2['default'])(value, config.columns[index1].width, config.columns[index1].wrapWord);
        });

        rowSpanIndex.push((0, _lodashCollectionMax3['default'])(cellHeightIndex));
    });

    return rowSpanIndex;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateRowHeightIndex.js.map
