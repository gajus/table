'use strict';

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * Produces an array of values that describe the largest value length in the column.
 *
 * @param {Array[]} rows
 * @return {Number[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var columns = undefined;

    if (!rows[0]) {
        throw new Error('Dataset must have at least one row.');
    }

    columns = (0, _lodashArrayFill3['default'])(Array(rows[0].length), 0);

    (0, _lodashCollectionForEach3['default'])(rows, function (row) {
        (0, _lodashCollectionForEach3['default'])(row, function (value, index0) {
            var valueLength = undefined;

            valueLength = (0, _stringWidth2['default'])(value);

            if ((0, _lodashLangIsUndefined3['default'])(columns[index0]) || columns[index0] < valueLength) {
                columns[index0] = valueLength;
            }
        });
    });

    return columns;
};

module.exports = exports['default'];
//# sourceMappingURL=calculateMaximumColumnValueIndex.js.map