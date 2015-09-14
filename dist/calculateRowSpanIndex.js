'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashMathCeil2 = require('lodash/math/ceil');

var _lodashMathCeil3 = _interopRequireDefault(_lodashMathCeil2);

var _lodashCollectionMax2 = require('lodash/collection/max');

var _lodashCollectionMax3 = _interopRequireDefault(_lodashCollectionMax2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * @param {Array[]} rows
 * @param {Object} config
 * @return {Number[]}
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
            if (config.column[index1].maxWidth !== Infinity) {
                cellHeightIndex[index1] = (0, _lodashMathCeil3['default'])((0, _stringWidth2['default'])(value) / config.column[index1].maxWidth);
            }
        });

        rowSpanIndex.push((0, _lodashCollectionMax3['default'])(cellHeightIndex));
    });

    return rowSpanIndex;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateRowSpanIndex.js.map